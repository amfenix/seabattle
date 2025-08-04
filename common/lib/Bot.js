import {Board, Cell} from "./Board.js";

export class Bot {
    constructor(name, board) {
        this.defaultBoard = board;
        this.botName = name;
        this.reset();
    }

    reset() {
        this.enemy = {
            name: this.botName,
            board: new Board(10, 10)
        };
        this.player = {
            name: "",
            board: new Board(10, 10)
        };
        this.enemy.board.setState(this.defaultBoard);
    }

    wait(cb, n) {
        setTimeout(cb,  n * 1000);
    }

    index(x, y) {
        return (y * 10) + x;
    }

    connect(api) {
        console.log(`setup bot`);
        api.on('new-game', ({ name, board }) => {
            console.log(`event: new-game`, name);
            this.player.name = name;
            this.player.board.setState(board);

            this.wait(() => api.emit('start-game', {
                id: Date.now(),
                name: this.enemy.name
            }), 1);

            this.wait(() => api.emit('get-step', {
                act: false
            }), 2);
        });

        api.on('set-step', ({ x, y }) => {
            if (!this.player.name) {
                console.log(`Game not started`);
                return;
            }
            const result = this.enemy.board.shot(x,y);
            console.log(`BOT: my shot`, [x,y], result);
            api.emit('get-step', {
                x, y,
                result: result,
                timeout: this.random(15, 45),
                act: true
            });

            if (result === Cell.MISSED) {
                console.log('BOT: active = bot');
                let step;
                let enemyResult;
                do {
                    step = {
                        x: this.random(0, 9),
                        y: this.random(0, 9)
                    };
                    enemyResult = this.player.board.shot(step.x, step.y);
                    console.log(`BOT: shot`, [step.x,step.y], enemyResult);
                    api.emit('get-step', {
                        ...step,
                        result: enemyResult,
                        timeout: this.random(15, 45),
                        act: true
                    });
                } while (enemyResult !== Cell.MISSED && this.player.board.shipCellsCount > 0);
                if (enemyResult === Cell.MISSED) {
                    console.log('BOT: active = player');
                    api.emit('get-step', {
                        act: false
                    });
                }
            }


            if (this.hasNoShips(this.player.board, 'player')) {
                console.log(`win: enemy`, this);
                api.emit('end-game', {
                    win: false
                });
                return this.reset();
            }
            if (this.hasNoShips(this.enemy.board, 'enemy')) {
                console.log(`win: player`, this);
                api.emit('end-game', {
                    win: true
                });
                return this.reset();
            }
        })
    }

    getResult(state) {
        if (state === 0) return 1;
        if (state === 2) return 3;
        return state;
    }

    hasNoShips(board, label) {
        let aliveShips = board.shipCellsCount;
        console.log(`${label} = ${aliveShips}`);
        return aliveShips === 0;
    }

    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}

export const initTestBot = () => {
    return new Bot('Test', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}