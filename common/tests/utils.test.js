import {
    combine,
    fillArray,
    getValue,
    index,
    inRange,
    isValidName,
    limit,
    near,
    rectangle,
    shape
} from "../lib/utils.js";

describe('utils', () => {
    describe('values', () => {
        test('isValidName', () => {
            const fixtures = [
                ['супер_test 12345', true],
                ['ab', true],
                ['1234567890qwertyuiopasdfg', true],
                ['a', false],
                ['1234567890qwertyuiopasdfg_', false],
                ['super $test', false],
                [null, false],
                ['', false],
                [15, false]
            ];

            for (let [name, result] of fixtures) {
                expect(isValidName(name)).toBe(result);
            }
        });

        test('getValue', () => {
            expect(getValue('test1')).toBe('test1');
            expect(getValue(() => 'test2')).toBe('test2');
        });

        test('fillArray', () => {
            expect(fillArray(4, 0)).toEqual([0,0,0,0]);
            expect(fillArray(2, () => 'a')).toEqual(['a','a']);
        });
    });

    describe('1D math', () => {
        test('index', () => {
            expect(index(0, 0, 10)).toBe(0);
            expect(index(5, 0, 10)).toBe(5);
            expect(index(5, 1, 10)).toBe(15);
            expect(index(5, 2, 10)).toBe(25);
            expect(index(9, 9, 10)).toBe(99);
        });

        test('inRange', () => {
            expect(inRange(-1, 0, 9)).toBe(false);
            expect(inRange(0, 0, 9)).toBe(true);
            expect(inRange(5, 0, 9)).toBe(true);
            expect(inRange(9, 0, 9)).toBe(true);
            expect(inRange(10, 0, 9)).toBe(false);
        });

        test('limit', () => {
            expect(limit(-1, 0, 9)).toBe(0);
            expect(limit(5, 0, 9)).toBe(5);
            expect(limit(0, 0, 9)).toBe(0);
            expect(limit(9, 0, 9)).toBe(9);
            expect(limit(10, 0, 9)).toBe(9);
        });
    });

    describe('2D math', () => {
        test('shape', () => {
            const points = [[-1,-1],[0,0],[1,1]];
            const example = shape(points);
            expect(typeof example).toBe('function');
            expect(example(0, 0)).toEqual(points);
            expect(example(1, 1)).toEqual([[0,0],[1,1],[2,2]]);
            expect(example(0, 1)).toEqual([[-1,0],[0,1],[1,2]]);
            expect(example(1, 0)).toEqual([[0,-1],[1,0],[2,1]]);
        });

        test('rectangle', () => {
            const rect1 = rectangle(1);
            expect(typeof rect1).toBe('function');
            expect(rect1(0,0)).toEqual([[0,0]]);
            expect(rect1(1,1)).toEqual([[1,1]]);

            const rect2 = rectangle(2, false);
            expect(rect2(0,0)).toEqual([[0,0],[1,0]]);
            expect(rect2(1,1)).toEqual([[1,1],[2,1]]);

            const rect3 = rectangle(2, true);
            expect(rect3(0,0)).toEqual([[0,0], [0,1]]);
            expect(rect3(1,1)).toEqual([[1,1],[1,2]]);
        });

        test('near', () => {
            const near1 = near();
            expect(near1(0,0)).toEqual([
                [-1,-1], [0,-1], [+1,-1],
                [-1, 0],/*[x,y]*/[+1, 0],
                [-1,+1], [0,+1], [+1,+1]
            ]);
            expect(near1(0,1)).toEqual([
                [-1, 0], [0, 0], [+1, 0],
                [-1,+1],/*[x,y]*/[+1,+1],
                [-1,+2], [0,+2], [+1,+2]
            ]);
            expect(near1(1,0)).toEqual([
                [ 0,-1], [1,-1], [+2,-1],
                [ 0, 0],/*[x,y]*/[+2, 0],
                [ 0,+1], [1,+1], [+2,+1]
            ]);
        });

        test('combine', () => {
            expect(combine([[0,0]])).toEqual([[0,0]]);
            expect(combine([[0,0],[1,1]])).toEqual([[0,0],[1,1]]);
            expect(combine([[0,0],[1,1],[0,0]])).toEqual([[0,0],[1,1]]);
        });
    });
});

