import React from 'react';
import { render, screen } from '@testing-library/react';
import Cell from './Cell';

test('renders hello', () => {
	render(<Cell />);
	const element = screen.getByText(/Cell/i);
	expect(element).toBeInTheDocument();
});
