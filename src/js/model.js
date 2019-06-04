import config from "./modules/config";

class Game {
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
            .currentCoordsBox(player)
            .chatBox();
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
            x: 0,
            y: 0,
            worldStart: [Math.floor(config().map.width/3 * Math.random()),
                        Math.floor(config().map.height/3 * Math.random())]
        };
        this.viewPort = {
            x: this.startW,
            y: this.startH
        }
        this.currentInputDown = "";
    }
    get currentInput() {
        return this.currentInputDown;
    }

    set currentInput(position) {
        this.currentInputDown = position;
    }
}

class Map{

    constructor(){
        this.size = [0,0];
        this.worldMap = false;
    }
    create(sizeX,sizeY){
        this.size = [sizeX,sizeY];
        this.worldMap = true;
        console.log('world map create');
    }
}


class Camera {

    constructor(){
        this.coords = [0,0];
        this.viewPort = [0,0];
        this.sub = null;
    }
    move(x = 0,y = 0){
        this.coords[0] += x;
        this.coords[1] += y;
    }
    update(){
        console.log('update camera');

    }
    follow(item = null,viewX = 0,viewY = 0){
        console.log('follow camera');
        this.viewPort[0] = viewX;
        this.viewPort[1] = viewY;
        this.sub = item;
    }
}

class Audio{

    constructor(buffer){
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.gainNode = null;
        this.source = null;
        this.buffer = buffer;

    }

    play(){
        this.source.start(this.context.currentTime);

        return this;
    }

    stop(){
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        this.source.stop(this.context.currentTime + 0.5);
        return this;
    }

    init(type = 'sine'){

        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        return this;
    }
}

export { Game, Player,Map, Camera, Audio};
