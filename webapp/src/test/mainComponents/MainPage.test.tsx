import React from 'react';
import "@inrupt/jest-jsdom-polyfills";
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { MainPage } from 'components/mainComponents/MainPage';
import { GroupsManagerPanel } from 'components/windowComponents/groups/GroupsManagerPanel';
import { FriendManagerPanel } from 'components/windowComponents/friends/FriendManagerPanel';
import { MapComponent } from 'components/windowComponents/map/MapComponent';

jest.mock('components/windowComponents/groups/GroupsManagerPanel', () => ({ GroupsManagerPanel: () => { return (<div data-testid="mockGroupManager">Mock</div>) } }))
jest.mock('components/windowComponents/friends/FriendManagerPanel', () => ({ FriendManagerPanel: () => { return (<div data-testid="mockFriendManager">Mock</div>) } }))
jest.mock('components/windowComponents/map/MapComponent', () => ({ MapComponent: () => { return (<div data-testid="mockMapComponent">Mock</div>) } }))


test('renders main page on /home/groups/main', async () => {
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
    })
    let linkElement = screen.getByTestId("mockGroupManager");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockMapComponent");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("groupsTab");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("friendsTab");
    expect(linkElement).toBeInTheDocument();
});

test('renders main page on /home/friends/main', async () => {
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
    })
    let linkElement = screen.getByTestId("mockFriendManager");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockMapComponent");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("groupsTab");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("friendsTab");
    expect(linkElement).toBeInTheDocument();
});

test('renders change on tabs', async () => {
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
    })
    let linkElement = screen.getByTestId("mockGroupManager");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockMapComponent");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("groupsTab");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("friendsTab");
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    linkElement = screen.getByTestId("mockFriendManager");
    expect(linkElement).toBeInTheDocument();
});