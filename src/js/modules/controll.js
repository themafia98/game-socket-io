import Player from "./player";
import states from "./states";
import socketIO from "./socketClient";
import config from './config';

export default function controll(views, loader, route, game, camera, sprite){
    let inputDown = null;


    document.addEventListener("keydown", e => {
        let target = e.target;

        if (target.classList[0] === "chatBox__input") return;

        if (states("game", "get")){
        loader.player.input = e.which;
        loader.getSocket().emit("movePlayer", JSON.stringify(loader.player));
    }
    },false);

    window.getInput = function(){
        return inputDown;
    };

    document.addEventListener("click",e => {
        if (e.target.classList[0] === "loginButton"){
            e.target.disabled = true;

            let configs = config();
            let username = document.querySelector(".loginMain").value;
            let worldNumber = [...document.querySelectorAll('[name="channels"]')];
            worldNumber = worldNumber.find(btn => btn.checked === true);
            if (!worldNumber) return;
            worldNumber = worldNumber.dataset.world;
            let socket = socketIO(views, loader, route, game, camera);

            socket.on("connect", function() {
                console.log("socket connection, create new player.");
                let newPlayer = new Player(socket.id, username,{ID: 0, skin: loader.getGamerSkin(0)}, sprite, worldNumber);
                loader.loadPlayer(newPlayer);
                let playerStringServer = JSON.stringify(newPlayer);
                socket.emit("save",{
                    player: playerStringServer,
                });
            });
        }
        },false);

    document.addEventListener("keyup",e => {
        let target = e.target;

        if (e.which != 13 && e.keyCode != 13 && target.classList[0] === "chatBox__input") return;

        if (states("game", "get")) {
            loader.player.input = '';
            let input = document.querySelector(".chatBox__input");
            if (e.which == 13 && target.classList[0] === "chatBox__input") {
                if (input.value)
                    loader.getSocket().emit("messageServer", {
                    msg: e.target.value,
                    world: loader.player.world
                    });
                input.value = "";
            }
            loader.getSocket().emit("movePlayer", JSON.stringify(loader.player));
        }
    },false);
}
