import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from 'components/mainComponents/ErrorPage';

test('renders footer', () => {
    render(<ErrorPage />);
    const linkElement = screen.getByText(/Error 404: Página no encontrada/i);
    expect(linkElement).toBeInTheDocument();
});