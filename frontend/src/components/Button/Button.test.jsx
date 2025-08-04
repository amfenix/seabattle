import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders hello', () => {
	render(<Button>Button</Button>);
	const element = screen.getByText(/Button/i);
	expect(element).toBeInTheDocument();
});
