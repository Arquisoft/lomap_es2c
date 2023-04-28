import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { Login } from 'components/userIdentification/LoginForm';
import { Signup } from 'components/userIdentification/SignupForm';
import { signup } from 'api/api'

jest.mock('components/userIdentification/LoginForm', () => ({ Login: () => { return (<div data-testid="mockLogin">Mock</div>) } }))

const api = require('api/api')
jest.spyOn(api, 'signup')

test('renders signup form', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("signupTitle");
    expect(linkElement).toBeInTheDocument();
});

test('signup redirect to login', async () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("goLoginButton");
    fireEvent.click(linkElement);
    linkElement = await screen.findByTestId("mockLogin");
    expect(linkElement).toBeInTheDocument();
});

test('try to signup with credencials', async () => {

    (signup as any).mockReturnValueOnce(
        Promise.resolve({ username: 'test', webID: 'test', password: '', description: 'test', img: '' })
    );

    const { getByLabelText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Signup />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let inputName = getByLabelText("Nombre de usuario");
    fireEvent.change(inputName, { target: { value: 'testUser' } });
    let inputPsw = screen.getByLabelText("Contraseña");
    fireEvent.change(inputPsw, { target: { value: '12345A...' } });
    let inputPswRp = screen.getByLabelText("Repite la contraseña");
    fireEvent.change(inputPswRp, { target: { value: '12345A...' } });
    let linkElement = await screen.findByText("Crear cuenta");
    fireEvent.submit(linkElement);
    linkElement = await screen.findByText("Cuenta creada");
    expect(linkElement).toBeInTheDocument();
});

test('try to signup and catch error', async () => {

    (signup as any).mockImplementationOnce((user: any) =>
        Promise.reject(new Error("Error test"))
    );

    const { getByLabelText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Signup />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let inputName = getByLabelText("Nombre de usuario");
    fireEvent.change(inputName, { target: { value: 'testUser' } });
    let inputPsw = screen.getByLabelText("Contraseña");
    fireEvent.change(inputPsw, { target: { value: '12345A...' } });
    let inputPswRp = screen.getByLabelText("Repite la contraseña");
    fireEvent.change(inputPswRp, { target: { value: '12345A...' } });
    let linkElement = await screen.findByText("Crear cuenta");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText("No se ha podido crear la cuenta");
    expect(linkElement).toBeInTheDocument();
});

test('try to signup with diferent psw', async () => {

    (signup as any).mockImplementationOnce((user: any) =>
        Promise.reject(new Error("Error test"))
    );

    const { getByLabelText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Signup />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let inputName = getByLabelText("Nombre de usuario");
    fireEvent.change(inputName, { target: { value: 'testUser' } });
    let inputPsw = screen.getByLabelText("Contraseña");
    fireEvent.change(inputPsw, { target: { value: '12345A...' } });
    let inputPswRp = screen.getByLabelText("Repite la contraseña");
    fireEvent.change(inputPswRp, { target: { value: '12345A..' } });
    let linkElement = await screen.findByText("Crear cuenta");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText("Las contraseñas no coinciden");
    expect(linkElement).toBeInTheDocument();
});