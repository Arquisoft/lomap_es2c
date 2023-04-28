import "@inrupt/jest-jsdom-polyfills";
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoggedMenu } from "components/profileMenus/LoggedMenu";
import { editUserDetails } from "api/api";
import { HomePage } from "components/mainComponents/HomePage";
import { Provider } from "react-redux";
import store from "utils/redux/store";
import { EditProfile } from "components/profileMenus/EditProfile";
import { EditPassword } from "components/profileMenus/EditPassword";
import { User } from "shared/shareddtypes";

const api = require('api/api')
jest.spyOn(api, 'editUserDetails')

afterEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
    });
    jest.resetAllMocks();
});

jest.mock('components/mainComponents/HomePage', () => ({ HomePage: () => { return (<div data-testid="mockHomePage">Mock</div>) } }))

test('renders editProfile', async () => {

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
                        <Route path="home/edit/psw" element={<EditPassword />} />
                        <Route index element={<EditProfile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByText("Edita tu perfil");
    expect(linkElement).toBeInTheDocument();
});

test('edits profile', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    (editUserDetails as any).mockReturnValueOnce(
        Promise.resolve(user)
    )

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/home/edit']} initialIndex={1}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="home/edit/psw" element={<EditPassword />} />
                        <Route path="/home/edit" element={<EditProfile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByText("Edita tu perfil");
    expect(linkElement).toBeInTheDocument();
    let inputBio = screen.getByPlaceholderText("Edita tu biografía...")
    fireEvent.change(inputBio, { target: { value: 'Bio test' } });
    linkElement = screen.getByText("Editar perfil");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/se ha editado correctamente/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByTestId("mockHomePage");
    expect(linkElement).toBeInTheDocument();
});

test('edits profile with crash', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    (editUserDetails as any).mockImplementationOnce((user: any) => {
        return Promise.reject(new Error("Test error"))
    })

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="home/edit/psw" element={<EditPassword />} />
                        <Route index element={<EditProfile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByText("Edita tu perfil");
    expect(linkElement).toBeInTheDocument();
    let inputBio = screen.getByPlaceholderText("Edita tu biografía...")
    fireEvent.change(inputBio, { target: { value: 'Bio test' } });
    linkElement = screen.getByText("Editar perfil");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/No se ha podido actualizar el perfil/i);
    expect(linkElement).toBeInTheDocument();
});

test('redirect home when go back', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/; ' +
            'isLogged=true; path=/; ' +
            'isPodLogged=true; path=/; ',
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/home/edit']} initialIndex={1}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="home/edit/psw" element={<EditPassword />} />
                        <Route path="/home/edit" element={<EditProfile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByText("Edita tu perfil");
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByTestId("goBack");
    fireEvent.click(linkElement);
    linkElement = await screen.findByTestId("mockHomePage");
    expect(linkElement).toBeInTheDocument();
});

test('renders editPsw from editProfile', async () => {

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
                        <Route path="home/edit/psw" element={<EditPassword />} />
                        <Route index element={<EditProfile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    })
    let linkElement = screen.getByText("Actualizar contraseña");
    fireEvent.click(linkElement);
    linkElement = await screen.findByLabelText("Contraseña actual");
    expect(linkElement).toBeInTheDocument();
});


const user: User = { username: 'test', webID: 'webid', img: '', password: '', description: '' }
