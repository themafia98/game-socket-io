import config from "./config";
import input from "./input";

class MainGameView {
  constructor(ctx, bufferCtx) {

    this.ctx = ctx;

    this.isThree3D = true;
    this.scene = null;
    this.cbAnimate = null;

    this.boxShowCoords = {
        boxCoordsX: null,
        boxCoordsY: null,
    }
    this.buffer = {
        mainBuffer: bufferCtx,
        bufferOther: document.createElement("canvas"),
    }

    this.canvas = document.getElementById("MMO");
    this.ctx = this.canvas.getContext("2d");

    this.saveViewPort = {
      x: 0,
      y: 0
    };

    this.settings = {
        sprite: {
            spriteMenLeft: [105, 254],
            spriteMenRight: [19, 254]
        },
    };
  }

  clear(){
    let ctxBuff = this.buffer.bufferOther.getContext('2d');
    let mainBuff = this.buffer.mainBuffer.getContext('2d');

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    ctxBuff.clearRect(0,0,this.buffer.bufferOther.width,this.buffer.bufferOther.height);
    mainBuff.clearRect(0,0,this.buffer.mainBuffer.width,this.buffer.mainBuffer.height);
  }

  render(PushInput, loader, camera) {
    this.mapRender(loader.texture[1], camera);
    PushInput && this.renderCoords(loader.getPlayer());

    this.renderHero(loader, PushInput, camera);

    if (!isEmpty(loader.other))
      this.renderOtherPlayers(loader, camera);

    this.renderSnapshot();
  }

