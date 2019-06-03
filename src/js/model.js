import config from './modules/config';

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

class Player{
    constructor(name,skin){
        this.name = name;
        this.skin = skin;

        this.startW = config().width/2;
        this.startH = config().height/2;

        this.coords = {W: this.startW, H: this.startH};
        this.currentInputDown = '';

    } 
    get currentInput() {
        return this.currentInputDown;
    }

    set currentInput(position){
        this.currentInputDown = position;
    }
}

export { Game, Player };

