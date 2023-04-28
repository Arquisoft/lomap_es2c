import "@inrupt/jest-jsdom-polyfills";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NoLoggedMenu } from "components/profileMenus/NoLoggedMenu";
import { Login } from "components/userIdentification/LoginForm";
import { Signup } from "components/userIdentification/SignupForm";

jest.mock('components/userIdentification/LoginForm', () => ({ Login: () => { return (<div data-testid="mockLogin">Mock</div>) } }))
jest.mock('components/userIdentification/SignupForm', () => ({ Signup: () => { return (<div data-testid="mockSignup">Mock</div>) } }))

test('renders no logged menu', async () => {

    await act(async () => {
        render(
            <MemoryRouter>
                <NoLoggedMenu />
            </MemoryRouter>
        );
    })
    let linkElement = screen.getByTestId("defaultImg");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("noLoggedPopupButton");
    expect(linkElement).toBeInTheDocument();
})

test('show no logged popup menu', async () => {

    await act(async () => {
        render(
            <MemoryRouter>
                <NoLoggedMenu />
            </MemoryRouter>
        );
    })
    let linkElement = screen.getByTestId("noLoggedPopupButton");
    fireEvent.click(linkElement)
    linkElement = screen.getByTestId("signupButton");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("loginButton");
    expect(linkElement).toBeInTheDocument();
})

test('redirect login', async () => {

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/home']} initialIndex={1}>
                <Routes>
                    <Route path='/home' element={<NoLoggedMenu />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/login' element={<Signup />} />
                </Routes>

            </MemoryRouter>
        );
    })
    let linkElement = screen.getByTestId("noLoggedPopupButton");
    fireEvent.click(linkElement)
    linkElement = screen.getByTestId("loginButton");
    fireEvent.click(linkElement);
    linkElement = await screen.findByTestId("mockLogin");
    expect(linkElement).toBeInTheDocument();
})

test('redirect login', async () => {

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/home']} initialIndex={1}>
                <Routes>
                    <Route path='/home' element={<NoLoggedMenu />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>

            </MemoryRouter>
        );
    })
    let linkElement = screen.getByTestId("noLoggedPopupButton");
    fireEvent.click(linkElement)
    linkElement = screen.getByTestId("signupButton");
    fireEvent.click(linkElement);
    linkElement = await screen.findByTestId("mockSignup");
    expect(linkElement).toBeInTheDocument();
})