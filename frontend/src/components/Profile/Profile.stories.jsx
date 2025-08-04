import {useState} from "react";
import Profile from './Profile';


const meta = {
	title: 'UI/Profile',
	component: Profile,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		modalProps: {
			up: false,
			portal: false
		}
	}
};

export default meta;

function ProfileWrapper({ children }) {
	const [name, setName] = useState();
	return <div style={{minHeight: '500px'}}>
		<children.type
			{...children.props}
			name={name}
			setName={setName}
		/>
	</div>
}


export const Default = (props) => (<div className="storybook-case-wrapper">
	<ProfileWrapper>
		<Profile {...props} />
	</ProfileWrapper>
</div>);

