import { Player } from "./model";
import states from "./modules/states";
import socketIO from "./modules/socketClient";

export default function controll(views, loader, route, game){
    let inputDown = null;

    document.addEventListener("keydown", e => {
        let target = e.target;

        if (target.classList[0] === "chatBox__input") return;

        if (states("game", "get")){
            switch (e.which) {
            case 87:
                inputDown = "up";
                break;
            case 65:
                inputDown = "left";
                break;
            case 68:
                inputDown = "right";
                break;
            case 83:
                inputDown = "down";
                break;
            }
        }
    },false);

    window.getInput = function(){
        return inputDown;
    };

    document.addEventListener("click",e => {
        if (e.target.classList[0] === "loginButton"){
            e.target.disabled = true;

            let username = document.querySelector(".loginMain").value;
            let worldNumber = [...document.querySelectorAll('[name="channels"]')];
            worldNumber = worldNumber.find(btn => btn.checked === true);
            if (!worldNumber) return;
            worldNumber = worldNumber.dataset.world;
            let socket = socketIO(views, loader, route, game);

            socket.on("connect", function() {
                console.log("socket connection, create new player.");
                let skin = loader.getGamerSkin(0);
                let player = new Player(username, skin);
                player.id = socket.id;

                loader.loadPlayer(player);
                loader.saveSocket(socket);
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
            inputDown = "";
        }
    },false);
}
