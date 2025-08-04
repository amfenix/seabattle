import {EventEmitter} from "./EventEmitter.js";


export class Client extends EventEmitter {
    connect(server) {
        server.connect(this);
    }
    waitForGame({name, board}) {
        this.emit('new-game', { name, board });
    }
    onGameStart(callback) {
        this.on('start-game', callback);
    }
    onStep(callback) {
        this.on('get-step', callback);
    }
    step(x, y) {
        this.emit('set-step', { x,y });
    }
    onGameEnd(callback) {
        this.on('end-game', callback);
    }
    onError({ error }) {
        this.on('error', error);
    }
}