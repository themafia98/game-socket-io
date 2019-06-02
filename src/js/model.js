import config from './modules/config';


class Game{
    constructor(ctx){
        this.ctx = ctx;
    }
    setSize(){
        this.ctx.setAttribute('width',config().width);
        this.ctx.setAttribute('height',config().height);
    }
    eventResize(ctx = this.ctx){

        window.addEventListener('resize',(e) => {

            this.ctx.setAttribute('width',config().width);
            this.ctx.setAttribute('height',config().height);
            this.ctx.setAttribute('data-sad','asdas');
            console.log(this.ctx);
        },false);
    }
}




export { Game };

