import Game from './modules/game';
// import Audio from './modules/audio';
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
    const tile = new Tile(3200);
    const loader = new Loader();
    const views = new MainGameView(game.ctx, game.bufferCtx);
    const camera = new Camera();

    let img = new Image();
    let hero = new Image();
    img.src = '../images/s1.png';
    hero.src = '../images/hero1.png';

    loader.loadTexture(img);
    loader.loadGamerSkin(hero);

    img.onload = () => {

        loader.loadTexture(tile.createMap('map', map, img));
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

    async function route(time) {

        let start = Date.now();

        if (states('game', 'get')) {

            socket = loader.getSocket();
            PushInput = getInput();
            camera.update();
            loader.player.update(camera);
            views.render(PushInput, loader, camera);

            requestAnimationFrame(route);
        }
    }
};