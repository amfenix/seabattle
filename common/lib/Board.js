import {inRange, index, fillArray, rectangle, combine, near, getValue} from "./utils.js";

/**
 * Базовая ячейка игрового поля
 */
export class Cell {
    // Статусы содержимого ячейки
    static EMPTY = 0; // Пустое
    static MISSED = 1; // Промах
    static SHIP = 2; // Корабль
    static SINKED = 3; // Подбитый корабль

    constructor() {
        this.state = Cell.EMPTY;
    }

    get isShip() {
        return this.state === Cell.SHIP;
    }

    placeShip() {
        this.state = Cell.SHIP;
    }

    /**
     * Делаем выстрел по полю и возвращаем результат
     * @returns {number}
     */
    shot() {
        if (this.state === Cell.EMPTY) return this.state = Cell.MISSED;
        if (this.state === Cell.SHIP) return this.state = Cell.SINKED;
        return this.state;
    }

    static isValid(value, values) {
        return (values ?? [Cell.EMPTY, Cell.MISSED, Cell.SHIP, Cell.SINKED]).includes(value);
    }
}

/**
 * Таблица "X Столбцов" × "Y Строк" в одномерном формате хранения
 */
export class Table {
    constructor(width, height, defaultValue) {
        this.width = width;
        this.height = height;
        this.defaultValue = defaultValue;

        this.reset();
    }

    reset() {
        this.cells = fillArray(this.width * this.height, this.defaultValue);
    }

    get(x, y) {
        return this.inRange(x, y) ? this.cells[index(x,y, this.width)] : null;
    }

    set(x, y, value) {
        if (this.inRange(x, y)) return this.cells[index(x,y, this.width)] = getValue(value);
        else return null;
    }

    inRange(x, y) {
        return inRange(x, 0, this.width - 1)
            && inRange(y, 0, this.height - 1);
    }
}

/**
 * Игровая доска на основе таблицы с игровыми ячейками (Cell)
 */
export class Board extends Table {
    constructor(width, height) {
        super(width, height, () => new Cell());
    }

    /**
     * Получить одномерное состояние
     * @returns {*[]}
     */
    getState() {
        return this.cells.map(cell => cell.state);
    }

    /**
     * Установить одномерное состояние
     * @param state
     * @returns {boolean}
     */
    setState(state) {
        if (!this.isValidState(state)) return false;

        //this.cells.forEach((cell, index) => cell.state = state[index]);
        this.cells.map((cell, index) => {
            cell.state = state[index];
            return cell;
        });
        return true;
    }

    /**
     * Установить точку
     * @param x
     * @param y
     * @param value
     * @returns {null|*}
     */
    set(x, y, value) {
        const cell = this.get(x,y);
        if (!cell) return null;
        return Cell.isValid(value) ? cell.state = value : cell.state;
    }

    /**
     * Поместить корабль
     * @param x
     * @param y
     * @param size
     * @param isVertical
     * @returns {null|*}
     */
    placeShip(x, y, size, isVertical) {
        const points = rectangle(size, isVertical)(x,y);
        if (!this.isPlaceable(points)) return null;

        points.map(point =>
            this.get(...point).placeShip()
        );
        return points;
    }

    /**
     * Рассчитать "призрак" корабля на время установки
     * @param x
     * @param y
     * @param size
     * @param isVertical
     * @returns {*}
     */
    getOverlay(x, y, size, isVertical) {
        const points = rectangle(size, isVertical)(x,y);
        const isAllowed = Number(this.isPlaceable(points));
        return points
            .filter(point => this.inRange(...point))
            .map(p => p.join('×'))
            .reduce((a, c) => Object.assign(a, {
                [c]: isAllowed
            }),{});
    }

    /**
     * Можем или нет разместить тут корабль?
     * @param points
     * @returns {boolean}
     */
    isPlaceable(points) {
        if (points.filter(point => !this.inRange(...point)).length > 0) return false;

        const occupied = combine(points
            .map(point => near()(...point))
            .reduce((a, c) => [...a, ...c], [])
        )
            .map(point => this.get(...point))
            .filter(point => !!point)
            .filter(point => point.isShip);

        return occupied.length === 0;
    }

    isAllPlaced(total) {
        return this.shipCellsCount === total;
    }

    get shipCellsCount() {
        return this.cells.filter(cell => cell.isShip).length;
    }

    /**
     * Выстрел по точке
     * @param x
     * @param y
     * @returns {number|*}
     */
    shot(x, y) {
        return this.get(x, y).shot();
    }

    isValidState(state) {
        if (state.length !== this.cells.length) return false;

        return state.filter(cell => !Cell.isValid(cell, [Cell.EMPTY, Cell.SHIP])).length === 0;
    }
}

