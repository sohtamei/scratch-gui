var extName = 'detect';

var ext = class {
	constructor (runtime) {
		this.runtime = runtime;

		if(this.runtime.tracking) {
			// 画像検出時の処理を置き換え
			this.runtime.tracking.detected = this._detected.bind(this);
		} else {
			alert("tracking.js isn't loaded");
		}
	}

	getInfo () {
		return {
			id: extName,
			name: extName,
			blocks: [],
		};
	}

	_detected(data) {
		const attrBlue  = { color4f: [0,0,1,1], diameter: 1 };
		let rect;
		let lastx = 'invalid';
		let lasty = 'invalid';
		for(let i = 0; i < data.length; i++) {
			rect = data[i];		// 検出データ
			if(rect.width > 20 && rect.height > 10) {
				const x = 240 - (rect.x + rect.width/2);
				const y = 180 - (rect.y + rect.height/2);
				// 赤の四角を描画
				const xs = [240 - rect.x, 240 - (rect.x + rect.width)];
				const ys = [180 - rect.y, 180 - (rect.y + rect.height)];
				this.runtime.tracking.drawRect(xs, ys, [1,0,0,1]); // red
				// 青の直線を描画
				if(lastx != 'invalid' && lasty != 'invalid') {
					this.runtime.tracking.drawLine([lastx,x], [lasty,y], [0,0,1,1]); // blue
				}
				lastx = x;
				lasty = y;
			}
		}
		return false;	// skip original operation
	}
}
