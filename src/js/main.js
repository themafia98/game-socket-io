import {Game} from './model';
import {MainGameView} from './views';
import states from './modules/states';


export default (socket) => {

    let game = new Game(document.getElementById('MMO'));
    let views = new MainGameView(game.ctx);
    let img = new Image();
    img.src = '../images/s1.png';

    game.setSize();
    game.eventResize(views);
    states('main','set');
    if (states('main','get')){

        views.mainMenu()
        .then(res =>{
            if (res === 200){
               views.loginRender()
               .then(res => {
                    res.addEventListener('click',(e)=>{
                        socket.emit('save', document.querySelector('.loginMain').value);
                    },false);
               });
            }
        });

    }



    document.addEventListener('keypress',(e) => {

        console.log(socket);
        let target = e.target;

        if (states('game','get')){
            console.log(e.which);
            if (e.which == 13 && target.classList[0] === 'chatBox__input'){
                console.log('change');
                socket.emit('messageServer', e.target.value);
            }
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

    socket.on('changeState',function(username){

        console.log('Hello,' + username);
        states('game','set');
        if (states('game','get')) {
            views.removeLogin();
            views.chatBox();
        }
    });
    let loop = requestAnimationFrame(route);

    async function route(){

        if (states('game','get')){
    
            views.mainGameScene(img);
        }
        requestAnimationFrame(route);
    }

};