import './App.css';
import HomeView from './views/HomeView';
import LoggedView from './views/LoggedView';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthChecker } from 'auth/AuthChecker';
import { NoFound } from 'views/NoFound';
import { AuthPodChecker } from 'auth/AuthPodChecker';
import { AuthCheckerNoLogged } from 'auth/AuthCheckerNoLogged';
import PodView from 'views/PodView';
import { SessionProvider } from "@inrupt/solid-ui-react";
import { useState } from 'react';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { readCookie } from 'utils/CookieReader';
import store from 'utils/redux/store';
import { Provider } from 'react-redux';
import { Signup } from 'components/userIdentification/SignupForm';
import { MainPage } from 'components/mainComponents/MainPage';
import { HomePage } from 'components/mainComponents/HomePage';
import { Login } from 'components/userIdentification/LoginForm';
import { EditProfile } from 'components/profileMenus/EditProfile';
import { EditPassword } from 'components/profileMenus/EditPassword';

function App(): JSX.Element {
    const navigate = useNavigate();
    const [session, setSession] = useState<any>(null)
    if (readCookie("isPodLogged") === "true")
        handleIncomingRedirect({ restorePreviousSession: true }).then((s) => {
            if (s !== undefined) setSession(s)
        })
    return (
        <Provider store={store}>
            <SessionProvider sessionId={session?.sessionId as string}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<AuthCheckerNoLogged><HomeView /></AuthCheckerNoLogged>} >
                            <Route index element={<HomePage />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/login' element={<Login />} />
                        </Route>
                        <Route path='/home' element={<AuthPodChecker><LoggedView /></AuthPodChecker>} >
                            <Route index path='/home/:welcome?' element={ <HomePage /> } />
                            <Route path='/home/edit' element={ <EditProfile /> } />
                            <Route path='/home/edit/psw' element={<EditPassword />} />
                            <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<MainPage />} />
                        </Route>
                        <Route path='/podlogin' element={<AuthChecker><PodView /></AuthChecker>} />
                        <Route path='*' element={<NoFound />} />
                    </Routes>
                </BrowserRouter>
            </SessionProvider>
        </Provider>
    );
}

export default App;
