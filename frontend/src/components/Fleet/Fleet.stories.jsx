import {useState} from "react";
import Fleet from './Fleet';


const meta = {
	title: 'UI/Fleet',
	component: Fleet,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		ships: [
			[4, 1],
			[3, 2],
			[2, 3],
			[1, 4]
		]
	}
};

export default meta;


function FleetWrapper({ children }) {
	const [selected, setSelected] = useState(null);
	return <children.type
		{...children.props}
		selected={selected}
		onSelect={setSelected}
	/>
}

export const Variants = (props) => (<div className="storybook-case-wrapper">
	<FleetWrapper>
		<Fleet {...props} />
	</FleetWrapper>
</div>);

