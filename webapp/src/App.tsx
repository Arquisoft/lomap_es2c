
import LoginView from './views/LoginView';
import './App.css';
import SignupView from './views/SignupView';
import HomeView from './views/HomeView';
import LoggedView from './views/LoggedView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthChecker } from 'auth/AuthChecker';
import { NoFound } from 'views/NoFound';
import HomeViewLogged from 'views/HomeViewLogged';
import { AuthCheckerNoLogged } from 'auth/AuthCheckerNoLogged';
import { AuthPodChecker } from 'auth/AuthPodChecker';
import PodView from 'views/PodView';
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { Provider } from 'react-redux';
import store from 'utils/redux/store';

function App(): JSX.Element {
    const { session } = useSession(); 
    return (
        <Provider store={store}>
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
