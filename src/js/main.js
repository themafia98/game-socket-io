import {Game} from './model';
import {MainGameView, Camera} from './views';
import states from './modules/states';
import controll from './controll';
import Loader from './loader';


    function main(){

        const game = new Game(document.getElementById('MMO'), document.createElement('canvas'));
        const loader = new Loader();
        const views = new MainGameView(game.ctx,game.bufferCtx);
        const camera = new Camera();

        let img = new Image();
        let hero = new Image();
        img.src = '../images/s1.png';
        hero.src = '../images/hero1.png';

        loader.loadTexture(img);
        loader.loadGamerSkin(hero);

        controll(views,loader,route.bind(this));

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
                views.renderHero(skin,loader.player,window.getInput(),
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



