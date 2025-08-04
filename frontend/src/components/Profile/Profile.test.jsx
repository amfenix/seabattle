import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

test('renders hello', () => {
	render(<Profile />);
	const element = screen.getByText(/Profile/i);
	expect(element).toBeInTheDocument();
});
