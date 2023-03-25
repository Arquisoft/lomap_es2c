
import LoginView from './views/LoginView';
import './App.css';
import SignupView from './views/SignupView';
import HomeView from './views/HomeView';
import LoggedView from './views/LoggedView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeView />} />
                <Route path='/home/:op/:lat?/:lon?' element={<LoggedView />} />
                <Route path='/login' element={<LoginView />} />
                <Route path='/signup' element={<SignupView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
