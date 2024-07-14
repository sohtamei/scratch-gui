import {requestVideoStream, requestDisableVideo} from './camera.js';
import log from '../log.js';

/**
 * Video Manager for video extensions.
 */
class VideoProvider {
    constructor () {
        /**
         * Default value for mirrored frames.
         * @type boolean
         */
        this.mirror = true;

        /**
         * Cache frames for this many ms.
         * @type number
         */
        this._frameCacheTimeout = 16;

        /**
         * DOM Video element
         * @private
         */
        this._video = null;

        /**
         * Usermedia stream track
         * @private
         */
        this._track = null;

        /**
         * Stores some canvas/frame data per resolution/mirror states
         */
        this._workspace = [];

        this.Camera = {name:'unknown', ip:''};

		this.videoInterval = null;
		this.idx = 0;
		this.lastIdx = this.idx;
		this.lastCrc = 0;
		this.crcTable = this.makeCrcTable();
    }

    static get FORMAT_IMAGE_DATA () {
        return 'image-data';
    }

    static get FORMAT_CANVAS () {
        return 'canvas';
    }

    /**
     * Dimensions the video stream is analyzed at after its rendered to the
     * sample canvas.
     * @type {Array.<number>}
     */
    static get DIMENSIONS () {
        return [480, 360];
    }

    /**
     * Order preview drawable is inserted at in the renderer.
     * @type {number}
     */
    static get ORDER () {
        return 1;
    }

    /**
     * Get the HTML video element containing the stream
     */
    get video () {
        return this._video;
    }

    /**
     * Request video be enabled.  Sets up video, creates video skin and enables preview.
     *
     * @return {Promise.<Video>} resolves a promise to this video provider when video is ready.
     */
    enableVideo () {
        this.enabled = true;
        return this._setupVideo();
    }

    /**
     * Disable video stream (turn video off)
     */
    disableVideo () {
        this.enabled = false;
        // If we have begun a setup process, call _teardown after it completes
        if (this._singleSetup) {
            this._singleSetup
                .then(this._teardown.bind(this))
                .catch(err => this.onError(err));
        }
    }

    /**
     * async part of disableVideo
     * @private
     */
    _teardown () {
        // we might be asked to re-enable before _teardown is called, just ignore it.
        if (this.enabled === false) {
            if(this.Camera.name != 'esp32camera') {
	            const disableTrack = requestDisableVideo();
	            this._singleSetup = null;
	            // by clearing refs to video and track, we should lose our hold over the camera
	            this._video = null;
	            if (this._track && disableTrack) {
	                this._track.stop();
	            }
	            this._track = null;
            } else {
	            window.stop();
	            if(this.videoInterval) clearInterval(this.videoInterval);
	            this._singleSetup = null;
	            this._video = null;
            }
        }
    }

    /**
     * Return frame data from the video feed in a specified dimensions, format, and mirroring.
     *
     * @param {object} frameInfo A descriptor of the frame you would like to receive.
     * @param {Array.<number>} frameInfo.dimensions [width, height] array of numbers.  Defaults to [480,360]
     * @param {boolean} frameInfo.mirror If you specificly want a mirror/non-mirror frame, defaults to true
     * @param {string} frameInfo.format Requested video format, available formats are 'image-data' and 'canvas'.
     * @param {number} frameInfo.cacheTimeout Will reuse previous image data if the time since capture is less than
     *                                        the cacheTimeout.  Defaults to 16ms.
     *
     * @return {ArrayBuffer|Canvas|string|null} Frame data in requested format, null when errors.
     */
    getFrame ({
        dimensions = VideoProvider.DIMENSIONS,
        mirror = this.mirror,
        format = VideoProvider.FORMAT_IMAGE_DATA,
        cacheTimeout = this._frameCacheTimeout
    }) {
        if (!this.videoReady) {
            return null;
        }
        const [width, height] = dimensions;
        const workspace = this._getWorkspace({dimensions, mirror: Boolean(mirror)});
        const {videoWidth, videoHeight} = this._video;
        const {canvas, context, lastUpdate, cacheData} = workspace;
        const now = Date.now();

        // if the canvas hasn't been updated...
        if (lastUpdate + cacheTimeout < now) {

            if (mirror) {
                context.scale(-1, 1);
                context.translate(width * -1, 0);
            }

            context.drawImage(this._video,
                // source x, y, width, height
                0, 0, videoWidth, videoHeight,
                // dest x, y, width, height
                0, 0, width, height
            );

            // context.resetTransform() doesn't work on Edge but the following should
            context.setTransform(1, 0, 0, 1, 0, 0);
            workspace.lastUpdate = now;
        }

        // each data type has it's own data cache, but the canvas is the same
        if (!cacheData[format]) {
            cacheData[format] = {lastUpdate: 0};
        }
        const formatCache = cacheData[format];

        if (formatCache.lastUpdate + cacheTimeout < now) {
            if (format === VideoProvider.FORMAT_IMAGE_DATA) {
                formatCache.lastData = context.getImageData(0, 0, width, height);
				const crc = this.crc32(formatCache.lastData.data);
				if(this.lastCrc != crc) {
					this.lastCrc = crc;
					this.idx++;
					if(this._video.hasOwnProperty('onUpdated') && this._video.onUpdated != null)
						this._video.onUpdated(canvas);
				}
            } else if (format === VideoProvider.FORMAT_CANVAS) {
                // this will never change
                formatCache.lastUpdate = Infinity;
                formatCache.lastData = canvas;
            } else {
                log.error(`video io error - unimplemented format ${format}`);
                // cache the null result forever, don't log about it again..
                formatCache.lastUpdate = Infinity;
                formatCache.lastData = null;
            }

            // rather than set to now, this data is as stale as it's canvas is
            formatCache.lastUpdate = Math.max(workspace.lastUpdate, formatCache.lastUpdate);
        }

        return formatCache.lastData;
    }

