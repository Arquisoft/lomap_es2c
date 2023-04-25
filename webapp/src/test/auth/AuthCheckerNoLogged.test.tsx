import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { Login } from 'components/userIdentification/LoginForm';
import { AuthCheckerNoLogged } from 'auth/AuthCheckerNoLogged';
import { HomePage } from 'components/mainComponents/HomePage';

jest.mock('components/mainComponents/HomePage', () => ({ HomePage: () => { return (<div data-testid="mockHomePage">Mock</div>) } }))

afterEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
    });
});

test('checker redirect home if logged', () => {

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
                    <Route index element={<AuthCheckerNoLogged><div data-testid="allowRequest"></div> </AuthCheckerNoLogged>} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("mockHomePage");
    expect(linkElement).toBeInTheDocument();
});

test('checker allow request if not logged', () => {

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<AuthCheckerNoLogged><div data-testid="allowRequest"></div> </AuthCheckerNoLogged>} />
                    <Route path="/login" element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("allowRequest");
    expect(linkElement).toBeInTheDocument();
});