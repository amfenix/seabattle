import Button from './Button';

const meta = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'Button',
	},
};

export default meta;

export const Default = {
	args: {},
};

export const Variants = (props) => (
	<div className="storybook-case-wrapper">
		<Button {...props} variant="text" />
		<Button {...props} variant="outlined" />
		<Button {...props} variant="secondary" />
		<Button {...props} variant="primary" />
	</div>
);