  renderSnapshot() {
    let canvas = this.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.buffer.mainBuffer, 0, 0);
  }

  async renderCoords(player) {
      if (this.boxShowCoords.boxCoordsX == null) return -1;
    this.boxShowCoords.boxCoordsX.innerHTML = player.coords.x;
    this.boxShowCoords.boxCoordsY.innerHTML = player.coords.y;
  }

  async mapRender(map, camera) {
    let canvas = this.buffer.mainBuffer;
    let ctx = canvas.getContext('2d');

    let x = camera.viewPort.x;
    let y = camera.viewPort.y;

    let viewWidth = canvas.width;
    let viewHeight = canvas.height;

    // if cropped image is smaller than canvas we need to change the source dimensions
    if (map.imageWidth.width - x < viewWidth) {

        viewWidth = map.width - x;
    }
    if (map.imageWidth.height - y < viewHeight) {

        viewHeight = map.imageWidth.height - y;
    }

    // match destination with source to not scale the image
    let dWidth = viewWidth;
    let dHeight = viewHeight;

    ctx.drawImage(map.imageWidth.images,
                x,y,viewWidth,viewHeight,
                0,0,dWidth,dHeight
    );
  }

  renderHero(loader, PushInput, camera) {

    let player = loader.getPlayer();
    let socket = loader.getSocket();
    let canvas = this.buffer.mainBuffer;
    let ctx = canvas.getContext('2d');

    PushInput ? input(player, PushInput, this.settings, camera) : null;

    ctx.fillStyle = "red";
    ctx.font = "20px serif";

    ctx.fillText(
        player.name,
        player.coords.x - camera.viewPort.x,
        player.coords.y - camera.viewPort.y
    );

    let skinID = player.skin.ID;
    let getSkin = loader.getGamerSkin(skinID);

    ctx.drawImage(getSkin,
        player.currentSprite[0],player.currentSprite[1],
        60,125,
        player.coords.x - camera.viewPort.x,
        player.coords.y - camera.viewPort.y,
        60,125
    );

    socket.emit("saveChanges", {
        id: player.id,
        coords: {
            x: player.coords.x,
            y: player.coords.y
        },
        player: player
    });
  }

   renderOtherPlayers(loader, camera) {
    let player = loader.getPlayer();
    let other_players = loader.other;
    let canvas = this.buffer.mainBuffer;
    let ctx = canvas.getContext('2d');

    for (let id in other_players) {
    if (other_players[id].world == player.world) {

        other_players[id].coords.x = other_players[id].coords._x;
        other_players[id].coords.y = other_players[id].coords._y;

        ctx.fillStyle = "red";
        ctx.font = "20px serif";

        let x = other_players[id].coords.x;
        let y = other_players[id].coords.y;

        camera.setCoordsFromViewPort(camera.viewPort.x,
                            camera.viewPort.y
        );

        let coords = camera.toCanvas(other_players[id].coords);

        let skinID = other_players[id].skin.ID;
        let getSkin = loader.getGamerSkin(skinID);

        ctx.fillText(other_players[id].name, coords.x, coords.y);
        ctx.drawImage(getSkin,
            other_players[id].currentSprite[0],
            other_players[id].currentSprite[1],
            60,125,coords.x,coords.y,60,125
        );
        }
    }
    let othersPlayers = new Image();
    othersPlayers.src = canvas.toDataURL("image/png");

    return othersPlayers;
  }

  async currentCoordsBox(player) {
    let gameBox = document.querySelector(".game");
    let box = document.createElement("div");
    box.classList.add("currentCoordsBox");

    let p = document.createElement("p");
    p.classList.add("currentCordsBox__coords");

    let x = document.createElement("span");
    x.innerHTML = player.coords.worldStart[0];
    x.classList.add("x_player");
    let y = document.createElement("span");
    y.classList.add("y_player");
    y.innerHTML = player.coords.worldStart[1];
    p.appendChild(x);
    p.appendChild(y);

    box.appendChild(p);

    gameBox.appendChild(box);

    this.boxShowCoords.boxCoordsX = document.querySelector(".x_player");
    this.boxShowCoords.boxCoordsY = document.querySelector(".y_player");
    return this;
  }

  chatBox() {
    let gameBox = document.querySelector(".game");
    let chat = document.createElement("div");
    chat.classList.toggle("chatBox");

    let chatWindow = document.createElement("div");
    chatWindow.classList.toggle("chatBox__window");

    let input = document.createElement("input");
    input.classList.toggle("chatBox__input");
    input.setAttribute("type", "text");

    chat.appendChild(chatWindow);
    chat.appendChild(input);
    gameBox.appendChild(chat);
    return this;
  }

  async mainMenu() {

    document.querySelector(".game").classList.add("gameMain");
    let ctx = this.ctx;

    ctx.save();
    ctx.clearRect(0, 0, config().width, config().height);
    this.scene? this.scene.remove.apply(this.scene, this.scene.children): null;

    ctx.fillStyle = "tomato";
    ctx.font = "80px serif";

    ctx.translate(-180, 0);
    ctx.shadowColor = "red";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 6;
    ctx.shadowBlur = 5;

    ctx.fillText("Social game", config().width / 1.4, 80);

    ctx.restore();
    ctx.save();

    this.scene = new THREE.Scene();

    const color = "red";
    const density = 0.14;
    this.scene.fog = new THREE.FogExp2(color, density);

    let camera = new THREE.PerspectiveCamera(30,
        window.innerWidth / window.innerHeight,
        0.5,1000
    );

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.isThree3D ? document.body.appendChild(renderer.domElement) : "";

    let geometry = new THREE.BoxGeometry(2, 1, 2);
    let material = new THREE.MeshBasicMaterial({
      color: "lightgreen"
    });
    let cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    camera.position.z = 6;

    this.cbAnimate = () => {
      requestAnimationFrame(this.cbAnimate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(this.scene, camera);
    };

    this.cbAnimate();
    this.isThree3D = false;
  }

  async disconnectInfo(user) {
    let chatList = document.querySelector(".chatBox__window");
    let message = document.createElement("p");
    message.classList.add("message_disconnect");
    message.innerHTML = `${user.name} disconnect from world ${user.world}`;
    chatList.appendChild(message);
    chatList.scrollTop = chatList.scrollHeight;
  }

  async connectionInfo(user) {
    let chatList = document.querySelector(".chatBox__window");
    let message = document.createElement("p");
    message.classList.add("message_connection");
    message.innerHTML = `${user.name} connection in world ${user.world}`;
    chatList.appendChild(message);
    chatList.scrollTop = chatList.scrollHeight;
  }

  loginRender() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("loginPanel");

    let inputLogin = document.createElement("input");
    inputLogin.setAttribute("type", "text");
    inputLogin.classList.add("loginMain");
    inputLogin.setAttribute("placeholder", "login");

    let channelWrapper = document.createElement("div");
    channelWrapper.classList.add("channels");

    let aboutChannel = document.createElement("p");
    aboutChannel.classList.add("worldsList");
    aboutChannel.innerHTML = "Worlds";

    let label1 = document.createElement("label");
    label1.innerHTML = "1";

    let label2 = document.createElement("label");
    label2.innerHTML = "2";

    let channel1 = document.createElement("input");
    channel1.setAttribute("type", "radio");
    channel1.setAttribute("name", "channels");
    channel1.setAttribute("data-world", "1");

    let channel2 = document.createElement("input");
    channel2.setAttribute("type", "radio");
    channel2.setAttribute("name", "channels");
    channel2.setAttribute("data-world", "2");

    let inputGo = document.createElement("input");
    inputGo.classList.add("loginButton");
    inputGo.setAttribute("type", "button");
    inputGo.setAttribute("value", "Enter");

    let version = document.createElement("p");
    version.classList.add("version");
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

    return document.querySelector(".loginButton");
  }

  removeLogin() {
    document.querySelector(".loginPanel").remove();
    return this;
  }
}

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

export { MainGameView };
