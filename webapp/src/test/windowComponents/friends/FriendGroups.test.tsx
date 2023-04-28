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


test('check friendshowgroup filters', async () => {

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
            groups
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
                    <MemoryRouter initialEntries={['/home/friends/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    await act(async () => {
        let linkElement = await screen.findByTestId("testFriendxm");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Grupo1");
        expect(linkElement).toBeInTheDocument();
        linkElement = await screen.findByTestId("testFriendGrupo1");
        fireEvent.click(linkElement)
        linkElement = await screen.findByTestId("filterxm");
        fireEvent.click(linkElement)
        let autocomplete = await screen.findByTestId("categoriesFilter");
        const input = within(autocomplete).getByRole('combobox');
        autocomplete.focus()
        fireEvent.change(input, { target: { value: "" } })
        fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
        fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
        fireEvent.keyDown(autocomplete, { key: 'Enter' })
        screen.getAllByText("Grupo1")[0].focus();
        linkElement = await screen.findByText("Gastronomía");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check friend showplace', async () => {

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
            groups
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
                    <MemoryRouter initialEntries={['/home/friends/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    await act(async () => {
        let linkElement = await screen.findByTestId("testFriendxm");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Grupo1");
        expect(linkElement).toBeInTheDocument();
        linkElement = await screen.findByTestId("testFriendGrupo1");
        fireEvent.click(linkElement)
        linkElement = await screen.findByText("Bar de Pepe");
        fireEvent.click(linkElement)
        linkElement = await screen.findByLabelText("Longitud");
        expect(linkElement).toBeInTheDocument();
    });
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