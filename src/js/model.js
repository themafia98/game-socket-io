import config from "./modules/config";

class Game {
    constructor(ctx, ctxBuffer) {
        this.ctx = ctx;
        this.bufferCtx = ctxBuffer;
        this.view = null;
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

class Player {

    constructor(name, skin) {
        this.name = name;
        this.skin = skin;
        this.speed = 5;

        this.world = "1"; //default

        this.position = "right";
        this.currentSprite = [105, 254];

        this.startW = config().width / 2;
        this.startH = config().height / 2;

        this.coords = {
            W: this.startW,
            H: this.startH
        };
        this.currentInputDown = "";
    }
    get currentInput() {
        return this.currentInputDown;
    }

    set currentInput(position) {
        this.currentInputDown = position;
    }
}

export { Game, Player };
