import React, {useEffect, useState} from "react";
import styles from "./Board.module.scss";
import {DEFAULT_TIMEOUT} from "../../lib/constants";

const parseTime = (timeout) => {
    const minutes = Math.floor(timeout / 60);
    const seconds = timeout % 60;
    return `${minutes}:${seconds}`;
}

export default function Status({ message, timeout, isTimerVisible, lastAction }) {
    const [time, setTime] = useState(timeout ?? DEFAULT_TIMEOUT);
    const [previousAction, setPreviousAction] = useState(lastAction);

    useEffect(() => {
        let timer;
        if (time > 0) timer = setTimeout(() => {
            if (lastAction !== previousAction) {
                setPreviousAction(lastAction);
                setTime(timeout ?? DEFAULT_TIMEOUT);
            } else {
                setTime(time - 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [time, timeout, previousAction, lastAction]);

    return <div className={styles.status}>
        <span>{message}</span>
        {isTimerVisible ? <span>{parseTime(time)}</span> : null}
    </div>
}
