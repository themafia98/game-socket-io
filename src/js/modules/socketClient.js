import io from "socket.io-client";
import states from "./states";

export default function SocketIOClient(views, loader, route, game) {
  const socket = io("http://localhost:5000/");

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

  socket.on("changeState", function(player) {
    states("game", "set");
    document.querySelectorAll("canvas")[1].remove();
    cancelAnimationFrame(views.cbAnimate);
  
    game.loadGame(views,loader.player);

    requestAnimationFrame(route);
  });

  socket.on("update", function(players) {
    let found = {};
    loader.player.world = players[socket.id].world;

    for (let id in players) {
      if (loader.other[id] == undefined && id != socket.id) {
        loader.other[id] = players[id];
        console.log("Create new player");
      }

      found[id] = true;

      if (id != socket.id) {
        loader.other[id].coords = players[id].coords;
      }
    }

    for (let id in loader.other) {
      if (!found[id]) {
        delete loader.other[id];
      }
    }
  });

  socket.on("saveChangesClient", function(player) {
    let currentPlayer = loader.getPlayer();
    currentPlayer.coords = player.coords;
  });

  socket.on("disconnectPlayer", function(id) {
    views.disconnectInfo(loader.other[id]);
    delete loader.other[id];
  });

  return socket;
}
