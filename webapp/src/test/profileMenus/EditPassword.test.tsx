import "@inrupt/jest-jsdom-polyfills";
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { editPassword } from "api/api";
import { HomePage } from "components/mainComponents/HomePage";
import { Provider } from "react-redux";
import store from "utils/redux/store";
import { EditProfile } from "components/profileMenus/EditProfile";
import { EditPassword } from "components/profileMenus/EditPassword";
import { User } from "shared/shareddtypes";

const api = require('api/api')
jest.spyOn(api, 'editPassword')

afterEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
    });
    jest.resetAllMocks();
});

jest.mock('components/mainComponents/HomePage', () => ({ HomePage: () => { return (<div data-testid="mockHomePage">Mock</div>) } }))

test('renders editPassword', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<EditPassword />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByText("Actualizar contraseña");
    expect(linkElement).toBeInTheDocument();
});

test('edits password', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    (editPassword as any).mockReturnValueOnce(
        Promise.resolve(user)
    )

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="home/edit" element={<div data-testid="mockEditProfile" />} />
                        <Route index element={<EditPassword />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByLabelText("Contraseña actual")
    fireEvent.change(linkElement, { target: { value: 'testPSW' } });
    linkElement = screen.getByLabelText("Nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByLabelText("Repite la nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByText("Editar perfil");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/Contraseña editada correctamente/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByTestId("mockEditProfile");
    expect(linkElement).toBeInTheDocument();
});

test('edits password with crash', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    (editPassword as any).mockImplementationOnce((user: any) => {
        return Promise.reject(new Error("Test error"))
    })

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<EditPassword />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByLabelText("Contraseña actual")
    fireEvent.change(linkElement, { target: { value: 'testPSW' } });
    linkElement = screen.getByLabelText("Nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByLabelText("Repite la nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByText("Editar perfil");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/No se actualizó la contraseña/i);
    expect(linkElement).toBeInTheDocument();
});

test('edits password with no actual psw', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    (editPassword as any).mockImplementationOnce((user: any) => {
        return Promise.reject(new Error("Test error"))
    })

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<EditPassword />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByLabelText("Nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByLabelText("Repite la nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByText("Editar perfil");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/Debe introducir la contraseña actual/i);
    expect(linkElement).toBeInTheDocument();
});

test('edits password with no confirm password', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    (editPassword as any).mockImplementationOnce((user: any) => {
        return Promise.reject(new Error("Test error"))
    })

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<EditPassword />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByLabelText("Contraseña actual")
    fireEvent.change(linkElement, { target: { value: 'testPSW' } });
    linkElement = screen.getByLabelText("Nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByText("Editar perfil");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/Debe confirmar la nueva contraseña/i);
    expect(linkElement).toBeInTheDocument();
});

test('edits password with no valid password', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    (editPassword as any).mockImplementationOnce((user: any) => {
        return Promise.reject(new Error("Test error"))
    })

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route index element={<EditPassword />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByLabelText("Contraseña actual")
    fireEvent.change(linkElement, { target: { value: 'testPSW' } });
    linkElement = screen.getByLabelText("Nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345A...' } });
    linkElement = screen.getByLabelText("Repite la nueva contraseña")
    fireEvent.change(linkElement, { target: { value: '12345B...' } });
    linkElement = screen.getByText("Editar perfil");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/Las contraseñas no coinciden/i);
    expect(linkElement).toBeInTheDocument();
});


const user: User = { username: 'test', webID: 'webid', img: '', password: '', description: '' }
