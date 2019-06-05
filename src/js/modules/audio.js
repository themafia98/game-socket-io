export default class Audio{

    constructor(buffer){
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.gainNode = null;
        this.source = null;
        this.buffer = buffer;

    }

    play(){
        this.source.start(this.context.currentTime);

        return this;
    }

    stop(){
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        this.source.stop(this.context.currentTime + 0.5);
        return this;
    }

    init(type = 'sine'){

        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        return this;
    }
}