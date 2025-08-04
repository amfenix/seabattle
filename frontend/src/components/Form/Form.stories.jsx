import Form from './Form';

const meta = {
	title: 'UI/Form',
	component: Form,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		title: 'Example 1',
		fields: {
			age: { type: 'number' },
		},
		value: {
			name: 'Test',
			age: 23,
		},
		onSubmit: (data) => {},
	},
};

export default meta;

export const Default = {
	args: {},
};
