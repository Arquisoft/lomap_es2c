import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import HomeView from 'views/HomeView';

jest.mock('components/mainComponents/Header', () => ({ Header: () => { return (<div data-testid="mockHeader">Mock</div>) } }))
jest.mock('components/mainComponents/Footer', () => ({ Footer: () => { return (<div data-testid="mockFooter">Mock</div>) } }))

test('home view renders outletpage, header and footer', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/home/main']} initialIndex={1}>
                <Routes>
                    <Route path="/home" element={<HomeView />}>
                        <Route path="/home/main" element={<div data-testid="outletElement" />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("mockHeader")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockFooter")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("outletElement");
    expect(linkElement).toBeInTheDocument();
});