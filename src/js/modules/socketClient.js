import io from "socket.io-client";
import states from "./states";
import config from './config';
import { type } from "os";
import { nextTick } from "q";

export default function SocketIOClient(views, loader, route, game, camera) {
  let socket = null;
  if (process.env.NODE_ENV === 'production')
  socket = io("https://socketiotestgame.herokuapp.com/");
  else socket = io("http://localhost:5000/");

  socket.on("reconnect_attempt", () => {
    socket.io.opts.transports = ["polling", "websocket"];
  });

  socket.on("error", function() {
    console.log("there was an error");
  });

  socket.on("connectPlayer", function(user) {
    views.connectionInfo(user);
  });

  socket.on("chatMessage", function(e, username = "test") {
    let chatList = document.querySelector(".chatBox__window");

    if (chatList.children.length > 30) chatList.firstChild.remove();

    let message = document.createElement("p");
    message.classList.add("message");
    message.innerHTML = username + ": " + e;
    chatList.appendChild(message);

    chatList.scrollTop = chatList.scrollHeight;
  });

  socket.on("changeState", function() {
    let windowGame = document.querySelector('.game');
    let cav = document.querySelectorAll("canvas");
    windowGame.classList.toggle('gameMain');
    cav[1].remove();
    cancelAnimationFrame(views.cbAnimate);
    loader.saveSocket(socket);
    game.loadGame(views,loader, camera);
    states("game", "set");
    requestAnimationFrame(route);
  });

  socket.on("update",function(data) {

    if(data.self){
      loader.player.coords.x = data.self.coords.x;
      loader.player.coords.y = data.self.coords.y;
      loader.player.position = data.self.position;
      loader.player.input = data.self.input;
    }

    data.players = JSON.parse(data.players);

    console.log(data.players);

    let arr = Object.keys(data.players);
    let arrValue = Object.values(data.players);
    
    arr.forEach((id,i) => {
      if (loader.player.id != id)
      loader.other.set(id,arrValue[i]);
    });
  });


  socket.on("disconnectPlayer", function(id) {
    views.disconnectInfo(loader.other[id]);
    delete loader.other[id];
  });

  return socket;
}
