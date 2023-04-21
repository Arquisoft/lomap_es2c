import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';

test('renders error page', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>
        </Provider>
    );
    const linkElement = screen.getByText(/Error 404/i);
    expect(linkElement).toBeInTheDocument();
});