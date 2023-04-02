
import LoginView from './views/LoginView';
import './App.css';
import SignupView from './views/SignupView';
import HomeView from './views/HomeView';
import LoggedView from './views/LoggedView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthChecker } from 'auth/AuthChecker';
import { NoFound } from 'views/NoFound';
import HomeViewLogged from 'views/HomeViewLogged';

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={window.sessionStorage.getItem("isLogged") == "true" ? 
                                            <HomeViewLogged /> 
                                            : <HomeView />
                                        } />
                {/* 
                    mainop = [groups/friends]
                    ?op = [groupView (addplace, addgroup, main)/friendName]
                    ?id = [shownGroupName]
                    ?lat = [optional lat to add from map]
                    ?lon = [optional lon to add from map]
                */}
                <Route path='/home/:mainop/:op/:id?/:lat?/:lng?' element={<AuthChecker><LoggedView /></AuthChecker>} />
                <Route path='/login' element={<LoginView />} />
                <Route path='/home' element={<AuthChecker><HomeViewLogged /></AuthChecker>} />
                <Route path='/signup' element={<SignupView />} />
                <Route path='*' element={<NoFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
