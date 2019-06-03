import config from "./modules/config";
import 'babel-polyfill';

class MainGameView{
    constructor(ctx){
        this.ctx = ctx;
        this.count = 0;
        this.speed = 5;
    }

    async mainGameScene(img,canvas = this.ctx){


        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,this.ctx.width,this.ctx.height);
        ctx.fillStyle = 'black';
            let x = -50;
            let y = 0;
            let width = config().width;
            let height = config().height;

            let countY = Math.floor(height/192);
            let countX = Math.floor(width/192);

            for (let j = 0; j < countY; j++){
                for (let i = 0; i < countX+3; i++){
                    ctx.drawImage(img,-5,195,192,192,x,y,192,192);
                    x += 182;
                }
                x = -50; y += 192;
            }
    }

    async renderHero(skin,player,go,socket,canvas = this.ctx){

        let ctx = canvas.getContext('2d');
        switch(go){
            case 'down': player.coords.H += this.speed; break;
            case 'up': player.coords.H -= this.speed; break;
            case 'left':player.coords.W -= this.speed; break;
            case 'right': player.coords.W += this.speed; break;
            default:{
       
            }
        }
        ctx.drawImage(skin,player.coords.W, player.coords.H);
        socket.emit('saveChanges',{id: player.id, coords: { W: player.coords.W, H: player.coords.H} });
    }

    async renderEnemy(skin2,other_players,socket){

        let ctx = this.ctx.getContext('2d');
        for (let id in other_players){
            ctx.drawImage(skin2,other_players[id].coords.W, other_players[id].coords.H);
        }
    }


    chatBox(){

        let gameBox = document.querySelector('.game');
        let width = config().width;
        let height = config().height;

        this.count = 0;

        let chat = document.createElement('div');
        chat.classList.toggle('chatBox');

        let chatWindow = document.createElement('div');
        chatWindow.classList.toggle('chatBox__window');

        let input = document.createElement('input');
        input.classList.toggle('chatBox__input');
        input.setAttribute('type','text');

        chat.appendChild(chatWindow);
        chat.appendChild(input);
        gameBox.appendChild(chat);
    }

    mainMenu(canvas = this.ctx){
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,config().width,config().height);
        if (this.count === 0){
            this.count++;
        return 200;
        } else return 304;
    }

   loginRender(){

        let wrapper = document.createElement('div');
        wrapper.classList.add('loginPanel');

        let inputLogin = document.createElement('input');
        inputLogin.setAttribute('type','text',);
        inputLogin.classList.add('loginMain');
        inputLogin.setAttribute('placeholder','login');

        let inputGo = document.createElement('input');
        inputGo.classList.add('loginButton');
        inputGo.setAttribute('type','button');
        inputGo.setAttribute('value','Enter');

        wrapper.appendChild(inputLogin);
        wrapper.appendChild(inputGo);
        document.body.append(wrapper);

        return document.querySelector('.loginButton');

    }

    removeLogin(){
        return document.querySelector('.loginPanel').remove();
    }
}


export { MainGameView };