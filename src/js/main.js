import {Game} from './model';
import {MainView} from './views';


export default () => {
    let game = new Game(document.getElementById('MMO'));

    game.setSize();
    game.eventResize();

    let views = new MainView(game.ctx);
    views.mainScene();
    views.chatBox();

    document.addEventListener('keypress',(e) => {

        let target = e.target;

        if (e.which == 13 && target.classList[0] === 'chatBox__input'){
           let chatList = document.querySelector('.chatBox__window');
           let message = document.createElement('p');
           message.classList.add('message');
           message.innerHTML = target.value;
           chatList.appendChild(message);
           chatList.scrollTop = chatList.scrollHeight;
           target.value = '';
        }
    },false);


};