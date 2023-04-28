import "@inrupt/jest-jsdom-polyfills";
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { AuthChecker } from 'auth/AuthChecker';
import { Login } from 'components/userIdentification/LoginForm';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { act } from 'react-dom/test-utils';
import { AuthCheckerNoLogged } from 'auth/AuthCheckerNoLogged';
import { AuthPodChecker } from 'auth/AuthPodChecker';
import { HomePage } from 'components/mainComponents/HomePage';
import { MainPage } from 'components/mainComponents/MainPage';
import { Signup } from 'components/userIdentification/SignupForm';
import HomeView from 'views/HomeView';
import LoggedView from 'views/LoggedView';
import { NoFound } from 'views/NoFound';
import PodView from 'views/PodView';
import { MapComponent } from 'components/windowComponents/map/MapComponent';

jest.mock('components/userIdentification/LoginForm', () => ({ Login: () => { return (<div data-testid="mockLogin">Mock</div>) } }))
jest.mock('components/userIdentification/SignupForm', () => ({ Signup: () => { return (<div data-testid="mockSignup">Mock</div>) } }))

test('check renders map component', async () => {
    await act(async () => {
        render(
            <Provider store={store}>
                <SessionProvider sessionId="">
                    <MemoryRouter>
                        <Routes>
                            <Route index element={<MapComponent />} />
                            <Route path='/home/groups/addplace/:id?/:lat?/:lng?' element={
                                <>
                                    <div data-testid='mockAddplaceform'>Mock</div>
                                    <MapComponent />
                                </>
                            } />
                            <Route path='/home/groups/showplace/:id?/:lat?/:lng?' element={
                                <>
                                    <div data-testid='mockShowplace'>Mock</div>
                                    <MapComponent />
                                </>
                            } />
                            <Route path='/home/friends/showplace/:id?/:lat?/:lng?' element={
                                <>
                                    <div data-testid='mockShowFriendplace'>Mock</div>
                                    <MapComponent />
                                </>
                            } />
                        </Routes>
                    </MemoryRouter>
                </SessionProvider>
            </Provider>
        );
    });
    let linkElement = screen.getByText("Leyenda");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText("OpenStreetMap");
    expect(linkElement).toBeInTheDocument();
});
