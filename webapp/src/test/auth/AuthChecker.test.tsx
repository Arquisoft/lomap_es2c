import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { AuthChecker } from 'auth/AuthChecker';
import { Login } from 'components/userIdentification/LoginForm';

jest.mock('components/userIdentification/LoginForm', () => ({ Login: () => { return (<div data-testid="mockLogin">Mock</div>) } }))

afterEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
    });
});

test('checker redirect login if not logged', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<AuthChecker><div data-testid="allowRequest"></div> </AuthChecker>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("mockLogin");
    expect(linkElement).toBeInTheDocument();
});

test('checker allow request if logged', () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<AuthChecker><div data-testid="allowRequest"></div> </AuthChecker>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("allowRequest");
    expect(linkElement).toBeInTheDocument();
});