import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './Form';

test('renders hello', () => {
	render(
		<Form
			value={{
				name: 'test',
				age: 23,
			}}
			onSubmit={() => {}}
		/>
	);

	const element = screen.getByText(/Form/i);
	expect(element).toBeInTheDocument();
});
