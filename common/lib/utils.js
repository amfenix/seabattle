
export function isValidName(name) {
    return (name && (typeof name === 'string')) ? /^[а-яА-Я\w\d\s]{2,25}$/ig.test(String(name)) : false;
}

export function getValue(value) {
    if (typeof value === "function") return value();
    else return value;
}

export function fillArray(size, value) {
    const result = [];
    for (let i = 0; i < size; i++) result.push(getValue(value));
    return result;
}

/**
 * Перевод двумерных координат в одномерный индекс
 * @param x
 * @param y
 * @param width
 * @returns {*}
 */
export function index(x, y, width) {
    return (y * width) + x;
}

/**
 * Попадает-ли число в диапазон
 * @param v
 * @param min
 * @param max
 * @returns {boolean}
 */
export function inRange(v, min, max) {
    return (v >= min && v <= max);
}

export function limit(val, min, max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

/**
 *
 * Делает генератор фигуры из набора точек по базовым координатам
 * @param points на вход приходят точки образующие фигуру
 * @returns {function(*, *): *} на выход функция, которая по координатам вернет точки со смещением
 */
export function shape(points) {
    return (x, y) => points.map(([dx, dy]) => [x + dx, y + dy]);
}

/**
 * Генератор точек прямоугольника
 * @param size
 * @param isVertical
 * @returns {function(*, *): *}
 */
export function rectangle(size, isVertical = false) {
    const points = [];
    if (isVertical) for (let i = 0; i < size; i++) points.push([0, i]);
    else for (let i = 0; i < size; i++) points.push([i, 0]);
    return shape(points);
}

/**
 * Генератор точек ближайшей окружности
 * @returns {function(*, *): *}
 */
export function near() {
    return shape([
        [-1,-1], [0,-1], [+1,-1],
        [-1, 0],/*[x,y]*/[+1, 0],
        [-1,+1], [0,+1], [+1,+1]
    ]);
}

/**
 * Объединяет пересекающиеся наборы точек в набор уникальных
 * @param points
 * @returns {*[]}
 */
export function combine(points) {
    const separator = '×';
    const result = new Set(points.map(point => point.join(separator)));
    return [...result.values()].map(point => point.split(separator).map(value => Number(value)));
}