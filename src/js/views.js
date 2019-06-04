import config from "./modules/config";
import input from './modules/input';
import 'babel-polyfill';

class MainGameView{
    constructor(ctx,bufferCtx){
        this.ctx = ctx;
        this.isThree3D = true;
        this.scene = null;

        this.cbAnimate = null;

        this.boxCoordsX = null;
        this.boxCoordsY = null;

        this.bufferCanvas = bufferCtx;
        this.bufferCtx = this.bufferCanvas.getContext('2d');

        this.canvas = document.getElementById('MMO');
        this.ctx = this.canvas.getContext('2d');

        this.settings = {
            sprite:{
                spriteMenLeft: [105,254],
                spriteMenRight: [19,254]
            },

            texture:{
                const: [-50,192],
                coords: [-50,0],
            },
        };
    }

    async renderSnapshot(){

        let canvas = this.canvas;
        let ctx = this.ctx;

        ctx.drawImage(this.bufferCanvas,0,0);
    }

    async renderCoords(player){
        this.boxCoordsX.innerHTML = player.coords.x;
        this.boxCoordsY.innerHTML = player.coords.y;
    }

    async mapRender(img,camera){

        let canvas = this.bufferCanvas;
        let ctx = this.bufferCtx;
        ctx.clearRect(0,0,this.ctx.width,this.ctx.height);
        ctx.fillStyle = 'black';
            let x = this.settings.texture.coords[0];
            let y = this.settings.texture.coords[1];
            let width = config().width;
            let height = config().height;

            let countY = Math.floor(height/192);
            let countX = Math.floor(width/192);

            for (let j = 0; j < countY; j++){
                for (let i = 0; i < countX+3; i++){
                    ctx.drawImage(img,-5,195,192,192, x, y,192,192);
                    x += 182;
                }
                x = this.settings.texture.const[0];
                y += this.settings.texture.const[1];
        }
    }

    async renderHero(skin,player,go,socket,camera){

        let canvas = this.bufferCanvas;
        let ctx = this.bufferCtx;

        input(player,go,this.settings,camera);

        ctx.fillStyle = 'red';
        ctx.font = '20px serif';

        ctx.fillText(player.name,-camera.coords[0] + player.viewPort.x,
                    -camera.coords[1] +player.viewPort.y-10);

        ctx.drawImage(skin,player.currentSprite[0],player.currentSprite[1],
                        60,125,-camera.coords[0] + player.viewPort.x,
                        -camera.coords[1] + player.viewPort.y,60,125);

        socket.emit('saveChanges',{id: player.id, coords: { x: player.coords.x, y: player.coords.y},
                    player: player });
    }

    async renderOtherPlayers(skin2,other_players,player){

        let canvas = this.bufferCanvas;
        let ctx = this.bufferCtx;

        for (let id in other_players){
            if (other_players[id].world == player.world){

            ctx.fillStyle = 'red';
            ctx.font = '20px serif';
            ctx.fillText(other_players[id].name,other_players[id].coords.x,other_players[id].coords.y-10);
            ctx.drawImage(skin2,other_players[id].currentSprite[0],other_players[id].currentSprite[1],
                            60,125,other_players[id].coords.x, other_players[id].coords.y,60,125);
            }
        }
    }

    currentCoordsBox(player){

        let gameBox = document.querySelector('.game');
        let box = document.createElement('div');
        box.classList.add('currentCoordsBox');

        let p = document.createElement('p');
        p.classList.add('currentCordsBox__coords');
        
        let x = document.createElement('span');
        x.innerHTML = player.coords.worldStart[0];
        x.classList.add('x_player');
        let y = document.createElement('span');
        y.classList.add('y_player');
        y.innerHTML = player.coords.worldStart[1];
        p.appendChild(x)
        p.appendChild(y);

        box.appendChild(p);

        gameBox.appendChild(box);

        this.boxCoordsX = document.querySelector('.x_player');
        this.boxCoordsY = document.querySelector('.y_player');
        return this;
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
        return this;
    }

    mainMenu(){

        document.querySelector('.game').classList.add('gameMain');
        let ctx = this.ctx;
        ctx.save();
        ctx.clearRect(0,0,config().width,config().height);
        this.scene ? this.scene.remove.apply(this.scene, this.scene.children) : null;
        ctx.fillStyle = 'tomato';
        ctx.font = '80px serif';
        ctx.translate(-180,0);
        ctx.shadowColor = 'red';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 6;
        ctx.shadowBlur = 5;
        ctx.fillText('Social game',config().width/2,80);
        ctx.restore();
        ctx.save();

        this.scene = new THREE.Scene();

        const color = 'red';
        const density = 0.14;
        this.scene.fog = new THREE.FogExp2(color, density);

        let camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.5, 1000 );

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.isThree3D ? document.body.appendChild( renderer.domElement ) : '';

        let geometry = new THREE.BoxGeometry( 2, 1, 2 );
        let material = new THREE.MeshBasicMaterial( { color: 'lightgreen' } );
        let cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        camera.position.z = 6;

        this.cbAnimate =() => {
            requestAnimationFrame( this.cbAnimate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( this.scene, camera );
        };

        this.cbAnimate();
        this.isThree3D = false;
    }

    async disconnectInfo(user){
        let chatList = document.querySelector('.chatBox__window');
        let message = document.createElement('p');
        message.classList.add('message_disconnect');
        message.innerHTML = `${user.name} disconnect from world ${user.world}`;
        chatList.appendChild(message);
        chatList.scrollTop = chatList.scrollHeight;
    }

    async connectionInfo(user){

        let chatList = document.querySelector('.chatBox__window');
        let message = document.createElement('p');
        message.classList.add('message_connection');
        message.innerHTML = `${user.name} connection in world ${user.world}`;
        chatList.appendChild(message);
        chatList.scrollTop = chatList.scrollHeight;
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

        let version = document.createElement('p');
        version.classList.add('version');
        version.innerHTML = config().version;

        wrapper.appendChild(inputLogin);
        wrapper.append(aboutChannel);
        channelWrapper.appendChild(label1);
        channelWrapper.appendChild(channel1);
        channelWrapper.appendChild(label2);
        channelWrapper.appendChild(channel2);

        wrapper.appendChild(channelWrapper);

        wrapper.appendChild(inputGo);
        wrapper.appendChild(version);
        document.body.append(wrapper);

        return document.querySelector('.loginButton');

    }

    removeLogin(){

        document.querySelector('.loginPanel').remove();
        return this;
    }
}


export { MainGameView};