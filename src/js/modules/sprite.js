export default class Sprite {

    constructor(props = {}){

        this.settings = props;
        this.time = 0;
    }

    drawDefaultSprite(){
        if (this.settings.AXIS === 'x'){
            let ctx = this.settings.canvasSprite.getContext('2d');
            ctx.drawImage(this.settings.img,0,0);
            let src = this.settings.canvasSprite.toDataURL('image/png');
            let hero = new Image();
            hero.src = src;
            this.settings.imagesPerson = hero;
        }
    }

    updateSprite(fps, pos){

        if (this.settings.AXIS === 'x'){
 
            if(this.time == 0) {
                this.time = fps;
                return;
            }

            if (fps - this.time > this.settings.speed) {
                this.time += this.settings.speed;
            let ctx = this.settings.canvasSprite.getContext('2d');
            // this.settings.cursor[0] += this.settings
            let x = 0;
            let y = 0;

            if (pos == 'up')
                x = 264 + this.settings.framePosition;


            if (pos == 'down')
                x = 0 + this.settings.framePosition;
    
            if (pos == 'left')
                y = 75 + this.settings.framePosition;

                if (pos == 'right'){
                y = 75 + this.settings.framePosition;
                x = 77;
                }
       
            ctx.clearRect(0,0,this.settings.canvasSprite.width,this.settings.canvasSprite.height);

            ctx.drawImage(
                this.settings.imagesPerson,
                x,y,
                this.settings.width,this.settings.height,
                0,0,
                this.settings.width,this.settings.height
            );

            if (this.settings.countFrame > this.settings.frame) {
                this.settings.framePosition = 0;
                this.settings.frame = 0;
                this.settings.countFrame = 0;
            }
            else {
                this.settings.framePosition += this.settings.width;
                this.settings.countFrame++;
            }
        }
        }
    }

    create(img,frame, again, axis, speed = 200, spriteWidth = 64,spriteHeight = 64){
        return new Sprite({
            img: img,
            width: spriteWidth,
            height: spriteHeight,
            cursor: [264,0],
            speed: speed,
            countFrame: 0,
            framePosition: 0,
            frame: frame,
            again: again,
            AXIS: axis,
            canvasSprite: document.createElement('canvas'),
        });
    }
}