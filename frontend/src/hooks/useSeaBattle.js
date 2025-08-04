import React, { useReducer, useEffect } from "react";
import { GameApi, Client, initTestBot, ClientWithSocket } from "sea-battle-common";
import { DEFAULT_TIMEOUT, NAME_KEY, PLAYER_STATE } from "../lib/constants";
import { socket } from '../socket';

const game = new GameApi(DEFAULT_TIMEOUT, NAME_KEY, PLAYER_STATE);
window.game = game;

switch (localStorage.getItem('__api')) {
    case ('bot'):
        window.api = new Client();
        window.bot = initTestBot();
        bot.connect(window.api);
        game.connect(window.api);
        break;
    default:
        window.api = new ClientWithSocket(socket);
        window.api.connect();
        game.connect(window.api);
}

export function useSeaBattle() {
    const [state, dispatch] = useReducer(game.reducer, game.getAppState());

    useEffect(() => {
        game.subscribe(dispatch);

        return () => game.unsubscribe();
    }, []);

    return [state, dispatch];
}
