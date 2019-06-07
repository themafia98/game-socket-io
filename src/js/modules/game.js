import config from "./config";

export default class Game {
    constructor(ctx, ctxBuffer) {
        this.ctx = ctx;
        this.bufferCtx = ctxBuffer;
        this.view = null;
    }

    loadGame(view,player){

        // set coords
        player.coords.x = player.coords.worldStart[0];
        player.coords.y = player.coords.worldStart[1];
        
        view.removeLogin()
            .chatBox()
            .currentCoordsBox(player);
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


