import config from "./config";
import ViewPort from './viewPort';
let Vector = require('./Vector');

export default class Camera {

    constructor(){
        this.deathZone = [0,0];
        this.saveViewPort = {x: 0, y: 0};
        this.viewPort = {x: 0, y: 0};
        this.sub = null;
        this.axis = config().AXIS.BOTH;
        this.cavView = [config().width,config().height];
        this.viewportRect = new ViewPort(this.viewPort.x,this.viewPort.y,this.cavView[0],this.cavView[1]);
    }



    toCanvas(position, viewPort = this.saveViewPort) {
        this.saveViewPort  = position ? position : Vector.zero();
        return Vector.sub(position, viewPort);
    }


    toCanvas(position, viewPort = this.saveViewPort) {
        this.saveViewPort  = position ? position : Vector.zero();
        return Vector.sub(position, viewPort);
    }

    setCoordsFromViewPort(x,y){
        return this.saveViewPort = {x: x, y: y};
    }

    update(sub = this.sub){


        let configs = config();
        if(this.axis == configs.AXIS.HORIZONTAL || this.axis == configs.AXIS.BOTH){

            				// moves camera on horizontal axis based on followed object position
                    if(sub.coords.x - this.viewPort.x  + this.deathZone[0] > this.cavView[0])
                    this.viewPort.x = sub.coords.x - (this.cavView[0] - this.deathZone[0]);
                    else this.viewPort.x = sub.coords.x  - this.deathZone[0];
        }

        if(this.axis == configs.AXIS.VERTICAL || this.axis == configs.AXIS.BOTH){
            if(sub.coords.y - this.viewPort.y + this.deathZone[1] > this.cavView[1])
            this.viewPort.y = sub.coords.y - (this.cavView[1] - this.deathZone[1]);
            else this.viewPort.y = sub.coords.y - this.deathZone[1];
        }


        if (this.viewPort.x < 0) this.viewPort.x = 0;
        if (this.viewPort.y < 0) this.viewPort.y = 0;

        this.viewportRect.update(this.viewPort.x,this.viewPort.y);

        if(!this.viewportRect.check(this.viewportRect) && !this.viewportRect.overlaps(this.viewportRect)){
            if(this.viewportRect.left < this.viewPort.left)
            this.viewPort.x = this.viewportRect.left;
            if(this.viewportRect.top < this.viewPort.top)
            this.viewPort.y = this.viewportRect.top;
            if(this.viewportRect.right > this.viewPort.right)
            this.viewPort.x = this.viewportRect.right - configs.width;
            if(this.viewportRect.bottom > this.viewPort.bottom)
            this.viewPort.y= this.viewportRect.bottom - configs.height;
        }
    }
    follow(item = null,xZone,yZone){
        console.log('follow camera');
        this.sub = item;
        this.deathZone = [xZone,yZone];
    }
}