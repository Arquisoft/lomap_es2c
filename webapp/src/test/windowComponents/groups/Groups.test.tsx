import "@inrupt/jest-jsdom-polyfills";
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { act } from 'react-dom/test-utils';
import { MainPage } from 'components/mainComponents/MainPage';
import { Place, Comment, Group } from '../../../shared/shareddtypes'
import { verMapaDe, eliminarGrupo, crearGrupo, añadirLugarAGrupo } from "podManager/MapManager";

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
const mapManager = require('podManager/MapManager')
jest.spyOn(mapManager, 'verMapaDe')
jest.spyOn(mapManager, 'crearGrupo')
jest.spyOn(mapManager, 'añadirLugarAGrupo')
jest.spyOn(mapManager, 'eliminarGrupo')

jest.mock('components/windowComponents/friends/FriendManagerPanel', () => ({ FriendManagerPanel: () => { return (<div data-testid="mockFriendManager">Mock</div>) } }))
//jest.mock('components/windowComponents/groups/groupViews/AddGroupForm', () => ({ AddGroupForm: () => { return (<div data-testid="mockAddGroup">Mock</div>) } }))
//jest.mock('components/windowComponents/groups/groupViews/ShowGroup', () => ({ ShowGroup: () => { return (<div data-testid="mockShowGroup">Mock</div>) } }))
//jest.mock('components/windowComponents/groups/groupViews/ShowFriendGroup', () => ({ ShowFriendGroup: () => { return (<div data-testid="mockShowFriendGroup">Mock</div>) } }))


test('check renders user groups', async () => {

    (verMapaDe as any).mockReturnValue(
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
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = screen.getByText("Grupo1");
    expect(linkElement).toBeInTheDocument();
});

test('check show user group', async () => {

    (verMapaDe as any).mockReturnValue(
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
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={
                                <>
                                    <MainPage />
                                </>
                            } />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = screen.getByText("Grupo1");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/Mostrando el grupo/i);
    expect(linkElement).toBeInTheDocument();
});

test('check add group', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    (crearGrupo as any).mockImplementationOnce((name: any, session: any) => {
        groups.push({ name: name, places: places })
        return Promise.resolve({ name: name, places: places })
    })



    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={
                                <>
                                    <MainPage />
                                </>
                            } />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = screen.getByTestId("addGroup");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/Crear grupo/i);
    expect(linkElement).toBeInTheDocument();
    let input = screen.getByLabelText("Nombre del grupo")
    fireEvent.change(input, { target: { value: 'Grupo2' } });
    fireEvent.submit(linkElement);
    linkElement = await screen.findByText("Grupo2");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/creado correctamente/i);
    expect(linkElement).toBeInTheDocument();
});

test('check renders groups places', async () => {

    (verMapaDe as any).mockReturnValue(
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
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = screen.getByTestId("Grupo1xm");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText("Bar de Pepe");
    expect(linkElement).toBeInTheDocument();
});


test('check showgroup from main', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={
                                <>
                                    <MainPage />
                                </>
                            } />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    await act(async () => {
        let linkElement = screen.getByTestId("Grupo1");
        fireEvent.click(linkElement);
        linkElement = await screen.findByTestId("breadcrumbShowgroup");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check showplace', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={
                                <>
                                    <MainPage />
                                </>
                            } />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    await act(async () => {
        let linkElement = screen.getByTestId("Grupo1");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Bar de Pepe");
        fireEvent.click(linkElement);
        linkElement = screen.getByTestId("breadcrumbShowplace");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check breadcrumbs', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<>
                                <MainPage />
                            </>} />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    await act(async () => {
        let linkElement = screen.getByTestId("Grupo1");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Bar de Pepe");
        fireEvent.click(linkElement);
        linkElement = screen.getByTestId("breadcrumbShowplace");
        expect(linkElement).toBeInTheDocument();
        linkElement = await screen.findByLabelText("Categoría");
        expect(linkElement).toBeInTheDocument();
        linkElement = await screen.findByTestId("Grupo1");
        fireEvent.click(linkElement);
        linkElement = screen.getByTestId("breadcrumbShowgroup");
        expect(linkElement).toBeInTheDocument();
        linkElement = await screen.findByText("Bar de Pepe");
        expect(linkElement).toBeInTheDocument();
        linkElement = screen.getByText("Mis grupos");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Grupo2");
        expect(linkElement).toBeInTheDocument();
    });
});



test('check showgroup filters', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={
                                <>
                                    <MainPage />
                                </>
                            } />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    await act(async () => {
        let linkElement = screen.getByTestId("Grupo1");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Tienda 1");
        expect(linkElement).toBeInTheDocument();
        linkElement = screen.getByTestId("showgroupxm");
        fireEvent.click(linkElement);
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

test('check delete group', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    (eliminarGrupo as any).mockImplementationOnce((group: any, session: any) => {
        places.pop()
        return Promise.resolve(true)
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter initialEntries={['/home/groups/main']} initialIndex={1}>
                        <Routes>
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={
                                <>
                                    <MainPage />
                                </>
                            } />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    await act(async () => {
        let linkElement = screen.getByTestId("Grupo1");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Tienda 1");
        expect(linkElement).toBeInTheDocument();
        linkElement = screen.getByTestId("deleteGroup");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Eliminar grupo");
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