export default class Sprite {

    constructor(props = {}){

        this.settings = props;
    }

    updateSprite(){

        if (this.sprite.AXIS === 'x'){
            this.ctx.clearRect(0,0,this.canvasSprite.width,this.canvasSprite.height);
            this.ctx.drawImage(this.sprite.img,0,0,this.sprite.spriteWidth,this.spriteHeight);
        }

        return this.canvasSprite;
    }

    create(img,frame, again, axis, spriteWidth = 64,spriteHeight = 64){
        return new Sprite({
            img: img,
            width: spriteWidth,
            height: spriteHeight,
            frame: frame,
            again: again,
            AXIS: axis,
            canvasSprite: document.createElement('canvas'),
        });
    }
}