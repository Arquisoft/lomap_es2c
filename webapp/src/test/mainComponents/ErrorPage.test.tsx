import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { BrowserRouter } from 'react-router-dom';

test('renders error page', () => {
    render(
        <BrowserRouter>
            <ErrorPage />
        </BrowserRouter>
    );
    const linkElement = screen.getByText(/Error 404/i);
    expect(linkElement).toBeInTheDocument();
});