import config from "./config";

export default class Game {
    constructor(ctx, ctxBuffer) {
        this.ctx = ctx;
        this.bufferCtx = ctxBuffer;
        this.view = null;
    }

    loadGame(view,loader, camera){

        view.removeLogin()
            .chatBox()
            .currentCoordsBox(loader.player);
        camera.follow(loader.player,config().width/2,config().height/2);
    }

    setSize() {
        let width = config().width;
        let height = config().height;
        this.ctx.setAttribute("width", width);
        this.ctx.setAttribute("height", height);

        this.bufferCtx.setAttribute("width", width);
        this.bufferCtx.setAttribute("height", height);
    }
    eventResize(view, ctx = this.ctx) {
        this.view = view;
        window.addEventListener("resize",e => {
            let width = config().width;
            let height = config().height;

            this.ctx.setAttribute("width", width);
            this.ctx.setAttribute("height", height);

            this.bufferCtx.setAttribute("width", width);
            this.bufferCtx.setAttribute("height", height);

            view.mainMenu();
        },false);
    }
}


