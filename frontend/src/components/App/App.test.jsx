import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello', () => {
	render(<App />);
	const element = screen.getByText(/Сделано в/i);
	expect(element).toBeInTheDocument();
});
