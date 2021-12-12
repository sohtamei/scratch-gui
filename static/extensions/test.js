var extName = 'test';  // デバイス拡張名　_や.などの記号禁止

var ext = class {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: extName,
            name: extName,
            blocks: [     // ブロック定義
                {blockType: BlockType.COMMAND, opcode: 'blinkLED', text: 'ポート[ARG1]', arguments: {
                    ARG1: { type: ArgumentType.NUMBER, defaultValue:13 },
                }},
            ],
//          menus: [],    // メニュー定義
        };
    }

    blinkLED(args) {
        let port = args.ARG1*1;  // ブロックのARG1が取得できます
        const _this = this;
        return _this.runtime.dev.comlib.digiWrite([{port:port, level:1}])       // ArduinoIDEのpinMode+digitalWriteと等価
            .then(() => new Promise(resolve => setTimeout(resolve, 1000)))      // ArduinoIDEのdelayと等価
            .then(() => _this.runtime.dev.comlib.digiWrite([{port:port, level:0}]))
            .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
            .then(() => _this.runtime.dev.comlib.digiWrite([{port:port, level:1}]))
            .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
            .then(() => _this.runtime.dev.comlib.digiWrite([{port:port, level:0}]));
    }
}
