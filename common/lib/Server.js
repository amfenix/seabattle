import { Game, TIMEOUT } from "./Game.js";
import { Cell } from "./Board.js";
import { v4 as uuidv4 } from 'uuid';


export class Server extends Game {
    static TIMEOUT = TIMEOUT;
    constructor({ handleEndGame }) {
        super();
        this.handleEndGame = handleEndGame;
        this.timer = null;
        this.timeoutInMs = Server.TIMEOUT * 1000 || 30000
        this._id = uuidv4();
        this._timeoutCallback = this._timeoutCallback.bind(this)
    }


    connect(player) {
        // player.on('new-game', this.onNewGame.bind(this, player));
        this.onNewGame(player);
        player.on('set-step', this.onStep.bind(this, player));
    }

    onNewGame(from) {
        const { name, board } = from.data;
        let player = null;

        try {
            player = this.setupPlayer(null, name, board);
            player.channel = from;
        } catch (error) {
            return from.emit('error', { error: error.message });
        }


        console.log(this.isReady);
        //когда подключены и настроены два игрока
        if (this.isReady) {
            this.forEach(p => p.channel.emit('start-game', {
                id: p.id,
                name: p.enemy.name
            }));

            this.active = this._selectRandomPlayer();
            this.state = 'step';

            //сообщаем активному о первом ходе
            this.activePlayer.channel.emit('get-step', {
                act: false,
                timeout: Server.TIMEOUT
            });
            //второй ждет
            this.waitedPlayer.channel.emit('get-step', {
                act: true,
                timeout: Server.TIMEOUT
            });

            this.timer = setTimeout(this._timeoutCallback, this.timeoutInMs);

            //обрабываем дисконнект одного из пользователей, если отвалился первый
            this.activePlayer.channel.on('disconnect', () => {
                this.state = 'end';
                this.activePlayer.channel.emit('end-game', {
                    win: false
                });
                this.waitedPlayer.channel.emit('end-game', {
                    win: true
                });
                this.handleEndGame(this._id)
            });
            //если отвалился второй
            this.waitedPlayer.channel.on('disconnect', () => {
                this.state = 'end';
                this.activePlayer.channel.emit('end-game', {
                    win: true
                });
                this.waitedPlayer.channel.emit('end-game', {
                    win: false
                });
                this.handleEndGame(this._id)
            });
        }
    }

    onStep(from, { x, y }) {
        if (this.state !== 'step') return;

        clearTimeout(this.timer);
        this.timer = setTimeout(this._timeoutCallback, this.timeoutInMs);
        //выстрел по ожидающему игроку
        const result = this.waitedPlayer.shot(x, y);
        if (result === null) {
            return this.activePlayer.channel.emit('error', {
                error: 'SHOT_NOT_VALID'
            });
        }

        console.log('this.hasWinner', this.hasWinner);
        //проверка на победу
        if (this.hasWinner) {
            clearTimeout(this.timer);
            this.state = 'end';
            this.activePlayer.channel.emit('end-game', {
                win: !this.activePlayer.hasNoShips
            });
            this.waitedPlayer.channel.emit('end-game', {
                win: !this.waitedPlayer.hasNoShips
            });
            this.handleEndGame(this._id)
        } else {
            //следующий ход
            let currentPlayer = true;
            this.activePlayer.channel.emit('get-step', {
                act: true,
                x, y, result,
                timeout: Server.TIMEOUT
            });
            this.waitedPlayer.channel.emit('get-step', {
                act: true,
                x, y, result,
                timeout: Server.TIMEOUT
            });

            if (result !== Cell.SINKED && currentPlayer) {
                //если не попал по кораблю, то смена хода
                console.log(`CHANGE ACTIVE PLAYER FROM ${this.activePlayer.id} TO ${this.waitedPlayer.id}`);
                this.activePlayer = this.waitedPlayer.id;
                currentPlayer = false;
            }

            this.activePlayer.channel.emit('get-step', {
                act: false,
                timeout: Server.TIMEOUT
            });

            /*this.waitedPlayer.channel.emit('get-step', {
                act: true,
                timeout: Server.TIMEOUT
            });*/
        }
    }

    getIdGame() {
        return this._id;
    }

    _selectRandomPlayer() {
        const index = Number(Boolean(Math.floor(Math.random() * 10) >= 5));
        return [...this.values()][index].id;
    }

    _timeoutCallback() {
        this.state = 'end';
        //время на ход вышло, автоматическое поражение
        this.activePlayer.channel.emit('end-game', {
            win: false
        });
        //... автоматическая победа
        this.waitedPlayer.channel.emit('end-game', {
            win: true
        });

        this.handleEndGame(this._id)
    }

}