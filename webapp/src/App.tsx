
import LoginView from './views/LoginView';
import './App.css';
import SignupView from './views/SignupView';
import HomeView from './views/HomeView';
import LoggedView from './views/LoggedView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthChecker } from 'checkers/AuthChecker';
import { NoFound } from 'views/NoFound';
import HomeViewLogged from 'views/HomeViewLogged';
import { AuthPodChecker } from 'auth/AuthPodChecker';
import { AuthCheckerNoLogged } from 'checkers/AuthCheckerNoLogged';
import PodView from 'views/PodView';
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useState } from 'react';
import flatted from 'flatted';

function App(): JSX.Element {
    let session: any = null;
    const setSession = (s: any) => {
        session = s;
        //window.localStorage.setItem("session", flatted.stringify(session))
        console.log("App")
        console.log(s)
    }
    const getSession = (): any => {
        console.log("get")
        console.log(session)
        return session
    }
    return (
        <SessionProvider sessionId={session?.info.sessionId as string}>
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
                    <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<AuthPodChecker><LoggedView session={getSession} /></AuthPodChecker>} />
                    <Route path='/login' element={<AuthCheckerNoLogged> <LoginView /></AuthCheckerNoLogged>} />
                    <Route path='/home/:welcome?' element={<AuthPodChecker><HomeViewLogged setSession={setSession} /></AuthPodChecker>} />
                    <Route path='/signup' element={<AuthCheckerNoLogged> <SignupView /></AuthCheckerNoLogged>} />
                    <Route path='/podlogin' element={<AuthChecker><PodView /></AuthChecker>} />
                    <Route path='*' element={<NoFound />} />
                </Routes>
            </BrowserRouter>
        </SessionProvider>
    );
}

export default App;
