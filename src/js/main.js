import Game from './modules/game';
import Sprite from './modules/sprite';
import Camera from './modules/camera';
import { MainGameView} from './modules/views';
import states from './modules/states';
import controll from './modules/controll';
import Loader from './modules/loader';
import Tile from './modules/map';

const map = require('../../map.json');


export default function main() {

    const game = new Game(document.getElementById('MMO'), document.createElement('canvas'));
    // const audio = new Audio();
    const spriteMaker = new Sprite();
    const tile = new Tile(3200);
    const loader = new Loader();
    const views = new MainGameView(game.ctx, game.bufferCtx);
    const camera = new Camera();


    let sprite = null;
    let hero2 = new Image();
    hero2.src = './images/hero2.png';

    hero2.onload = (e) => {

        sprite = spriteMaker.create(hero2, 4, true, 'x');
        e.stopPropagation();
    }


    let img = new Image();
    let hero = new Image();
    img.src = '../images/floor.png';
    hero.src = '../images/hero1.png';

    loader.loadTexture(img);
    loader.loadGamerSkin(hero);

    img.onload = (e) => {

        loader.loadTexture(tile.createMap('map', map, img));
        e.stopPropagation();
    };

    controll(views, loader, route.bind(this), game, camera);

    game.setSize();
    game.eventResize(views);
    states('main', 'set');

    if (states('main', 'get')) {
        views.mainMenu();
        views.loginRender();
    }

    let socket = null;
    let PushInput = null;

    let end, fpsInterval, delta, start;
    ({end, fpsInterval, delta, start} = {end:0, fpsInterval: 0, delta: 0, start: 0});

    console.log(end);

    async function route(fps) {

        fpsInterval = 1000 / fps;
        start = Date.now();

        delta = start - end;

        if (delta > fpsInterval) {

            socket = loader.getSocket();
            PushInput = getInput();
            camera.update();
            loader.player.update(camera);
            views.clear();
            views.render(PushInput, loader, camera);

            end = start - (delta % fpsInterval);
            requestAnimationFrame(route);
        }
    }
};



