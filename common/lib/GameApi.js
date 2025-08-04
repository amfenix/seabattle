import { Game } from "./Game.js";
import {Cell} from "./Board.js";

export class GameApi extends Game {
    constructor(defaultTimeout, nameKey, playerStates) {
        super();
        this.defaultTimeout = defaultTimeout;
        this.nameKey = nameKey;
        this.playerStates = playerStates;
        this.reset();
        this.connect({});
        this.unsubscribe();
        this.waitResult = false;
        this.lastAction = null;
    }

    connect(api) {
        this.api = api;
    }

    subscribe(dispatch) {
        this.dispatch = dispatch;
        this.api.on("start-game", this.onGameStart);
        this.api.on("get-step", this.onStep);
        this.api.on("end-game", this.onGameEnd);
    }

    unsubscribe() {
        this.dispatch = () => { };
    }

    onGameStart = ({ id, name }) => this.dispatch({
        type: 'start-game',
        payload: { id, name }
    });
    onStep = ({ x, y, result, timeout, act }) => this.dispatch({
        type: 'step-result',
        payload: { x, y, result, timeout, act }
    });
    onGameEnd = ({ win }) => this.dispatch({
        type: "end-game",
        payload: win
    });

    reset() {
        this.clear();
        this.setupPlayer('me');
        this.setupPlayer('enemy');
        this.changeState("place");

        this.selectedShipIndex = null;
        this.timeout = this.defaultTimeout;
        this.winner = null;

        const storedName = localStorage.getItem(this.nameKey);
        if (storedName) {
            this.player.setName(storedName);
        }
    }

    changeName(name) {
        this.player.setName(name);
        localStorage.setItem(this.nameKey, name);
    }

    selectShip(index) {
        this.selectedShipIndex = index
    }

    placeShip(x, y, size, isVertical) {
        if (this.player.get(x, y).isShip) return false;

        if (this.player.placeShip(x, y, size, isVertical)) {
            if (this.player.fleet.select(size).available === 0) {
                this.selectedShipIndex = null;
            }

            if (this.player.isShipsPlaced) {
                console.log('Ready to game');
                if (this.api) {
                    this.api.waitForGame({
                        name: game.player.name,
                        board: game.player.getState()
                    });
                    game.changeState("wait");
                }
            }

            return true;
        }
        return false;
    }

    startGame(id, name) {
        this.enemy.id = id;
        this.enemy.name = name;
    }

    step(x, y) {
        if (this.api && !this.waitResult) {
            console.log(`SEND MY STEP: ${x}×${y}`);
            this.api.step(x, y);
            this.waitResult = true;
            this.lastAction = Date.now();
        }
    }

    is(v) {
        return v !== null && v !== undefined;
    }

    stepResult(act, x, y, result) {
        if (["place", "result"].includes(this.state)) {
            return;
        }
        const currentShotLabel = [x,y].join('×');
        if (act) {
            if (this.state === "my-step" && this.is(x) && this.is(y)) {
                this.waitResult = false;
                this.enemy.set(x, y, result);
                this.lastAction = Date.now();
                console.log(`API: MY SHOT: ${currentShotLabel}`, result, result === Cell.MISSED);
                if (result === Cell.MISSED) {
                    this.changeState("enemy-step");
                    console.log(`API: ENEMY STEP`);
                }
            } else if (this.state === "enemy-step" && this.is(x) && this.is(y)) {
                this.player.set(x, y, result);
                this.lastAction = Date.now();
                console.log(`API: ENEMY SHOT: ${currentShotLabel}`, result, result === Cell.MISSED);
            } else {
                //начало игры, ход за врагом
                this.changeState("enemy-step");
            }
        } else {
            this.changeState("my-step");
            console.log(`API: MY STEP`);
        }

        if (!act && this.state !== "my-step") {
            if (this.player.inRange(x, y)) {
                this.player.set(x, y, result);
            }
            this.changeState("my-step");
        }
    }

    endGame(winner) {
        if (["place","result"].includes(this.state)) return;
        this.changeState("result");
        if (winner) {
            this.winner = this.player.name;
        } else {
            this.winner = this.enemy.name;
        }
    }

    changeState(state) {
        this.state = state;
        this.boardState = this.playerStates[state] ?? {};
    }

    getAppState() {
        return {
            gameState: this.state,
            playerName: this.player.name,
            availableShips: this.availableShips,
            selectedShip: this.selectedShip,
            getMyCell: (x, y) => this.player.get(x, y).state,
            getEnemyCell: (x, y) => this.enemy.get(x, y).state,
            getOverlay: this.player.getOverlay.bind(this.player),
            boardState: this.boardState ? this.boardState : {},
            timeout: this.timeout,
            winner: this.winner,
            lastAction: this.lastAction
        };
    }

    get selectedShip() {
        if (this.selectedShipIndex !== null) {
            return {
                index: this.selectedShipIndex,
                size: this.availableShips[this.selectedShipIndex][0]
            };
        }
        return null;
    }

    get availableShips() {
        return this.player.fleet.ships
            .map(ship => [ship.size, ship.available]);
    }

    get player() {
        return this.get('me');
    }

    get enemy() {
        return this.get('enemy');
    }

    reducer = (prevState, action) => {
        // console.log(`ACTION: `, action);
        switch (action.type) {
            case "change-name":
                this.changeName(action.payload);
                return this.getAppState();
            case "select-ship":
                this.selectShip(action.payload);
                return this.getAppState();
            case "place-ship":
                this.placeShip(...action.payload);
                return this.getAppState();
            case "start-game":
                this.startGame(action.payload.id, action.payload.name);
                return this.getAppState();
            case "step":
                this.step(
                    action.payload.x,
                    action.payload.y
                );
                return this.getAppState();
            case "step-result":
                this.stepResult(
                    action.payload.act,
                    action.payload.x,
                    action.payload.y,
                    action.payload.result
                );
                return this.getAppState();
            case "end-game":
                this.endGame(action.payload);
                return this.getAppState();
            case "start-new":
                this.reset();
                return this.getAppState();
            default:
                break;
        }
        return prevState;
    };
}
