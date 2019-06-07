import config from './config';

export default class Player {

    constructor(name, skin) {
        let self = this;
        this.name = name;
        this.skin = skin;
        this.speed = 5;
        // this.socket = socket;

        this.world = "1"; //default

        this.position = "up";
        this.currentSprite = [105, 254];

        this.startW = config().width / 2;
        this.startH = config().height / 2;

        this.coords = {
            x: 0,
            y: 0,
            worldStart: [50+ Math.trunc(self.startW * (Math.random())),50 + Math.trunc(self.startH * (Math.random()))]
        };
        this.viewPort = {
            x: this.startW,
            y: this.startH
        }
        this.currentInputDown = "";
    }
    get currentInput() {
        return this.currentInputDown;
    }

    set currentInput(position) {
        this.currentInputDown = position;
    }

    update(camera) {
        this.viewPort.x = camera.viewPort.x;
        this.viewPort.y = camera.viewPort.y;
    }
}