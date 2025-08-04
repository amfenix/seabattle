export const PROJECT_NAME = 'Морской Бой';
export const DEFAULT_NAME = "Unknown Hero";

export const COLUMNS = 'абвгдежзик'.split('');
export const ROWS = '1,2,3,4,5,6,7,8,9,10'.split(',');

export const EMPTY = 0;
export const MISSED = 1;
export const SHIP = 2;
export const SINKED = 3;

export const NAME_KEY = 'player-name';

export const PLAYER_STATE = {
    "place": { enemy: { overlay: "active" } },
    "wait": { enemy: { overlay: "wait-game", message: "Ждем второго игрока..." }},
    "my-step": {
        enemy: { message: "Наш ход", timer: true },
        player: { overlay: "active" }
    },
    "enemy-step": {
        enemy: { overlay: "wait-step" },
        player: { message: "Ход противника, ждем", timer: true }
    }
};

export const DEFAULT_TIMEOUT = 30;
