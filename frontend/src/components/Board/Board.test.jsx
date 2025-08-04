import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './Board';

test('renders hello', () => {
	render(<Board />);
	const element = screen.getByText(/Board/i);
	expect(element).toBeInTheDocument();
});
