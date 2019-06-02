import config from "./modules/config";

class MainView{
    constructor(ctx){
        this.ctx = ctx;
    }

    mainScene(canvas = this.ctx){

        let img = new Image();
        img.src = '../images/s1.png';
        console.log(img);
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        img.onload = () => {
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
        // ctx.fillRect(0,0, canvas.width,canvas.height);
    }

    chatBox(){
        let gameBox = document.querySelector('.game');
        let width = config().width;
        let height = config().height;

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
}

export { MainView };