    /**
     * Method called when an error happens.  Default implementation is just to log error.
     *
     * @abstract
     * @param {Error} error An error object from getUserMedia or other source of error.
     */
    onError (error) {
        log.error('Unhandled video io device error', error);
    }

    /**
     * Create a video stream.
     * @private
     * @return {Promise} When video has been received, rejected if video is not received
     */
    _setupVideo () {
        // We cache the result of this setup so that we can only ever have a single
        // video/getUserMedia request happen at a time.
        if (this._singleSetup) {
            return this._singleSetup;
        }

		const href = location.href.split(':');
		if(!isNaN(href[1].slice(2,3))) {  // first character is numeric
			this.Camera.name = 'esp32camera';
			this.Camera.ip = '';
		} else {
			const cookies_get = document.cookie.split(';');
			for(let i = 0; i < cookies_get.length; i++) {
				const tmp = cookies_get[i].trim().split('=');
				switch(tmp[0]) {
				case 'Camera_name': this.Camera.name = tmp[1]; break;
				case 'Camera_ip':   this.Camera.ip = tmp[1];   break;
				}
			}
			if(this.Camera.name == 'unknown' && this.Camera.ip != '')
				this.Camera.name = 'esp32camera';
		}

		console.log('Camera:'+this.Camera.name+','+this.Camera.ip);

		if(this.Camera.name != 'esp32camera') {
	        let videoConfig = {
	          width: {min: 480, ideal: 480},
	          height: {min: 360, ideal: 360}
	        };

			this._singleSetup = navigator.mediaDevices.enumerateDevices()
			.then(devices => {
				for(let i = 0; i < devices.length; i++) {
					if (devices[i].kind == "videoinput" && devices[i].label == this.Camera.name) {
						videoConfig.deviceId = {exact: devices[i].deviceId};
						break;
					}
				}
				return;
			}).then(() => requestVideoStream(videoConfig))
            .then(stream => {
                this._video = document.createElement('video');

                // Use the new srcObject API, falling back to createObjectURL
                try {
                    this._video.srcObject = stream;
                } catch (error) {
                    this._video.src = window.URL.createObjectURL(stream);
                }
                // Hint to the stream that it should load. A standard way to do this
                // is add the video tag to the DOM. Since this extension wants to
                // hide the video tag and instead render a sample of the stream into
                // the webgl rendered Scratch canvas, another hint like this one is
                // needed.
                this._video.play(); // Needed for Safari/Firefox, Chrome auto-plays.
                this._track = stream.getTracks()[0];
                return this;
            })
            .catch(error => {
                this._singleSetup = null;
                this.onError(error);
            });
		} else {
			this._video = document.createElement('img');

			if(this.Camera.ip == '') {
				this._video.src = '/stream';
			} else {
				this._video.src = 'http://' + this.Camera.ip + ':81/stream';
				this._video.crossOrigin = "anonymous";
			}
			const _this = this;
			this._video.onload = () => {
			//	console.log(_this._video.width + ',' + _this._video.height);
				_this._video.videoWidth = _this._video.width;
				_this._video.videoHeight = _this._video.height;
			};
			this._singleSetup = Promise.resolve();

			this.videoInterval = setInterval(() => {
				if(this.idx == this.lastIdx) {
					this.idx += 1;
					const split = this._video.src.split('?');
					this._video.src = split[0] + '?' + this.idx;
				} else {
					console.log('frames=' + (this.idx - this.lastIdx)/5.0);
				}
				this.lastIdx = this.idx;
			}, 5000);
		}
        return this._singleSetup;
    }

    get videoReady () {
        if (!this.enabled) {
            return false;
        }
        if (!this._video) {
            return false;
        }
        if (this.Camera.name != 'esp32camera' && !this._track) {
            return false;
        }
        const {videoWidth, videoHeight} = this._video;
        if (typeof videoWidth !== 'number' || typeof videoHeight !== 'number') {
            return false;
        }
        if (videoWidth === 0 || videoHeight === 0) {
            return false;
        }
        return true;
    }

    /**
     * get an internal workspace for canvas/context/caches
     * this uses some document stuff to create a canvas and what not, probably needs abstraction
     * into the renderer layer?
     * @private
     * @return {object} A workspace for canvas/data storage.  Internal format not documented intentionally
     */
    _getWorkspace ({dimensions, mirror}) {
        let workspace = this._workspace.find(space => (
            space.dimensions.join('-') === dimensions.join('-') &&
            space.mirror === mirror
        ));
        if (!workspace) {
            workspace = {
                dimensions,
                mirror,
                canvas: document.createElement('canvas'),
                lastUpdate: 0,
                cacheData: {}
            };
            workspace.canvas.width = dimensions[0];
            workspace.canvas.height = dimensions[1];
            workspace.context = workspace.canvas.getContext('2d',{willReadFrequently:true});
            this._workspace.push(workspace);
        }
        return workspace;
    }

	makeCrcTable() {
		let _crcTable = [];
		for (let n = 0; n < 256; n++) {
			let c = n;
			for (let k = 0; k < 8; k++) {
				c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
			}
			_crcTable[n] = c;
		}
		return _crcTable;
	}

	crc32(buf) {
		let crc = 0 ^ (-1);
		for (let i = 0; i < buf.length; i++) {
			crc = (crc >>> 8) ^ this.crcTable[(crc ^ buf[i]) & 0xFF];
		}
		return (crc ^ (-1)) >>> 0;
	}
}

export default VideoProvider;
