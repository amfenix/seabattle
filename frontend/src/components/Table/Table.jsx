import React from "react";
import clsx from "clsx";
import styles from "./Table.module.scss";


export default function Table({ rows, columns, className, children, overlay, ...props }) {
    return <div {...props} className={clsx(styles.container, className)}>
		<table className={styles.table}>
			<tbody>
			<tr>
				<td className={clsx(styles.cell, styles.label)}>&nbsp;</td>
				{columns.map((columnLabel) => <td
					key={`columnLabel_${columnLabel}`}
					className={clsx(styles.cell, styles.label)}
				>
					{columnLabel}
				</td>)}
			</tr>
			{rows.map((rowLabel, y) => <tr key={`row_${rowLabel}`} >
				<td
					className={clsx(styles.cell, styles.label)}
				>
					{rowLabel}
				</td>
				{columns.map((columnLabel, x) => <td
					key={`cell_${rowLabel}×${columnLabel}`}
					className={styles.cell}
				>{children ? children(x, y) : null}</td>)}
			</tr>)}
			</tbody>
		</table>

		{overlay ? <div
			className={clsx(styles.overlay, {
				[styles.waitGame]: overlay === "wait-game",
				[styles.waitStep]: overlay === "wait-step"
			})}
		/> : null}
	</div>;
}
