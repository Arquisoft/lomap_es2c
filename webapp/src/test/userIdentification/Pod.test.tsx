import "@inrupt/jest-jsdom-polyfills";
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { Footer } from '../../components/mainComponents/Footer'
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pod from 'components/userIdentification/podLogin/Pod';
import { act } from "react-dom/test-utils";
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';

test('renders podLogin', async () => {
    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<Pod />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });
    const linkElement = screen.getByText(/Inicia sesión con tu proveedor de pod/i);
    expect(linkElement).toBeInTheDocument();
});

test('test login show providers', async () => {
    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<Pod />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    const autocomplete = screen.getByTestId('providersCb');
    const input = within(autocomplete).getByRole('combobox');

    autocomplete.focus()

    fireEvent.change(input, { target: { value: "" } })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })

    let loginButton = screen.getByText("Inrupt")
    expect(loginButton).toBeInTheDocument();
});

test('test select inrupt option', async () => {

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<Pod />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    });

    const autocomplete = screen.getByTestId('providersCb');
    const input = within(autocomplete).getByRole('combobox');

    autocomplete.focus()

    fireEvent.change(input, { target: { value: "" } })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
    let loginButton = screen.getByText(/Iniciar sesión/i)
    loginButton.focus();
    expect((input as any).value).toBe("Inrupt")
});