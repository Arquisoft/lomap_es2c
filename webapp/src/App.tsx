
import LoginView from './views/LoginView';
import './App.css';
import SignupView from './views/SignupView';
import HomeView from './views/HomeView';
import LoggedView from './views/LoggedView';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthChecker } from 'checkers/AuthChecker';
import { NoFound } from 'views/NoFound';
import HomeViewLogged from 'views/HomeViewLogged';
import { AuthPodChecker } from 'auth/AuthPodChecker';
import { AuthCheckerNoLogged } from 'checkers/AuthCheckerNoLogged';
import PodView from 'views/PodView';
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useEffect, useState } from 'react';
import { Session, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { readCookie } from 'utils/CookieReader';
import { parse, stringify } from 'flatted'
import store from 'utils/redux/store';
import { Provider } from 'react-redux';

function App(): JSX.Element {
    const [session, setSession] = useState<any>(null)
    handleIncomingRedirect({ restorePreviousSession: true }).then((s) => {
        if (s !== undefined) setSession(s)
    })
    return (
        <Provider store={store}>
        <SessionProvider sessionId={session?.sessionId as string}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AuthCheckerNoLogged> <HomeView /> </AuthCheckerNoLogged>} />
                    {/* 
                    mainop = [groups/friends]
                    ?op = [groupView (addplace, addgroup, main)/friendName]
                    ?id = [shownGroupName]
                    ?lat = [optional lat to add from map]
                    ?lon = [optional lon to add from map]
                */}
                    <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<AuthPodChecker><LoggedView /></AuthPodChecker>} />
                    <Route path='/login' element={<AuthCheckerNoLogged> <LoginView /></AuthCheckerNoLogged>} />
                    <Route path='/home/:welcome?' element={<AuthPodChecker><HomeViewLogged /></AuthPodChecker>} />
                    <Route path='/signup' element={<AuthCheckerNoLogged> <SignupView /></AuthCheckerNoLogged>} />
                    <Route path='/podlogin' element={<AuthChecker><PodView /></AuthChecker>} />
                    <Route path='*' element={<NoFound />} />
                </Routes>
            </BrowserRouter>
        </SessionProvider>
        </Provider>
    );
}

export default App;
