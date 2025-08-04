import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

test('renders hello', () => {
	render(<Table />);
	const element = screen.getByText(/Table/i);
	expect(element).toBeInTheDocument();
});
