import config from "./config";
import ViewPort from './viewPort';
let Vector = require('./Vector');

export default class Camera {

    constructor(){
        this.deathZone = [0,0];
        this.viewPort = [0,0];
        this.sub = null;
        this.axis = config().AXIS.BOTH;
        this.cavView = [config().width,config().height];
        this.viewportRect = new ViewPort(this.viewPort[0],this.viewPort[1],this.cavView[0],this.cavView[1]);
    }

    toWorld(position,viewPort) {
        return position.add(position, viewPort);
      }

      toCanvas(position,viewPort) {
        return Vector.sub(position, viewPort);
      }

    update(sub = this.sub){


        let configs = config();
        if(this.axis == configs.AXIS.HORIZONTAL || this.axis == configs.AXIS.BOTH){

            				// moves camera on horizontal axis based on followed object position
                    if(sub.coords.x - this.viewPort[0]  + this.deathZone[0] > this.cavView[0])
                    this.viewPort[0] = sub.coords.x - (this.cavView[0] - this.deathZone[0]);
                    else this.viewPort[0] = sub.coords.x  - this.deathZone[0];
        }

        if(this.axis == configs.AXIS.VERTICAL || this.axis == configs.AXIS.BOTH){
            if(sub.coords.y - this.viewPort[1] + this.deathZone[1] > this.cavView[1])
            this.viewPort[1] = sub.coords.y - (this.cavView[1] - this.deathZone[1]);
            else this.viewPort[1] = sub.coords.y - this.deathZone[1];
        }


        if (this.viewPort[0] < 0) this.viewPort[0] = 0;
        if (this.viewPort[1] < 0) this.viewPort[1] = 0;

        this.viewportRect.update(...this.viewPort);

        if(!this.viewportRect.check(this.viewportRect) && !this.viewportRect.overlaps(this.viewportRect)){
            if(this.viewportRect.left < this.viewPort.left)
            this.viewPort[0] = this.viewportRect.left;
            if(this.viewportRect.top < this.viewPort.top)
            this.viewPort[1] = this.viewportRect.top;
            if(this.viewportRect.right > this.viewPort.right)
            this.viewPort[0] = this.viewportRect.right - configs.width;
            if(this.viewportRect.bottom > this.viewPort.bottom)
            this.viewPort[1]= this.viewportRect.bottom - configs.height;
        }
    }
    follow(item = null,xZone,yZone){
        console.log('follow camera');
        this.sub = item;
        this.deathZone = [xZone,yZone];
    }
}