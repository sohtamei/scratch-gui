import React from 'react';
import {FormattedMessage} from 'react-intl';

import tukurutchIconURL from './tukurutch/tukurutch.png';
import tukurutchInsetIconURL from './tukurutch/tukurutch-small.png';
import tukurutchConnectionIconURL from './tukurutch/tukurutch-illustration.svg';

import meshIconURL from './tukurutch/mesh.png';
import meshInsetIconURL from './tukurutch/mesh-small.png';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';

import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitInsetIconURL from './microbit/microbit-small.svg';
import microbitConnectionIconURL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';

import ev3IconURL from './ev3/ev3.png';
import ev3InsetIconURL from './ev3/ev3-small.svg';
import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
import wedo2InsetIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

import boostIconURL from './boost/boost.png';
import boostInsetIconURL from './boost/boost-small.svg';
import boostConnectionIconURL from './boost/boost-illustration.svg';
import boostConnectionSmallIconURL from './boost/boost-small.svg';
import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

import gdxforIconURL from './gdxfor/gdxfor.png';
import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

import facemesh2scratchIconURL from './facemesh2scratch/facemesh2scratch.png';
import facemesh2scratchInsetIconURL from './facemesh2scratch/facemesh2scratch-small.png';

import handpose2scratchIconURL from './handpose2scratch/handpose2scratch.png';
import handpose2scratchInsetIconURL from './handpose2scratch/handpose2scratch-small.png';

import ml2scratchIconURL from './ml2scratch/ml2scratch.png';
import ml2scratchInsetIconURL from './ml2scratch/ml2scratch-small.png';

import toioIconURL from 'scratch-vm/src/extensions/scratch3_toio/images/extension_hero.png';
import toioInsetIconURL from 'scratch-vm/src/extensions/scratch3_toio/images/cube_m.svg';
import toioConnectionIconURL from 'scratch-vm/src/extensions/scratch3_toio/images/cube_l.svg';
import toioConnectionSmallIconURL from 'scratch-vm/src/extensions/scratch3_toio/images/cube_m.svg';
/*
import _konashi_konashi_icon_png__WEBPACK_IMPORTED_MODULE_31__ from './konashi/konashi-icon.png';
import _konashi_konashi_inset_img_svg__WEBPACK_IMPORTED_MODULE_32__ from './konashi/konashi-inset-img.svg';
import _ikimono_ikimono_icon_png__WEBPACK_IMPORTED_MODULE_33__ from './ikimono/ikimono-icon.png';
import _ikimono_ikimono_inset_img_svg__WEBPACK_IMPORTED_MODULE_34__ from './ikimono/ikimono-inset-img.svg';
*/
import _qrcode_qrcode_png from './qrcode/qrcode.png';
import _qrcode_qrcode_small_svg from './qrcode/qrcode-small.svg';

import locales from 'scratch-l10n';
import {detectLocale} from '../../detect-locale';

var getLocale = function() {
    var locale = detectLocale(Object.keys(locales));
    return (locale == 'ja' || locale == 'ja-Hira') ? 1: 0;
}

var getMcuExt = function(id, name, tag='micom', _collaborator='Sohta Mei') {
	return {
		name: name,
		description: id,
		extensionId: id,
		tags: [tag],
		collaborator: _collaborator,
		iconURL: tukurutchIconURL,
		insetIconURL: tukurutchInsetIconURL,
		featured: true,
		internetConnectionRequired: true,

		launchPeripheralConnectionFlow: false,
		useAutoScan: false,
		connectionIconURL: tukurutchConnectionIconURL,
		connectionSmallIconURL: tukurutchInsetIconURL,
		connectingMessage: 'Connecting',
		helpLink: 'http://sohta02.web.fc2.com/familyday_app3.html',
	};
}

var getPeriExt = function(id, name, tag='device') {
	return {
		name: name,
		description: id,
		extensionId: id,
		tags: [tag],
		collaborator: 'Sohta Mei',
		iconURL: tukurutchIconURL,
		insetIconURL: tukurutchInsetIconURL,
		featured: true,
		internetConnectionRequired: true,
	};
}

