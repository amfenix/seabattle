import React from "react";
import styles from "./Game.module.scss";
import Button from "../Button";

export default function Winner({ winner, playerName, onNewGame }) {
    return <div className={styles.winner}>
        <h2>{(winner === playerName)
            ? "Поздравляем с победой! Начнем следующую игру?"
            : `Увы, поражение от «${winner}» ( Но в следующей точно получится!`}</h2>
        <Button
            variant="primary"
            onClick={onNewGame}
        >
            Новая игра
        </Button>
    </div>;
}
