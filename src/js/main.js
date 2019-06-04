import {Game} from './model';
import {MainGameView} from './views';
import states from './modules/states';
import controll from './controll';
import Loader from './loader';


    function main(){

        const game = new Game(document.getElementById('MMO'));
        const loader = new Loader();
        const views = new MainGameView(game.ctx);

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

            // if(!loader.player) return requestAnimationFrame(route);
        
            if (states('game','get')){
                let answer = isEmpty(loader.other);
        
                views.mainGameScene(loader.texture[0]);
                views.renderHero(skin,loader.player,window.getInput(),loader.getSocket());
                if (!answer) views.renderEnemy(skin,loader.other,loader.player);
            }
            requestAnimationFrame(route);
        }
        
        function isEmpty(obj) {
            for (var key in obj) {
              return false;
            }
            return true;
          }
    // let loop = requestAnimationFrame(route);
};

export {main};



