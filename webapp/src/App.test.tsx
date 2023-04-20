import React from 'react';
import "@inrupt/jest-jsdom-polyfills";
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('renders app', async () => {
    await act(async () => { render(<App />) });
    const linkElement = screen.getByTestId("mainPageLogo");
    expect(linkElement).toBeInTheDocument();
});
