import Cell from './Cell';
import {EMPTY, MISSED, SHIP, SINKED} from "../../lib/constants";


const meta = {
	title: 'UI/Cell',
	component: Cell,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;

const CellWrapper = ({ children }) => <div style={{
	border: '1px solid gray'
}}>{children}</div>

export const States = (props) => (<div className="storybook-case-wrapper">
	<CellWrapper>
		<Cell {...props} state={EMPTY} />
	</CellWrapper>
	<CellWrapper>
		<Cell {...props} state={MISSED} />
	</CellWrapper>
	<CellWrapper>
		<Cell {...props} state={SHIP} />
	</CellWrapper>
	<CellWrapper>
		<Cell {...props} state={SINKED} />
	</CellWrapper>
</div>);

export const Overlays = (props) => (<div className="storybook-case-wrapper">
	<CellWrapper>
		<Cell {...props} />
	</CellWrapper>
	<CellWrapper>
		<Cell {...props} overlay={0} />
	</CellWrapper>
	<CellWrapper>
		<Cell {...props} overlay={1} />
	</CellWrapper>
</div>);

