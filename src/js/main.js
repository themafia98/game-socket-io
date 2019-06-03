import {Game} from './model';
import {MainGameView} from './views';
import states from './modules/states';
import controll from './controll';
import Loader from './loader';


export function main(socket){

    let game = new Game(document.getElementById('MMO'));
    let loader = new Loader();
    let views = new MainGameView(game.ctx);

    let img = new Image();
    let hero = new Image();
    img.src = '../images/s1.png';
    hero.src = '../images/hero1.png';

    loader.loadTexture(img);
    loader.loadGamerSkin(hero);

    controll(socket,route,views,loader);

    game.setSize();
    game.eventResize(views);
    states('main','set');
    if (states('main','get')){
        views.mainMenu();
        views.loginRender();
    }

    let skin = loader.getGamerSkin(0);

    async function route(time){

        if(!loader.player) return requestAnimationFrame(route);

        if (states('game','get')){

            let answer = isEmpty(loader.other);
    
            views.mainGameScene(img);
            views.renderHero(skin,loader.player,window.getInput(),socket);
            if (!answer) views.renderEnemy(skin,loader.other,socket);
        }
        requestAnimationFrame(route);
    }

    // let loop = requestAnimationFrame(route);
};

function isEmpty(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

