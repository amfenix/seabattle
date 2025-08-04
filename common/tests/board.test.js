import { Cell, Table, Board } from "../lib/Board.js";
import {rectangle} from "../lib/utils.js";

describe('Cell', () => {
   test('isValid', () => {
       expect(Cell.isValid(0)).toBe(true);
       expect(Cell.isValid(1)).toBe(true);
       expect(Cell.isValid(2)).toBe(true);
       expect(Cell.isValid(3)).toBe(true);
       expect(Cell.isValid(4)).toBe(false);
       expect(Cell.isValid(1, [1,2])).toBe(true);
       expect(Cell.isValid(1, [0,2])).toBe(false);
   });

    test('shot empty', () => {
        const cell = new Cell();
        expect(cell.state).toBe(Cell.EMPTY);

        const result = cell.shot();
        expect(result).toBe(Cell.MISSED);
        expect(cell.state).toBe(Cell.MISSED);
    });

   test('shot ship', () => {
       const cell = new Cell();
       expect(cell.state).toBe(Cell.EMPTY);

       cell.placeShip();
       expect(cell.state).toBe(Cell.SHIP);
       expect(cell.isShip).toBe(true);

       const result = cell.shot();
       expect(result).toBe(Cell.SINKED);
       expect(cell.state).toBe(Cell.SINKED);
   });

    test('double shot to ship', () => {
        const cell = new Cell();
        expect(cell.state).toBe(Cell.EMPTY);

        cell.placeShip();
        expect(cell.state).toBe(Cell.SHIP);
        expect(cell.isShip).toBe(true);

        const result1 = cell.shot();
        expect(result1).toBe(Cell.SINKED);
        expect(cell.state).toBe(Cell.SINKED);

        const result2 = cell.shot();
        expect(result2).toBe(null);
        expect(cell.state).toBe(Cell.SINKED);
    });

    test('double shot to empty', () => {
        const cell = new Cell();
        expect(cell.state).toBe(Cell.EMPTY);

        const result1 = cell.shot();
        expect(result1).toBe(Cell.MISSED);
        expect(cell.state).toBe(Cell.MISSED);

        const result2 = cell.shot();
        expect(result2).toBe(null);
        expect(cell.state).toBe(Cell.MISSED);
    });
});

describe('Table', () => {
    test('2×2 with static value', () => {
        const table = new Table(2, 2, 0);
        expect(table.cells).toEqual([0,0,0,0]);
        expect(table.inRange(0, 0)).toBe(true);
        expect(table.inRange(1, 0)).toBe(true);
        expect(table.inRange(0, 1)).toBe(true);
        expect(table.inRange(1, 1)).toBe(true);
        expect(table.inRange(1, 2)).toBe(false);

        const result1 = table.set(2,1, 1);
        expect(result1).toBe(null);
        expect(table.cells).toEqual([0,0,0,0]);

        const result2 = table.set(1,1, 1);
        expect(result2).toBe(1);
        expect(table.cells).toEqual([0,0,0,1]);

        table.reset();
        expect(table.cells).toEqual([0,0,0,0]);
    });

    test('2×2 with func value', () => {
        const table = new Table(2, 2, () => 0);
        expect(table.cells).toEqual([0,0,0,0]);

        const result2 = table.set(1,1, () => 1);
        expect(result2).toBe(1);
        expect(table.cells).toEqual([0,0,0,1]);

        table.reset();
        expect(table.cells).toEqual([0,0,0,0]);
    });
});

describe('Board', () => {
    test('state manipulation', () => {
        const board = new Board(2, 2);
        expect(board.cells[0] instanceof Cell).toEqual(true);
        expect(board.cells[0] === board.cells[1]).toBe(false);
        expect(board.cells[0].state).toBe(Cell.EMPTY);
        expect(board.getState()).toEqual([0,0,0,0]);

        expect(board.setState([0,1,2,3])).toBe(false);
        expect(board.setState([0,1,2,3,0])).toBe(false);
        expect(board.setState([0,1,2])).toBe(false);

        expect(board.setState([0,0,2,2])).toBe(true);
        expect(board.getState()).toEqual([0,0,2,2]);
    });

    test('get', () => {
        const board = new Board(10, 10);
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y > 10; y++) {
                let cell = board.get(x, y);
                expect(cell).not.toBeFalsy();
                expect(cell instanceof Cell).toBe(true);
            }
        }
    });

    test('ship placement', () => {
        const board = new Board(4, 4);
        expect(board.getState()).toEqual([
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
        ]);
        const ship = rectangle(3, false);
        expect(board.isPlaceable(ship(0, 0))).toBe(true);

        expect(board.placeShip(2, 0, 3, false)).toBe(null);
        expect(board.placeShip(1, 0, 3, false)).toEqual([
            [1,0],[2,0],[3,0]
        ]);
        expect(board.getState()).toEqual([
            0,2,2,2,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
        ]);
        expect(board.isAllPlaced(3)).toBe(true);

        expect(board.isPlaceable(ship(0, 0))).toBe(false);
        expect(board.placeShip(2, 0, 3, true)).toBe(null);

        expect(board.shot(0, 0)).toBe(Cell.MISSED);
        expect(board.shot(1, 0)).toBe(Cell.SINKED);
    });
});