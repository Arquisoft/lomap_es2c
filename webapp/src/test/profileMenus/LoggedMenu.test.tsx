import "@inrupt/jest-jsdom-polyfills";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoggedMenu } from "components/profileMenus/LoggedMenu";
import { searchUserByUsername, getUserInSesion } from "api/api";
import { HomePage } from "components/mainComponents/HomePage";

const api = require('api/api')
jest.spyOn(api, 'searchUserByUsername')

afterEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
    });
    jest.resetAllMocks();
});

test('renders loggedMenu', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""} ; path=/ ; ' +
            'isLogged=true ; path=/ ; ' +
            'isPodLogged=true ; path=/ ; ',
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <LoggedMenu />
            </MemoryRouter>
        );
    })
    let linkElement = screen.getByTestId("notificationManager");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("userProfileImg");
    expect(linkElement).toBeInTheDocument();
});

test('renders click on profile menu', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""} ; path=/ ; ' +
            'isLogged=true ; path=/ ; ' +
            'isPodLogged=true ; path=/ ; ',
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <LoggedMenu />
            </MemoryRouter>
        );
    })
    let profileMenuButton = screen.getByTestId("profileMenuButton");
    fireEvent.click(profileMenuButton);
    let getProfileButton = screen.getByTestId("getProfileButton");
    expect(getProfileButton).toBeInTheDocument();
    let showEditButton = screen.getByTestId("showEditButton");
    expect(showEditButton).toBeInTheDocument();
    let logoutButton = screen.getByTestId("logoutButton");
    expect(logoutButton).toBeInTheDocument();
});

test('click on getProfile', async () => {

    (searchUserByUsername as any).mockReturnValueOnce(
        Promise.resolve({ username: 'test', webID: 'test', password: '', description: 'test', img: '' })
    );

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"security","webID":"test","password":""} ; path=/ ; ' +
            'isLogged=true ; path=/ ; ' +
            'isPodLogged=true ; path=/ ; ',
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <LoggedMenu />
            </MemoryRouter>
        );
    })
    let profileMenuButton = screen.getByTestId("profileMenuButton");
    fireEvent.click(profileMenuButton);
    let getProfileButton = screen.getByTestId("getProfileButton");
    fireEvent.click(getProfileButton);
    let profileInfo = await screen.findByTestId("profileInfo");
    expect(profileInfo).toBeInTheDocument();

});

test('click on editProfile', async () => {

    (searchUserByUsername as any).mockReturnValueOnce(
        Promise.resolve({ username: 'test', webID: 'test', password: '', description: 'test', img: '' })
    );

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""} ; path=/ ;' +
            'isLogged=true ; path=/ ;' +
            'isPodLogged=true ; path=/ ;',
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <LoggedMenu />
            </MemoryRouter>
        );
    })
    let profileMenuButton = screen.getByTestId("profileMenuButton");
    fireEvent.click(profileMenuButton);
    let showEditButton = screen.getByTestId("showEditButton");
    fireEvent.click(showEditButton);
    let editNoPswInfo = await screen.findByTestId("editNoPswInfo");
    expect(editNoPswInfo).toBeInTheDocument();

});

/*
test('click on editProfile and go editPsw', async () => {

    (searchUserByUsername as any).mockReturnValueOnce(
        Promise.resolve({ username: 'test', webID: 'test', password: '', description: 'test', img: '' })
    );

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""} ; path=/ ;' +
            'isLogged=true ; path=/ ;' +
            'isPodLogged=true ; path=/ ;',
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <LoggedMenu />
            </MemoryRouter>
        );
    })
    let profileMenuButton = screen.getByTestId("profileMenuButton");
    fireEvent.click(profileMenuButton);
    let showEditButton = screen.getByTestId("showEditButton");
    fireEvent.click(showEditButton);
    let editPswButton = await screen.findByText("Cambiar contraseña");
    console.log(editPswButton)
    //let editPswInfo = await screen.findByTestId("editPswInfo");
    //expect(editPswInfo).toBeInTheDocument();

});*/

test('logout', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""} ; path=/ ;' +
            'isLogged=true ; path=/ ;' +
            'isPodLogged=true ; path=/ ;',
    });

    await act(async () => {
        render(
            <MemoryRouter initialEntries={["/home"]} initialIndex={1}>
                <Routes>
                    <Route path="/home" element={<LoggedMenu />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        );
    })
    let profileMenuButton = screen.getByTestId("profileMenuButton");
    fireEvent.click(profileMenuButton);
    let logoutButton = screen.getByTestId("logoutButton");
    fireEvent.click(logoutButton);
    let notification = screen.getByText(/La sesión se ha cerrado correctamente/i);
    expect(notification).toBeInTheDocument();
    let mainPageLogo = await screen.findByTestId("mainPageLogo");
    expect(mainPageLogo).toBeInTheDocument();
    expect(getUserInSesion()).toBe(null)

});

test('click on getProfile throw error', async () => {

    (searchUserByUsername as any).mockImplementationOnce((user: any) =>
        Promise.reject(new Error("Error test"))
    );

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"security","webID":"test","password":""} ; path=/ ;' +
            'isLogged=true ; path=/ ;' +
            'isPodLogged=true ; path=/ ;',
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <LoggedMenu />
            </MemoryRouter>
        );
    })
    let profileMenuButton = screen.getByTestId("profileMenuButton");
    fireEvent.click(profileMenuButton);
    let getProfileButton = screen.getByTestId("getProfileButton");
    fireEvent.click(getProfileButton);
    let profileInfo = await screen.findByText("Error al mostrar tú perfil");
    expect(profileInfo).toBeInTheDocument();

});