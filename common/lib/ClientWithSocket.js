
export class ClientWithSocket {
    constructor(socket) {
        this.socket = socket;
    }
    connect() {
        this.socket.connect();
    }
    waitForGame({ name, board }) {
        this.socket.emit('new-game', { name, board });
    }
    onGameStart(callback) {
        this.socket.on('start-game', callback);
    }
    onStep(callback) {
        this.socket.on('get-step', callback);
    }
    step(x, y) {
        this.socket.emit('set-step', { x, y });
    }
    onGameEnd(callback) {
        this.socket.on('end-game', callback);
    }
    onError({ error }) {
        this.socket.on('error', error);
    }

    emit(...args) {
        console.log('EMIT SOCKET CLIENT');
        if (this.socket) {
            this.socket.emit(...args);
        }
    }
    on(...args) {
        console.log('ON SOCKET CLIENT');
        if (this.socket) {
            this.socket.on(...args);
        }
    }

    off(...args) {
        if (this.socket) {
            this.socket.off(...args);
        }
    }

}