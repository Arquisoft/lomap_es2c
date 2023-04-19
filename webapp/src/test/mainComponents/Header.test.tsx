import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/mainComponents/Header'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';

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
            'isLogged=true ; path=/ ;' +
            'isPodLogged=true ; path=/ ;',
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