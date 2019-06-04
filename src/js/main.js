import {Game, Camera, Map, Audio} from './model';
import {MainGameView} from './views';
import states from './modules/states';
import controll from './controll';
import Loader from './loader';
import config from './modules/config';


    function main(){

        const game = new Game(document.getElementById('MMO'), document.createElement('canvas'));
        const worldMap = new Map();
        const audio = new Audio(new Audio());
        const loader = new Loader();
        const views = new MainGameView(game.ctx,game.bufferCtx);
        const camera = new Camera();

        audio.init().play();

        worldMap.create(config().map.width,config().map.height);

        let img = new Image();
        let hero = new Image();
        img.src = '../images/s1.png';
        hero.src = '../images/hero1.png';

        loader.loadTexture(img);
        loader.loadGamerSkin(hero);

        controll(views, loader, route.bind(this), game);

        game.setSize();
        game.eventResize(views);
        states('main','set');
        if (states('main','get')){
            views.mainMenu();
            views.loginRender();
        }

        let skin = loader.getGamerSkin(0);
        let skin2 = loader.getGamerSkin(0);
 
        async function route(time){

            if (states('game','get')){
                views.mapRender(loader.texture[0],camera);
                let input = getInput();
                input && views.renderCoords(loader.player);
                views.renderHero(skin,loader.player,input,
                                loader.getSocket(),camera);

                if (!isEmpty(loader.other))
                    views.renderOtherPlayers(skin,loader.other,loader.player);
                views.renderSnapshot();
            }
            requestAnimationFrame(route);
        }

        function isEmpty(obj) {
            for (let key in obj) {
                return false;
            }
            return true;
        }
};

export {main};



