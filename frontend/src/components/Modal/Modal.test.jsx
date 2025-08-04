import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

test('renders hello', () => {
	render(<Modal>Modal</Modal>);
	const element = screen.getByText(/Modal/i);
	expect(element).toBeInTheDocument();
});
