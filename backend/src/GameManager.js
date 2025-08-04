import { Server as Game } from '../../common/lib/Server.js';
export default class GameManager {
    activeGames = new Map();
    waitingPlayer = new Set();

    connection(socket) {
        // this.addWaitingPlayer(socket)
        socket.on('new-game', this.addWaitingPlayer.bind(this, socket));
    }

    disconnect(player) {
        this.removeWatingPlayer(player)
    }

    addWaitingPlayer(player, data) {
        player.data = data;
        this.waitingPlayer.add(player);
        console.log('player.id', player.id);
        if (this.waitingPlayer.size >= 2) {
            const [player1, player2] = this.waitingPlayer;
            const game = new Game({ handleEndGame: this.removeActiveGame.bind(this) });
            console.log(game.getIdGame());
            game.connect(player1);
            game.connect(player2);
            this.addActiveGame(game.getIdGame(), game);
            this.removeWatingPlayer(player1);
            this.removeWatingPlayer(player2);
        }

        return true;
    }


    removeWatingPlayer(player) {
        this.waitingPlayer.delete(player);
    }

    addActiveGame(id, game) {
        if (this.activeGames.has(game)) {
            return false
        }
        this.activeGames.set(id, game)
        return true;
    }

    removeActiveGame(id) {
        if (!this.activeGames.has(id)) {
            return false
        }
        this.activeGames.delete(id);
        console.log('removeActiveGame');
        return true;
    }
}