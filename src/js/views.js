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
        ctx.fillStyle = 'red';
        ctx.font = '20px serif';
        ctx.fillText(player.name,player.coords.W,player.coords.H-10);
        ctx.drawImage(skin,105,254,60,125,player.coords.W, player.coords.H,60,125);
        socket.emit('saveChanges',{id: player.id, coords: { W: player.coords.W, H: player.coords.H} });
    }

    async renderEnemy(skin2,other_players){

        let ctx = this.ctx.getContext('2d');
        for (let id in other_players){
            ctx.fillStyle = 'red';
            ctx.font = '20px serif';
            ctx.fillText(other_players[id].name,other_players[id].coords.W,other_players[id].coords.H-10);
            ctx.drawImage(skin2,105,254,60,125,other_players[id].coords.W, other_players[id].coords.H,60,125);
        }
    }


    chatBox(){

        let gameBox = document.querySelector('.game');
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
        ctx.save();
        ctx.fillStyle = '#f3e5ab';
        ctx.fillRect(0,0,config().width,config().height);
        ctx.fillStyle = 'green';
        ctx.font = '50px serif';
        ctx.translate(-120,0);
        ctx.shadowColor = 'lightgreen';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 8;
        ctx.shadowBlur = 5;
        ctx.fillText('Social game',config().width/2,80);
        ctx.restore();
        ctx.save();
    }

   loginRender(){

        let wrapper = document.createElement('div');
        wrapper.classList.add('loginPanel');

        let inputLogin = document.createElement('input');
        inputLogin.setAttribute('type','text');
        inputLogin.classList.add('loginMain');
        inputLogin.setAttribute('placeholder','login');

        let channelWrapper = document.createElement('div');
        channelWrapper.classList.add('channels');

        let aboutChannel = document.createElement('p');
        aboutChannel.classList.add('worldsList');
        aboutChannel.innerHTML = 'Worlds';

        let label1 = document.createElement('label');
        label1.innerHTML = '1';

        let label2 = document.createElement('label');
        label2.innerHTML = '2';

        let channel1 = document.createElement('input');
        channel1.setAttribute('type','radio');
        channel1.setAttribute('name','channels');
        channel1.setAttribute('data-world', '1');

        let channel2 = document.createElement('input');
        channel2.setAttribute('type','radio');
        channel2.setAttribute('name','channels');
        channel2.setAttribute('data-world', '2');

        let inputGo = document.createElement('input');
        inputGo.classList.add('loginButton');
        inputGo.setAttribute('type','button');
        inputGo.setAttribute('value','Enter');

        wrapper.appendChild(inputLogin);
        wrapper.append(aboutChannel);
        channelWrapper.appendChild(label1);
        channelWrapper.appendChild(channel1);
        channelWrapper.appendChild(label2);
        channelWrapper.appendChild(channel2);

        wrapper.appendChild(channelWrapper);

        wrapper.appendChild(inputGo);
        document.body.append(wrapper);

        return document.querySelector('.loginButton');

    }

    removeLogin(){
        return document.querySelector('.loginPanel').remove();
    }
}


export { MainGameView };