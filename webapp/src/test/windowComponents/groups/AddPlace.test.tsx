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


test('check add place', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    (añadirLugarAGrupo as any).mockImplementationOnce((lugar: Place, grupo: Group, session: any) => {
        places.push(lugar)
        return Promise.resolve(groups[0])
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
    let linkElement = screen.getByTestId("addPlaceGrupo1");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText("Añadir lugar");
    expect(linkElement).toBeInTheDocument();
    let inputName = screen.getByLabelText("Nombre del lugar")
    fireEvent.change(inputName, { target: { value: 'Lugar2' } });
    let inputCategory = screen.getByPlaceholderText("Categoría")
    fireEvent.change(inputCategory, { target: { value: 'Bar' } });
    let inputLng = screen.getByLabelText("Longitud")
    fireEvent.change(inputLng, { target: { value: '1' } });
    let inputLat = screen.getByLabelText("Latitud")
    fireEvent.change(inputLat, { target: { value: '1' } });
    let inputReseña = screen.getByPlaceholderText("Reseña...")
    fireEvent.change(inputReseña, { target: { value: 'reseña' } });
    let rating = screen.getByLabelText("Very Dissatisfied");
    linkElement = screen.getByText("Añadir")
    fireEvent.submit(linkElement);
    linkElement = await screen.findByText("Lugar2");
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/añadido correctamente/i);
    expect(linkElement).toBeInTheDocument();
});

test('check add place from map', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    (añadirLugarAGrupo as any).mockImplementationOnce((lugar: Place, grupo: Group, session: any) => {
        places.push(lugar)
        return Promise.resolve(groups[0])
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
    let linkElement = screen.getByTestId("addPlaceGrupo1");
    fireEvent.click(linkElement);
    linkElement = await screen.findByText(/Añadir lugar/i);
    expect(linkElement).toBeInTheDocument();
    let map = screen.getAllByRole("img")[0]
    fireEvent.click(map);
    let inputName = screen.getByLabelText("Nombre del lugar")
    fireEvent.change(inputName, { target: { value: 'Lugar3' } });
    let inputCategory = screen.getByPlaceholderText("Categoría")
    fireEvent.change(inputCategory, { target: { value: 'Iglesia' } });
    let inputReseña = screen.getByPlaceholderText("Reseña...")
    fireEvent.change(inputReseña, { target: { value: 'reseña' } });
    let rating = screen.getByLabelText("Dissatisfied");
    fireEvent.click(rating);
    linkElement = screen.getByText("Añadir")
    fireEvent.submit(linkElement);
    linkElement = await screen.findByText("Lugar3");
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/añadido correctamente/i);
    expect(linkElement).toBeInTheDocument();
});

test('check add place from showgroup', async () => {

    (verMapaDe as any).mockReturnValue(
        Promise.resolve(
            groups
        )
    );

    (añadirLugarAGrupo as any).mockImplementationOnce((lugar: Place, grupo: Group, session: any) => {
        places.push(lugar)
        return Promise.resolve(groups[0])
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
    }); await act(async () => {
        let linkElement = screen.getByTestId("Grupo1");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Bar de Pepe");
        expect(linkElement).toBeInTheDocument();
        linkElement = screen.getByTestId("añadirLugar");
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Añadir lugar");
        expect(linkElement).toBeInTheDocument();
        let inputName = screen.getByLabelText("Nombre del lugar")
        fireEvent.change(inputName, { target: { value: 'Lugar4' } });
        let inputCategory = screen.getByPlaceholderText("Categoría")
        fireEvent.change(inputCategory, { target: { value: 'Bar' } });
        let inputLng = screen.getByLabelText("Longitud")
        fireEvent.change(inputLng, { target: { value: '1' } });
        let inputLat = screen.getByLabelText("Latitud")
        fireEvent.change(inputLat, { target: { value: '1' } });
        let inputReseña = screen.getByPlaceholderText("Reseña...")
        fireEvent.change(inputReseña, { target: { value: 'reseña' } });
        linkElement = screen.getByText("Añadir")
        fireEvent.submit(linkElement);
        linkElement = await screen.findByText("Lugar2");
        expect(linkElement).toBeInTheDocument();
        linkElement = await screen.findByText(/añadido correctamente/i);
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
        linkElement = await screen.findByTestId("añadirLugar");
        fireEvent.click(linkElement);
        linkElement = await screen.findByTestId("addplacebreadcrumbs");
        expect(linkElement).toBeInTheDocument();
        linkElement = await screen.findByText("Mis grupos")
        fireEvent.click(linkElement);
        linkElement = await screen.findByText("Tus grupos de mapas");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check breadcrumbs 2', async () => {

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
        linkElement = await screen.findByTestId("añadirLugar");
        fireEvent.click(linkElement);
        linkElement = await screen.findByTestId("addplacebreadcrumbs");
        expect(linkElement).toBeInTheDocument();
        let linkElements = await screen.findAllByText("Grupo1")
        fireEvent.click(linkElements[0]);
        linkElement = await screen.findByTestId("breadcrumbShowgroup");
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