export default
[
    // micom
    getMcuExt('DevkitC',   'DevkitC(ESP32,S3, ..)', 'micom', 'hajimef'),
    getMcuExt('uno',       'uno,uno32'),
    getMcuExt('M5Series',  'M5Series'),
    getMcuExt('M5Camera',  'M5Camera,ESP32cam, ..'),
    {
        name: 'micro:bit',
        extensionId: 'microbit',
        tags: ['micom'],
        collaborator: 'Sohta Mei',
        iconURL: microbitIconURL,
        insetIconURL: microbitInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world."
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        featured: true,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        connectionIconURL: microbitConnectionIconURL,
        connectionSmallIconURL: microbitConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'http://sohta02.web.fc2.com/familyday_app3.html'
    },
    getMcuExt('micomLCD', 'LCD(special FW)'),
    getMcuExt('GroveBeginnerKit', 'GroveBeginnerKit'),

    // robot
    getMcuExt('QuadCrawlerAI',    'QuadCrawlerAI', 'robot'),
    getMcuExt('cameratch32',      'cameratch32', 'robot'),
    getMcuExt('RemoconRobo',      ['RemoconRobo','リモコンロボ'][getLocale()], 'robot'),
    getMcuExt('QuadCrawler',      'QuadCrawler', 'robot'),

    // device
    getPeriExt('genericIO',    ['generic I/O','汎用I/O'][getLocale()]),
    getPeriExt('servoCar',     'Servo Car'),
    getPeriExt('motorCar',     'DC motor Car'),
    getPeriExt('folo',         ['folo','フォロ'][getLocale()]),
    //getPeriExt('foloCamera',   'foloCamera'),

    // scratch
    getPeriExt('uiParts',      ['UI parts','UIパーツ'][getLocale()],'scratch'),
    getPeriExt('exeScript',    ['execute script','スクリプト実行'][getLocale()],'scratch'),
    getPeriExt('loadExt',      ['Load external extension','外部拡張読み込み'][getLocale()],'scratch'),

    // i2cdevice
    getPeriExt('TempHumSht3x', ['TempHum','温度湿度'][getLocale()]+'(SHT3x)','i2cdevice'),
    getPeriExt('BMP280',       ['Pressure','気圧'][getLocale()]+'(BMP280)','i2cdevice'),
    getPeriExt('M5RoverC',     'RoverC, BugC','i2cdevice'),
    getPeriExt('maqueen',      'Micro:Maqueen','i2cdevice'),
    getPeriExt('i2cLCD',       'I2C LCD','i2cdevice'),

	{
		name: 'micro:bit '+['Radio','無線'][getLocale()],
		description: 'microbitRadio',
		extensionId: 'microbitRadio',
		tags: ['device'],
		collaborator: 'Sohta Mei',
		iconURL: microbitIconURL,
		insetIconURL: microbitInsetIconURL,
		featured: true,
		internetConnectionRequired: true,
	},
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        tags: ['scratch'],
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        tags: ['video'],
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true
    },
    {
        name: 'tracking.js',
        extensionId: 'tracking',
        tags: ['video'],
        collaborator: 'Eduardo Lundgren',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        featured: true,
        disabled: false,
        internetConnectionRequired: true,
        bluetoothRequired: false
    },
/*
    {
        name: 'ML2Scratch',
        extensionId: 'ml2scratch',
        collaborator: 'champierre',
        iconURL: ml2scratchIconURL,
        insetIconURL: ml2scratchInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage='ML2Scratch Blocks.'
                description='ML2Scratch Blocks.'
                id='gui.extension.ml2scratchblocks.description'
            />
        ),
        featured: true,
        disabled: false,
        internetConnectionRequired: true,
        bluetoothRequired: false
    },
*/
    {
        name: 'Facemesh2Scratch',
        extensionId: 'facemesh2scratch',
        tags: ['video'],
        collaborator: 'champierre',
        iconURL: facemesh2scratchIconURL,
        insetIconURL: facemesh2scratchInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage='Face Tracking'
                description='Face Tracking'
                id='gui.extension.facemesh2scratch.description'
            />
        ),
        featured: true,
        disabled: false,
        internetConnectionRequired: true,
        bluetoothRequired: false
    },
    {
        name: 'Handpose2Scratch',
        extensionId: 'handpose2scratch',
        tags: ['video'],
        collaborator: 'champierre',
        iconURL: handpose2scratchIconURL,
        insetIconURL: handpose2scratchInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage='HandPose2Scratch Blocks.'
                description='HandPose2Scratch Blocks.'
                id='gui.extension.handpose2scratchblocks.description'
            />
        ),
        featured: true,
        disabled: false,
        internetConnectionRequired: true,
        bluetoothRequired: false,
        helpLink: 'https://champierre.github.io/handpose2scratch/'
    },
    {
        name: ['QR Code','QRコード'][getLocale()],
        extensionId: 'qrcode',
        tags: ['video'],
        collaborator: 'Sugiura Lab',
        iconURL: _qrcode_qrcode_png,
        insetIconURL: _qrcode_qrcode_small_svg,
        featured: true,
        disabled: false,
        internetConnectionRequired: false,
        bluetoothRequired: false,
    },
    getMcuExt('M5CameraCar',      'M5CameraCar', 'robot'),
