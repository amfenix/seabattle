import { Board as GameBoard } from "sea-battle-common";
import Board from './Board';
import {COLUMNS, EMPTY, MISSED, ROWS, SHIP, SINKED} from "../../lib/constants";


const meta = {
	title: 'UI/Board',
	component: Board,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;

const state = {
	'1×1': SHIP,
	'2×1': SHIP,
	'3×1': SINKED,
	'4×1': MISSED
};

export const Default = {
	args: {
		rows: ROWS,
		columns: COLUMNS,
		getState: (x,y) => state[`${x}×${y}`] ?? EMPTY
	}
};

const testBoard = new GameBoard(ROWS.length, COLUMNS.length);
testBoard.placeShip(1,1, 3, false);

export const Overlay = {
	args: {
		rows: ROWS,
		columns: COLUMNS,
		getState: (x,y) => testBoard.get(x,y).state,
		placeShip: 4,
		isMyBoard: true,
		onShipPlaced: () => {},
		getOverlay: testBoard.getOverlay.bind(testBoard)
	}
};

/*	
export const Variants = (props) => (<div className="storybook-case-wrapper">
	<Board {...props} />
</div>);
*/
