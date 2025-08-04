import Layout from './Layout';

const meta = {
	title: 'UI/Layout',
	component: Layout,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
};

export default meta;

export const Default = {
	args: {},
};

export const Filled = {
	args: {
		header: '<HEADER>',
		footer: '<FOOTER>',
		children: '<CONTENT>',
	},
};
