import React from "react";
import clsx from "clsx";
import styles from "./Fleet.module.scss";
import Ship from "./Ship";


export default function Fleet({ className, ships = [], selected = null, onSelect }) {
    return <div className={clsx(styles.container, className)}>
		<h2>Ваш флот</h2>
		<p>Кликнете по кораблю для<br /> размещения на поле</p>
		{ships.map(([size, amount], index) => <div
			key={size}
			className={clsx(styles.item, {
				[styles.selected]: selected === index,
				[styles.placed]: amount === 0
			})}
		>
			<span>{amount} ×</span>
			<Ship
				onSelect={() => {
					onSelect(index === selected ? null : index);
				}}
				size={size}
			/>
		</div>)}
	</div>;
}
