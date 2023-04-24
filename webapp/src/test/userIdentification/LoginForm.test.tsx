import React from 'react';
import { findByText, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { Login } from 'components/userIdentification/LoginForm';
import { Signup } from 'components/userIdentification/SignupForm';
import { login } from 'api/api';
import Pod from 'components/userIdentification/podLogin/Pod'

jest.mock('components/userIdentification/SignupForm', () => ({ Signup: () => { return (<div data-testid="mockSignup">Mock</div>) } }))
jest.mock('components/userIdentification/podLogin/Pod', () => () => { return (<div data-testid="mockPodLogin">Mock</div>) })

const api = require('api/api')
jest.spyOn(api, 'login')

test('renders login form', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("loginTitle");
    expect(linkElement).toBeInTheDocument();
});

test('login redirect to signup', async () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("goSignupButton");
    fireEvent.click(linkElement);
    linkElement = await screen.findByTestId("mockSignup");
    expect(linkElement).toBeInTheDocument();
});

test('try to login with credencials', async () => {

    (login as any).mockReturnValueOnce(
        Promise.resolve({ username: 'test', webID: 'test', password: '', description: 'test', img: '' })
    );

    const { getByLabelText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/podLogin" element={<Pod />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let inputName = getByLabelText("Nombre de usuario");
    fireEvent.change(inputName, { target: { value: 'security' } });
    expect((inputName as any).value).toBe("security");
    let inputPsw = screen.getByLabelText("Contraseña");
    fireEvent.change(inputPsw, { target: { value: 'hola' } });
    let linkElement = await screen.findByText("Iniciar sesión");
    fireEvent.submit(linkElement);
    linkElement = await screen.findByTestId("mockPodLogin");
    expect(linkElement).toBeInTheDocument();
});

test('try to login and catch error', async () => {

    (login as any).mockImplementationOnce((user: any) =>
        Promise.reject(new Error("Error test"))
    );

    const { getByLabelText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/podLogin" element={<Pod />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let inputName = getByLabelText("Nombre de usuario");
    fireEvent.change(inputName, { target: { value: 'security' } });
    expect((inputName as any).value).toBe("security");
    let inputPsw = screen.getByLabelText("Contraseña");
    fireEvent.change(inputPsw, { target: { value: 'hola' } });
    let linkElement = await screen.findByText("Iniciar sesión");
    fireEvent.submit(linkElement);
    linkElement = await screen.findByText("Error al iniciar sesión");
    expect(linkElement).toBeInTheDocument();
});