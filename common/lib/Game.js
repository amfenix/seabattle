import { v4 as uuidv4 } from 'uuid';
import { Board } from "./Board.js";
import { isValidName } from "./utils.js";

export class Ship {
    constructor(size, amount) {
        this.size = size;
        this.amount = amount;
        this.available = amount;
        this.shapes = [];
    }

    place(shape) {
        if (this.available > 0) {
            this.shapes.push(shape);
            this.available--;
            return true;
        }
        return false;
    }
}

export class Fleet {
    constructor(ships) {
        if (!this.isValidShips(ships)) {
            throw new Error('FLEET_NOT_VALID');
        }
        this.ships = ships.map(ship => new Ship(...ship));
    }

    select(size) {
        return this.ships.filter(ship => ship.size === size).pop();
    }

    isValidShips(ships) {
        return ships && ships.length && (new Set(ships.map(([size]) => size))).size === ships.length;
    }

    get totalShipCells() {
        return this.ships.reduce((result, ship) => result + (ship.size * ship.amount), 0);
    }

    get hasAvailableShips() {
        return this.ships.filter(ship => ship.available > 0).length > 0;
    }
}

export class Player extends Board {
    constructor(id, boardSize, ships) {
        super(...boardSize);
        this.id = id;
        this.name = null;
        this.fleet = new Fleet(ships);
    }

    setName(name) {
        return Boolean(isValidName(name) ? this.name = name : null);
    }

    placeShip(x, y, size, isVertical) {
        const ship = this.fleet.select(size);
        if (ship && ship.available > 0) {
            const shape = super.placeShip(x, y, size, isVertical);
            if (shape !== null) {
                ship.place(shape);
                return true;
            }
        }
        return false;
    }

    get isReady() {
        return isValidName(this.name) && this.isShipsPlaced;
    }

    get isShipsPlaced() {
        return this.isAllPlaced(this.fleet.totalShipCells);
    }

    get hasNoShips() {
        return this.shipCellsCount === 0;
    }
}

export const SIZE = [10, 10];
export const FLEET = [
    [4, 1],
    [3, 2],
    [2, 3],
    [1, 4]
];
export const TIMEOUT = 30;

export class Game extends Map {
    constructor() {
        super();
        this.active = null;
        this.state = null;
    }

    setupPlayer(_id, name, state) {
        if (this.size === 2) {
            throw new Error('MAXIMUM_PLAYERS');
        }
        if (_id && this.has(_id)) {
            throw new Error('PLAYER_EXIST');
        }
        let id = _id ?? uuidv4();
        const player = new Player(id, SIZE, FLEET);

        if (name && state) {
            if (!player.setName(name)) {
                throw new Error('NAME_NOT_VALID');
            }
            if (!player.setState(state)) {
                throw new Error('STATE_NOT_VALID');
            }
        }
        if (this.size === 1) {
            const enemy = [...this.values()].pop();
            player.enemy = {
                name: enemy.name,
                id: enemy.id
            };
            enemy.enemy = {
                name: player.name,
                id: player.id
            }
        }
        this.set(id, player);
        return player;
    }

    get activePlayer() {
        return this.get(this.active);
    }

    set activePlayer(id) {
        if (this.has(id)) {
            this.active = id;
        }
    }

    get waitedPlayer() {
        return this.get(this.get(this.active).enemy.id);
    }

    all(callback) {
        return [...this.values()].filter(callback);
    }

    get isReady() {
        return (this.size === 2) && this.all(player => player.isReady).length === this.size;
    }

    get hasWinner() {
        return this.all(player => !player.hasNoShips).length !== this.size;
    }
}