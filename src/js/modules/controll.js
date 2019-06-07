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
        // socket.emit('saveChanges', {player:  loader.player, input: e.which});
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
            let socket = socketIO(views, loader, route, game);

            socket.on("connect", function() {
                console.log("socket connection, create new player.");
                let skin = {ID: 0, skin: loader.getGamerSkin(0)};
                let player = new Player(username, skin);
                player.id = socket.id;

                loader.loadPlayer(player);
                loader.saveSocket(socket);
                loader.player.sprite = sprite;
                camera.follow(loader.player,configs.width/2,configs.height/2);

                socket.emit("save",{
                    player: player,
                    worldNumber: worldNumber
                });
            });
        }
        },false);

    document.addEventListener("keyup",e => {
        let target = e.target;

        if (states("game", "get")) {
            let input = document.querySelector(".chatBox__input");
            if (e.which == 13 && target.classList[0] === "chatBox__input") {
                if (input.value)
                    loader.getSocket().emit("messageServer", {
                    msg: e.target.value,
                    world: loader.player.world
                    });
                input.value = "";
            }
            loader.player.input = '';
        }
    },false);
}
