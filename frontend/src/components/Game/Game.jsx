import React from "react";
import clsx from "clsx";
import styles from "./Game.module.scss";
import Fleet from "../Fleet";
import Board from "../Board";
import {COLUMNS, ROWS} from "../../lib/constants";
import Modal from "../Modal";
import Winner from "./Winner";


export default function Game({ className, state, dispatch }) {
    return <div className={clsx(styles.container, className)}>
		{(state.gameState === "place" && state.availableShips) ? <Fleet
			ships={state.availableShips}
            selected={state.selectedShip ? state.selectedShip.index : null}
            onSelect={shipIndex => dispatch({
                type: "select-ship",
                payload: shipIndex
            })}
		/> : null}

        <Board
            isMyBoard
            rows={ROWS}
            columns={COLUMNS}
            getState={state.getMyCell}
            getOverlay={state.getOverlay}
            onShipPlaced={(...args) => dispatch({
                type: "place-ship",
                payload: args
            })}
            selectedShip={state.selectedShip ? state.selectedShip.size : null}
            boardState={state.boardState.player}
            lastAction={state.lastAction}
            timeout={state.timeout}
        />

        {(state.gameState !== "place") ? <Board
            isMyBoard={false}
            rows={ROWS}
            columns={COLUMNS}
            getState={state.getEnemyCell}
            getOverlay={state.getOverlay}
            onTargetSelected={(x, y) => {
                dispatch({
                    type: "step",
                    payload: { x, y }
                });
            }}
            selectedShip={state.selectedShip ? state.selectedShip.size : null}
            boardState={state.boardState.enemy}
            lastAction={state.lastAction}
            timeout={state.timeout}
        /> : null}

        {(state.gameState === "result" && (state.winner !== null)) ? <Modal>
            <Winner
                winner={state.winner}
                playerName={state.playerName}
                onNewGame={() => dispatch({
                    type: "start-new"
                })}
            />
        </Modal> : null}
	</div>;
}
