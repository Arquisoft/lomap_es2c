import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../../components/mainComponents/Header'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { AuthCheckerNoLogged } from 'checkers/AuthCheckerNoLogged';
import { HomePage } from 'components/mainComponents/HomePage';
import { AuthPodChecker } from 'auth/AuthPodChecker';

jest.mock('components/mainComponents/HomePage', () => ({ HomePage: () => { return (<div data-testid="mockHomePage">Mock</div>) } }))

afterEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
    });
});

test('renders generic header', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Header logged={false} />
            </BrowserRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("imgLogo");
    expect(linkElement).toBeInTheDocument();
});

test('renders no logged header', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Header logged={false} />
            </BrowserRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("defaultImg");
    expect(linkElement).toBeInTheDocument();
});

test('renders logged header', () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""} ; path=/ ;' +
            'isLogged=true; path=/ ;' +
            'isPodLogged=true; path=/ ;',
    });

    render(
        <Provider store={store}>
            <BrowserRouter>
                <Header logged={true} />
            </BrowserRouter>
        </Provider>
    );
    const linkElement = screen.getByTestId("userProfileImg");
    expect(linkElement).toBeInTheDocument();
});

test('header redirects homePage while logged', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession={"username":"test","webID":"test","password":""}; path=/;' +
            'isLogged=true; path=/;' +
            'isPodLogged=true; path=/;',
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Header logged={true} />} />
                    <Route path='/home' element={<AuthPodChecker><HomePage /></AuthPodChecker>} />
                    <Route path='/' element={<AuthCheckerNoLogged><HomePage /></AuthCheckerNoLogged>} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("goHomeButton");
    fireEvent.click(linkElement);
    linkElement = await screen.findByTestId("mockHomePage");
    expect(linkElement).toBeInTheDocument();
})

test('header redirects homePage while no logged', async () => {

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'userInSession=; path=/;' +
            'isLogged=; path=/;' +
            'isPodLogged=; path=/;',
    });

    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/header']} initialIndex={1}>
                <Routes>
                    <Route path='/header' element={<Header logged={false} />} />
                    <Route path='/home' element={<AuthPodChecker><HomePage /></AuthPodChecker>} />
                    <Route path='/' element={<AuthCheckerNoLogged><HomePage /></AuthCheckerNoLogged>} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("goHomeButton");
    fireEvent.click(linkElement);
    linkElement = await screen.findByTestId("mockHomePage");
    expect(linkElement).toBeInTheDocument();
})