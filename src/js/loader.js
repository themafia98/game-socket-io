
export default class Loader{

    constructor(){

        this.texture = [];
        this.playersSkin = [];
        this.player = {};
        this.other = {};
        this.socket = [];
    }

    loadTexture(texture){
        this.texture.push(texture);
    }

    loadGamerSkin(skin){
    this.playersSkin.push(skin);
    }

    getGamerSkin(id){
        return this.playersSkin[id];
    }

    loadPlayer(player){
        return this.player = player;
    }

    getPlayer(){
        return this.player;
    }

    saveSocket(socket){
        return this.socket = socket;
    }

    getSocket(){
        return this.socket;
    }

}