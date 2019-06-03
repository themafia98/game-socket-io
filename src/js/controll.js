import {Player} from './model';
import states from './modules/states';
import socketIO from './modules/socketClient';

export default function controll(views,loader,route){

    let inputDown = null;

    document.addEventListener('keydown',(e) => {
        let target = e.target;

        if(target.classList[0] === 'chatBox__input') return;

        if (states('game','get')){
            switch(e.which){
                case 87: inputDown = 'up'; break;
                case 65: inputDown = 'left'; break;
                case 68: inputDown = 'right'; break;
                case 83: inputDown = 'down'; break;
            }
        }

    },false);

    window.getInput = function(){
        return inputDown;
    };

    document.addEventListener('click',(e)=>{

        if (e.target.classList[0] === 'loginButton'){

            let username = document.querySelector('.loginMain').value;
            let socket = socketIO(views,loader,route);

            socket.on('connect', function() {
                console.log('socket connection, create new player.');
                let skin = loader.getGamerSkin(0);
                let player = new Player(username,skin);
                player.id = socket.id;
            
                loader.loadPlayer(player);
                loader.saveSocket(socket);
                socket.emit('save', player);
              });
        }

    },false);

    document.addEventListener('keyup',(e) => {

   
        let target = e.target;

        if (states('game','get')){
            console.log(e.which);
            if (e.which == 13 && target.classList[0] === 'chatBox__input'){
                console.log('change');
                loader.getSocket().emit('messageServer', e.target.value);
            }

            inputDown = '';
        }
    },false);


    
}