import React, {useEffect, useState} from "react";
import clsx from "clsx";
import styles from "./Board.module.scss";
import Table from "../Table";
import Cell from "../Cell";
import Status from "./Status";

export default function Board({ className, rows, columns, getState, getOverlay, isMyBoard, selectedShip, onShipPlaced, onTargetSelected, boardState, timeout, lastAction }) {
	const [cellOverlay, setCellOverlay] = useState({});
	const [overCell, setOverCell] = useState(null);
	const [isVertical, setIsVertical] = useState(false);

	useEffect(() => {
		if (overCell && selectedShip) {
			setCellOverlay(getOverlay(...overCell, selectedShip, isVertical));
		} else {
			setCellOverlay({});
		}
	}, [selectedShip, overCell, isVertical, getOverlay]);

    return <div className={clsx(styles.container, className)}>
		<Table
			onMouseOut={() => setOverCell(null)}
			onContextMenu={(event) => {
				event.preventDefault();
				setIsVertical(!isVertical)
			}}
			rows={rows}
			columns={columns}
			overlay={boardState ? boardState.overlay : null}
		>
			{(x, y) => <Cell
				onMouseOver={() => {
					if (selectedShip && isMyBoard) setOverCell([x, y]);
				}}
				onClick={() => {
					if (selectedShip && isMyBoard && onShipPlaced) {
						onShipPlaced(x, y, selectedShip, isVertical);
					}
					if (!isMyBoard && onTargetSelected) {
						onTargetSelected(x, y);
					}
				}}
				state={getState(x, y)}
				overlay={(cellOverlay[`${x}×${y}`] !== null) ? cellOverlay[`${x}×${y}`] : null}
			/>}
		</Table>

		{(boardState && boardState.message) ? <Status
			message={boardState.message}
			timeout={timeout}
			isTimerVisible={boardState.timer}
			lastAction={lastAction}
		/> : null}
	</div>;
}
