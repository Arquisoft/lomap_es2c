import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/mainComponents/Footer'

test('renders footer', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Aplicación realizada por:/i);
    expect(linkElement).toBeInTheDocument();
});