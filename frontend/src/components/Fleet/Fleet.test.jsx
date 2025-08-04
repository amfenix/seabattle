import React from 'react';
import { render, screen } from '@testing-library/react';
import Fleet from './Fleet';

test('renders hello', () => {
	render(<Fleet />);
	const element = screen.getByText(/Fleet/i);
	expect(element).toBeInTheDocument();
});
