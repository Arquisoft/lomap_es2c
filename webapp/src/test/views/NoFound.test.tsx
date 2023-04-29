import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import HomeView from 'views/HomeView';
import { NoFound } from 'views/NoFound';

jest.mock('components/mainComponents/Header', () => ({ Header: () => { return (<div data-testid="mockHeader">Mock</div>) } }))
jest.mock('components/mainComponents/Footer', () => ({ Footer: () => { return (<div data-testid="mockFooter">Mock</div>) } }))

test('no found renders errorPage, footer and header', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/home/main']} initialIndex={1}>
                <Routes>
                    <Route path="*" element={<NoFound />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("mockHeader")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockFooter")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Error 404/i);
    expect(linkElement).toBeInTheDocument();
});