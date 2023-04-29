import "@inrupt/jest-jsdom-polyfills";
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import LoggedView from 'views/LoggedView';
import { act } from "react-dom/test-utils";
import { SessionProvider } from "@inrupt/solid-ui-react";

jest.mock('components/mainComponents/Header', () => ({ Header: () => { return (<div data-testid="mockHeader">Mock</div>) } }))
jest.mock('components/mainComponents/Footer', () => ({ Footer: () => { return (<div data-testid="mockFooter">Mock</div>) } }))

test('logged view no welcome renders outletpage, header and footer', async () => {

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home']} initialIndex={1}>
                        <Routes>
                            <Route path="/home" element={<LoggedView />}>
                                <Route path="/home/:welcome?" element={<div data-testid="outletElement" />} />
                            </Route>
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = screen.getByTestId("mockHeader")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockFooter")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("outletElement");
    expect(linkElement).toBeInTheDocument();
});