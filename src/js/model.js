import config from './modules/config';
import views from './views';
import { throws } from 'assert';



class Game{
    constructor(ctx){
        this.ctx = ctx;
        this.view = null;
    }
    setSize(){
        this.ctx.setAttribute('width',config().width);
        this.ctx.setAttribute('height',config().height);
    }
    eventResize(view,ctx = this.ctx){

        this.view = view;
        window.addEventListener('resize',(e) => {

            this.ctx.setAttribute('width',config().width);
            this.ctx.setAttribute('height',config().height);
            // this.view.mainScene();
        },false);
    }
}




export { Game };

