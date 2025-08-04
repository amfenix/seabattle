import React from "react";
import clsx from "clsx";
import styles from "./Cell.module.scss";
import {MISSED, SHIP, SINKED} from "../../lib/constants";

export default function Cell({ className, state, overlay, ...props }) {
    return <div
		{...props}
		className={clsx(styles.container, className, {
			[styles.missed]: state === MISSED,
			[styles.ship]: state === SHIP,
			[styles.sinked]: state === SINKED,
			[styles.allowed]: overlay === 1,
			[styles.denied]: overlay === 0,
		})}
	/>;
}
