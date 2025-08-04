import {EventEmitter} from "../lib/EventEmitter.js";


describe('EventEmitter', () => {
    test('add event and emit', () => {
        const ev = new EventEmitter();

        const cb1 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        ev.on('test1', cb1);
        ev.emit('test1', 'cb1');
        expect(cb1).toBeCalled();
    });

    test('add two event and emit', () => {
        const ev = new EventEmitter();

        const cb1 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        const cb2 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        ev.on('test1', cb1);
        ev.on('test1', cb2);
        ev.emit('test1', 'cb1');
        expect(cb1).toBeCalled();
        expect(cb2).toBeCalled();
    });

    test('add two event and emit one', () => {
        const ev = new EventEmitter();

        const cb1 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        const cb2 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        ev.on('test1', cb1);
        ev.on('test2', cb2);
        ev.emit('test1', 'cb1');
        expect(cb1).toBeCalled();
        expect(cb2).not.toBeCalled();
    });

    test('add event and remove', () => {
        const ev = new EventEmitter();

        const cb1 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        ev.on('test1', cb1);
        ev.off('test1', cb1);

        ev.emit('test1', 'cb1');
        expect(cb1).not.toBeCalled();
    });

    test('add two event and remove', () => {
        const ev = new EventEmitter();

        const cb1 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        const cb2 = jest.fn((msg) => {
            expect(msg).toBe('cb1');
        });
        ev.on('test1', cb1);
        ev.on('test2', cb2);
        ev.offAll();

        ev.emit('test1', 'cb1');
        expect(cb1).not.toBeCalled();
        expect(cb2).not.toBeCalled();
    });
});