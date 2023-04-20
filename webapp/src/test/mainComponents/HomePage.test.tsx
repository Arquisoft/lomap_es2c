import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { HomePage } from 'components/mainComponents/HomePage';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from 'components/mainComponents/MainPage';

jest.mock('components/windowComponents/groups/GroupsManagerPanel', () => ({ GroupsManagerPanel: () => { return (<div data-testid="mockGroupManager">Mock</div>) } }))
jest.mock('components/windowComponents/map/MapComponent', () => ({ MapComponent: () => { return (<div data-testid="mockMapComponent">Mock</div>) } }))


test('renders home page', () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    let linkElement = screen.getByTestId("mainPageLogo");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("titleLoMap");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("imgCarruselScroll");
    expect(linkElement).toBeInTheDocument();
});

test('click button "Adelante"', () => {
    render(
        <MemoryRouter initialEntries={['/home']} initialIndex={1}>
            <Routes>
                <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<div data-testid="mainPageMock">Mock Main Page</div>} />
                <Route path='/home/:welcome?' element={<HomePage />} />
                <Route path='/signup' element={<div data-testid="signupMock">Mock Signup</div>} />
            </Routes>
        </MemoryRouter>
    );
    let linkElement = screen.getByTestId("mainButton");
    fireEvent.click(linkElement);
    linkElement = screen.getByTestId("mainPageMock");
    expect(linkElement).toBeInTheDocument();
});

test('click link "aquí" to signup', () => {
    render(
        <MemoryRouter initialEntries={['/home']} initialIndex={1}>
            <Routes>
                <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<div data-testid="mainPageMock">Mock Main Page</div>} />
                <Route path='/home/:welcome?' element={<HomePage />} />
                <Route path='/signup' element={<div data-testid="signupMock">Mock Signup</div>} />
            </Routes>
        </MemoryRouter>
    );
    let linkElement = screen.getByTestId("signupLink");
    fireEvent.click(linkElement);
    linkElement = screen.getByTestId("signupMock");
    expect(linkElement).toBeInTheDocument();
});