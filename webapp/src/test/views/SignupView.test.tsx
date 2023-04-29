import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import SignupView from 'views/SignupView';

jest.mock('components/userIdentification/SignupForm', () => ({ Signup: () => { return (<div data-testid="mockSignup">Mock</div>) } }))
jest.mock('components/mainComponents/Header', () => ({ Header: () => { return (<div data-testid="mockHeader">Mock</div>) } }))
jest.mock('components/mainComponents/Footer', () => ({ Footer: () => { return (<div data-testid="mockFooter">Mock</div>) } }))

test('login view render login, header and footer', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/signup']} initialIndex={1}>
                <Routes>
                    <Route path="/signup" element={<SignupView />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    let linkElement = screen.getByTestId("mockHeader")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockFooter")
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByTestId("mockSignup");
    expect(linkElement).toBeInTheDocument();
});