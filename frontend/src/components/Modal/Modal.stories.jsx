import Modal from './Modal';

const meta = {
	title: 'UI/Modal',
	component: Modal,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		portal: false,
		up: false,
		closeIcon: true,
		onClose: () => {},
	},
};

export default meta;

export const Default = (props) => (
	<div
		className="storybook-case-wrapper"
		style={{
			position: 'relative',
			height: '100%',
		}}
	>
		<Modal {...props}>Modal content</Modal>
	</div>
);
