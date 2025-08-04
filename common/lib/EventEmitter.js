

export class EventEmitter {
    constructor() {
        this._events = new Map();
    }

    on(eventName, callback) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set());
        }
        this._events.get(eventName).add(callback);
    }

    off(eventName, callback) {
        if (this._events.has(eventName)) {
            this._events.get(eventName).delete(callback);
            if (this._events.get(eventName).size === 0) {
                this._events.delete(eventName);
            }
        }
    }

    emit(eventName, data) {
        if (this._events.has(eventName)) {
            this._events.get(eventName).forEach(callback => callback(data));
        }
    }

    offAll() {
        this._events = new Map();
    }
}