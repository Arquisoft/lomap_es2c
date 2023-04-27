import "@inrupt/jest-jsdom-polyfills";
import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { act } from 'react-dom/test-utils';
import { MainPage } from 'components/mainComponents/MainPage';
import { verMapaDeAmigo, añadirPermisosAmigo } from 'podManager/MapManager';
import { getMyFriendRequests, getMyFriends, searchUserByUsername, updateRequest } from '../../../api/api';
import { Group, Place, Comment, User } from 'shared/shareddtypes';
import { FriendRequest } from "shared/shareddtypes";

beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""} ; path=/ ; ' +
            'isLogged=true ; path=/ ; ' +
            'isPodLogged=true ; path=/ ; ',
    });
})

afterEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
    });
    jest.resetAllMocks();
});

const api = require('api/api')
jest.spyOn(api, 'searchUserByUsername')
jest.spyOn(api, 'getMyFriends')
jest.spyOn(api, 'getMyFriendRequests')
jest.spyOn(api, 'sendFriendRequest')
jest.spyOn(api, 'updateRequest')
const mapManager = require('podManager/MapManager')

jest.spyOn(mapManager, 'verMapaDeAmigo')
jest.spyOn(mapManager, 'añadirPermisosAmigo')

jest.mock('components/windowComponents/groups/GroupsManagerPanel', () => ({ GroupsManagerPanel: () => { return (<div data-testid="mockGroupManager">Mock</div>) } }))

test('check show error rendering user friendRequests', async () => {

    (getMyFriends as any).mockReturnValue(
        Promise.resolve(
            friends
        )
    );

    (getMyFriendRequests as any).mockReturnValue(
        Promise.reject(
            new Error("Test error")
        )
    );

    (verMapaDeAmigo as any).mockReturnValue(
        Promise.resolve(
            [{
                name: "Grupo1",
                places: places
            }]
        )
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/friends/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = await screen.findByText(/Error al listar tus solicitudes de amistad/);
    expect(linkElement).toBeInTheDocument();
});

test('check renders user friendRequests', async () => {

    (getMyFriends as any).mockReturnValue(
        Promise.resolve(
            friends
        )
    );

    (getMyFriendRequests as any).mockReturnValue(
        Promise.resolve(
            friendRequests
        )
    );

    (verMapaDeAmigo as any).mockReturnValue(
        Promise.resolve(
            [{
                name: "Grupo1",
                places: places
            }]
        )
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/friends/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = await screen.findByTestId("goRequestsIcon");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText("Solicitudes de amistad");
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText("testFriend2");
    expect(linkElement).toBeInTheDocument();
});

test('check renders going from requests to friends', async () => {

    (getMyFriends as any).mockReturnValue(
        Promise.resolve(
            friends
        )
    );

    (getMyFriendRequests as any).mockReturnValue(
        Promise.resolve(
            friendRequests
        )
    );

    (verMapaDeAmigo as any).mockReturnValue(
        Promise.resolve(
            [{
                name: "Grupo1",
                places: places
            }]
        )
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/friends/requests']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = await screen.findByTestId("goFriendsIcon");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText("Tus amigos");
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText("testFriend");
    expect(linkElement).toBeInTheDocument();
});

test('check show friendRequest profile', async () => {

    (getMyFriends as any).mockReturnValue(
        Promise.resolve(
            friends
        )
    );

    (getMyFriendRequests as any).mockReturnValue(
        Promise.resolve(
            friendRequests
        )
    );

    (verMapaDeAmigo as any).mockReturnValue(
        Promise.resolve(
            [{
                name: "Grupo1",
                places: places
            }]
        )
    );

    (searchUserByUsername as any).mockReturnValue(
        Promise.resolve(
            { username: 'testFriend2', webID: 'webidfriend', img: '', password: '', description: '' }
        )
    )

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/friends/requests']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    //let linkElement = await screen.findByTestId("goRequestsIcon");
    //fireEvent.click(linkElement);
    let linkElement = await screen.findByTestId("testFriend2");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText("Solicitud de amistad");
    expect(linkElement).toBeInTheDocument();
});

test('check accept friendRequest', async () => {

    (getMyFriends as any).mockReturnValue(
        Promise.resolve(
            friends
        )
    );

    (getMyFriendRequests as any).mockReturnValue(
        Promise.resolve(
            friendRequests
        )
    );

    (verMapaDeAmigo as any).mockReturnValue(
        Promise.resolve(
            [{
                name: "Grupo1",
                places: places
            }]
        )
    );

    (updateRequest as any).mockReturnValue(
        Promise.resolve(
            {}
        )
    );

    (searchUserByUsername as any).mockReturnValue(
        Promise.resolve(
            { username: 'testFriend2', webID: 'webidfriend', img: '', password: '', description: '' }
        )
    );

    (añadirPermisosAmigo as any).mockReturnValue(
        Promise.resolve()
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/friends/requests']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = await screen.findByTestId("testFriend2Accept");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/aceptada correctamente/i);
    expect(linkElement).toBeInTheDocument();
});

test('check reject friendRequest', async () => {

    (getMyFriends as any).mockReturnValue(
        Promise.resolve(
            friends
        )
    );

    (getMyFriendRequests as any).mockReturnValue(
        Promise.resolve(
            friendRequests
        )
    );

    (verMapaDeAmigo as any).mockReturnValue(
        Promise.resolve(
            [{
                name: "Grupo1",
                places: places
            }]
        )
    );

    (updateRequest as any).mockReturnValue(
        Promise.resolve(
            {}
        )
    )

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/friends/requests']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = await screen.findByTestId("testFriend2Decline");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/rechazada correctamente/i);
    expect(linkElement).toBeInTheDocument();
});

const comments: Comment[] = [
    { author: "security", date: "10/04/2023", comment: "Review del bar de Pepe" }
]

const places: Place[] = [
    { nombre: "Bar de Pepe", category: "Bar", latitude: "50.862545", longitude: "4.32321", reviewScore: "3", comments: comments, description: "", date: "10/10/2023", images: [], },
    { nombre: "Restaurante 1", category: "Restaurante", latitude: "50.962545", longitude: "4.42321", reviewScore: "4", comments: comments, description: "", date: "10/10/2023", images: [], },
    { nombre: "Tienda 1", category: "Tienda", latitude: "50.782545", longitude: "4.37321", reviewScore: "5", comments: comments, description: "", date: "10/10/2023", images: [], },
]

const groups: Group[] = [
    { name: "Grupo1", places: places }
]

const friends: User[] = [
    { username: 'testFriend', webID: 'webidfriend', img: '', password: '', description: '' }
]

const friendRequests: FriendRequest[] = [
    {
        sender: 'testFriend2',
        receiver: 'test',
        status: 0,
    }
]