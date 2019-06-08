import config from './config';

export default class Player {

    constructor(id, name, skin, sprite, world) {
        let self = this;
        this.name = name;
        this.skin = skin;
        this.id = id;
        this.speed = 10;
        this.input = null;


        this.sprite = sprite;
        // this.socket = socket;

        this.world = world || '1'; //default

        this.position = "up";
        this.currentSprite = [105, 254];

        this.startW = config().width / 2;
        this.startH = config().height / 2;
        // 50+ Math.trunc(self.startW * (Math.random())),50 + Math.trunc(self.startH * (Math.random()))
        this.coords = {
            x: self.startW,
            y: self.startH,
            worldStart: [self.startW,self.startH]
        };
        this.viewPort = {
            x: this.startW,
            y: this.startH
        }
    }
    get currentPosition() {
        return this.position;
    }

    set currentPosition(position) {
        this.position = position;
    }

    update(camera) {
        this.viewPort.x = camera.viewPort.x;
        this.viewPort.y = camera.viewPort.y;
    }
}