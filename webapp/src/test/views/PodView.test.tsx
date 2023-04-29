import "@inrupt/jest-jsdom-polyfills";
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import PodView from 'views/PodView';
import { act } from 'react-dom/test-utils';

jest.mock('components/mainComponents/Header', () => ({ Header: () => { return (<div data-testid="mockHeader">Mock</div>) } }))
jest.mock('components/mainComponents/Footer', () => ({ Footer: () => { return (<div data-testid="mockFooter">Mock</div>) } }))

test('pod view renders podPage, header and footer', async () => {
    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter >
                    <Routes>
                        <Route index element={<PodView />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByTestId("mockHeader")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockFooter")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Inicia sesión con tu proveedor de pod/);
    expect(linkElement).toBeInTheDocument();
});