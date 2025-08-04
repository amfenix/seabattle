import Table from './Table';
import {COLUMNS, ROWS} from "../../lib/constants";

const meta = {
	title: 'UI/Table',
	component: Table,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;

export const Default = {
	args: {
		rows: ROWS,
		columns: COLUMNS,
		children: (x, y) => (y * COLUMNS.length) + x
	}
};

export const EmptyOverlay = {
	args: {
		rows: ROWS,
		columns: COLUMNS,
		children: (x, y) => (y * COLUMNS.length) + x,
		overlay: true
	}
};

export const WaitGameOverlay = {
	args: {
		rows: ROWS,
		columns: COLUMNS,
		children: (x, y) => (y * COLUMNS.length) + x,
		overlay: "wait-game"
	}
};

export const WaitStepOverlay = {
	args: {
		rows: ROWS,
		columns: COLUMNS,
		children: (x, y) => (y * COLUMNS.length) + x,
		overlay: "wait-step"
	}
};

/*	
export const Variants = (props) => (<div className="storybook-case-wrapper">
	<Table {...props} />
</div>);
*/