/*
    {
        name: ["cocoro kit","ココロキット"][getLocale()],
        extensionId: 'ikimono',
        collaborator: 'Yukai Engineering Inc.',
        iconURL: _ikimono_ikimono_icon_png__WEBPACK_IMPORTED_MODULE_33__,
        insetIconURL: _ikimono_ikimono_inset_img_svg__WEBPACK_IMPORTED_MODULE_34__,
        description: ["Control cocoro kit","ココロキットを操作する"][getLocale()],
        featured: true,
        bluetoothRequired: true
    },
    {
        name: "konashi",
        extensionId: 'konashi',
        collaborator: 'Yukai Engineering Inc.',
        iconURL: _konashi_konashi_icon_png__WEBPACK_IMPORTED_MODULE_31__,
        insetIconURL: _konashi_konashi_inset_img_svg__WEBPACK_IMPORTED_MODULE_32__,
        description: ["Control konashi","konashiを操作する"][getLocale()],
        featured: true,
        bluetoothRequired: true
    },
*/
    {
        name: 'toio',
        extensionId: 'toio',
        tags: ['other'],
        collaborator: 'Sony Interactive Entertainment Inc.',
        iconURL: toioIconURL,
        insetIconURL: toioInsetIconURL,
        description: 'toio',
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: toioConnectionIconURL,
        connectionSmallIconURL: toioConnectionSmallIconURL,
        connectingMessage: 'connecting',
        helpLink: 'https://toio.io/programming/visual-programming.html/#preparation',
    },
    {
        name: 'MESH',
        extensionId: 'mesh',
        tags: ['other'],
        collaborator: 'Sohta Mei',
        iconURL: meshIconURL,
        insetIconURL: meshInsetIconURL,
        description: '',
        featured: true,
        bluetoothRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        tags: ['scratch'],
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        tags: ['scratch'],
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: 'translate',
        tags: ['scratch'],
        collaborator: 'Google',
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Makey Makey',
        extensionId: 'makeymakey',
        tags: ['other'],
        collaborator: 'JoyLabz',
        iconURL: makeymakeyIconURL,
        insetIconURL: makeymakeyInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        featured: true
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        tags: ['LEGO'],
        collaborator: 'LEGO',
        iconURL: ev3IconURL,
        insetIconURL: ev3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: ev3ConnectionIconURL,
        connectionSmallIconURL: ev3ConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
                description="Message to help people connect to their EV3. Must note the PIN should be 1234."
                id="gui.extension.ev3.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/ev3'
    },
    {
        name: 'LEGO BOOST',
        extensionId: 'boost',
        tags: ['LEGO'],
        collaborator: 'LEGO',
        iconURL: boostIconURL,
        insetIconURL: boostInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Bring robotic creations to life."
                description="Description for the 'LEGO BOOST' extension"
                id="gui.extension.boost.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: boostConnectionIconURL,
        connectionSmallIconURL: boostConnectionSmallIconURL,
        connectionTipIconURL: boostConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their BOOST."
                id="gui.extension.boost.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/boost'
    },
    {
        name: 'LEGO Education WeDo 2.0',
        extensionId: 'wedo2',
        tags: ['LEGO'],
        collaborator: 'LEGO',
        iconURL: wedo2IconURL,
        insetIconURL: wedo2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: wedo2ConnectionIconURL,
        connectionSmallIconURL: wedo2ConnectionSmallIconURL,
        connectionTipIconURL: wedo2ConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their WeDo."
                id="gui.extension.wedo2.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/wedo'
    },
    {
        name: 'Go Direct Force & Acceleration',
        extensionId: 'gdxfor',
        tags: ['other'],
        collaborator: 'Vernier',
        iconURL: gdxforIconURL,
        insetIconURL: gdxforInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense push, pull, motion, and spin."
                description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
                id="gui.extension.gdxfor.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: gdxforConnectionIconURL,
        connectionSmallIconURL: gdxforConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their force and acceleration sensor."
                id="gui.extension.gdxfor.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/vernier'
    }
];
