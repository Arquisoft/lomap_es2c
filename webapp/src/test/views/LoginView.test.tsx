import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import LoginView from 'views/LoginView';

jest.mock('components/userIdentification/LoginForm', () => ({ Login: () => { return (<div data-testid="mockLogin">Mock</div>) } }))
jest.mock('components/mainComponents/Header', () => ({ Header: () => { return (<div data-testid="mockHeader">Mock</div>) } }))
jest.mock('components/mainComponents/Footer', () => ({ Footer: () => { return (<div data-testid="mockFooter">Mock</div>) } }))

test('login view render login, header and footer', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/login']} initialIndex={1}>
                <Routes>
                    <Route path="/login" element={<LoginView />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("mockHeader")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockFooter")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockLogin");
    expect(linkElement).toBeInTheDocument();
});