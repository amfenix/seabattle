import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from './Game';

test('renders hello', () => {
	render(<Game />);
	const element = screen.getByText(/Game/i);
	expect(element).toBeInTheDocument();
});
