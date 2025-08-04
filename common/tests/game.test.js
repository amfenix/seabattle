import {Fleet, Game, Player, Ship} from "../lib/Game.js";
import {rectangle} from "../lib/utils.js";
import {Cell} from "../lib/Board.js";


describe('Game parts', () => {
    test('Ship', () => {
        const ship = new Ship(3, 2);
        const shape = rectangle(3, false);
        expect(ship.place(shape(0,0))).toBe(true);
        expect(ship.place(shape(2,0))).toBe(true);
        expect(ship.place(shape(4,0))).toBe(false);
    });

    test('Fleet', () => {
        expect(() => new Fleet([
            [1, 2],
            [1, 3]
        ])).toThrow('FLEET_NOT_VALID');
        const fleet = new Fleet([
            [4, 1],
            [3, 2]
        ]);
        expect(fleet.totalShipCells).toBe(10);

        expect(fleet.ships[0].place(rectangle(4))).toBe(true);
        expect(fleet.hasAvailableShips).toBe(true);

        expect(fleet.ships[1].place(rectangle(3))).toBe(true);
        expect(fleet.hasAvailableShips).toBe(true);

        expect(fleet.ships[1].place(rectangle(3))).toBe(true);
        expect(fleet.hasAvailableShips).toBe(false);

        expect(fleet.ships[1].place(rectangle(3))).toBe(false);
        expect(fleet.hasAvailableShips).toBe(false);
    });

    describe('Player', () => {
        test('setup name and ships', () => {
            const player = new Player('test', [4,4], [
                [2, 1],
                [1, 2]
            ]);
            expect(player.isReady).toBe(false);

            expect(player.placeShip(0, 0, 2)).toBe(true);
            expect(player.placeShip(0, 0, 2)).toBe(false);
            expect(player.placeShip(0, 0, 3)).toBe(false);
            expect(player.placeShip(0, 3, 1)).toBe(true);

            expect(player.isShipsPlaced).toBe(false);
            expect(player.placeShip(3, 0, 1)).toBe(true);
            expect(player.placeShip(3, 0, 1)).toBe(false);
            expect(player.isShipsPlaced).toBe(true);

            expect(player.isReady).toBe(false);
            expect(player.setName('0')).toBe(false);
            expect(player.setName('test')).toBe(true);
            expect(player.isReady).toBe(true);
            expect(player.hasNoShips).toBe(false);
        });

        test('shot and win condition', () => {
            const player = new Player('test', [4,4], [
                [1, 2]
            ]);
            expect(player.placeShip(0, 0, 1)).toBe(true);
            expect(player.placeShip(3, 3, 1)).toBe(true);
            expect(player.isShipsPlaced).toBe(true);

            expect(player.shot(0, 0)).toBe(Cell.SINKED);
            expect(player.shot(0, 1)).toBe(Cell.MISSED);
            expect(player.hasNoShips).toBe(false);

            expect(player.shot(0, 0)).toBe(null);
            expect(player.shot(3, 3)).toBe(Cell.SINKED);
            expect(player.hasNoShips).toBe(true);
        });
    });
});

describe('Game', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    test('base setup', () => {
        const game = new Game();

        expect(() => game.setupPlayer('first', 'a', [])).toThrow('NAME_NOT_VALID');
        expect(() => game.setupPlayer('first', 'test', [])).toThrow('STATE_NOT_VALID');

        let me = null;
        expect(() => me = game.setupPlayer('me', 'test', board)).not.toThrow();
        expect(me instanceof Player).toBe(true);
        expect(me.id).toBe('me');
        expect(() => game.setupPlayer('me', 'test', board)).toThrow('PLAYER_EXIST');
        expect(() => game.setupPlayer(null, 'test', board)).not.toThrow();
        expect(() => game.setupPlayer('enemy', 'test', board)).toThrow('MAXIMUM_PLAYERS');
        expect(game.isReady).toBe(true);
        expect(game.hasWinner).toBe(false);
    });
});