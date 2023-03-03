
import Container from '@mui/material/Container';
import './App.css';
import Login from './views/login';

function App(): JSX.Element {

  return (
    <>
      <Container maxWidth="sm">
        <Login/>
      </Container>
    </>
  );
}

export default App;
