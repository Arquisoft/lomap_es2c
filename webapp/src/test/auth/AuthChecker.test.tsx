import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { AuthChecker } from 'auth/AuthChecker';
import { Login } from 'components/userIdentification/LoginForm';

jest.mock('components/userIdentification/LoginForm', () => ({ Login: () => { return (<div data-testid="mockLogin">Mock</div>) } }))

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