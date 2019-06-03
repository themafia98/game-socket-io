import {Player} from './model';
import states from './modules/states';

export default function controll(socket,route,views,loader){

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

            let name = document.querySelector('.loginMain').value;
            let skin = loader.getGamerSkin(0);
            let player = new Player(name,skin);
            player.id = socket.id;
            loader.loadPlayer(player);
            socket.emit('save', player);
        }

    },false);

    document.addEventListener('keyup',(e) => {

   
        let target = e.target;

        if (states('game','get')){
            console.log(e.which);
            if (e.which == 13 && target.classList[0] === 'chatBox__input'){
                console.log('change');
                socket.emit('messageServer', e.target.value);
            }

            inputDown = '';
        }
    },false);


    socket.on('chatMessage',function(e,username = 'test'){
        let chatList = document.querySelector('.chatBox__window');
        if (chatList.children.length > 30)
            chatList.firstChild.remove();
        let name = 'Pavel';
        let message = document.createElement('p');
        message.classList.add('message');
        message.innerHTML = username + ': ' + e;
        chatList.appendChild(message);
        chatList.scrollTop = chatList.scrollHeight;
    });

        socket.on('changeState',function(player){

            console.log('Hello,' + player.name);
            states('game','set');
                views.removeLogin();
                views.chatBox();
                requestAnimationFrame(route);
        });

        let skin2 = loader.getGamerSkin(0);

        socket.on('update',function(players){

            let found = {};

            for (let id in players){

                if (loader.other[id] == undefined && id != socket.id){
                    loader.other[id] = players;
                    console.log('Create new player');
                }

                found[id] = true;

                if (id != socket.id){
                    loader.other[id].coords = players[id].coords;
                }
            }
        });

        socket.on('saveChangesClient',function(player){

            let currentPlayer = loader.getPlayer();
            currentPlayer.coords = player.coords;
        });

        socket.on('disconnectPlayer',function(id){

           delete loader.other[id];
        });

    
}