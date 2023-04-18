import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import "../../App.css";
import { styled } from '@mui/material/styles';
import uuid from 'react-uuid';
import LogedMenu from '../profileMenus/LoggedMenu';
import { NoLogedMenu } from '../profileMenus/NoLoggedMenu';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearMarkers } from 'utils/redux/action';

//#region DEFINICION DE COMPONENTES STYLED

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const ButtonHOME = styled(Button)({
    padding: '0em 0em 0em 0em',
    color: 'white',
    display: 'block',
    font: '1em Calibri',
    '&:focus': {
        outline: 'none',
        boxShadow: 'none',
    },
    '&:hover': {
        backgroundColor: '#81c784',
    },
    '&:active': {
        backgroundColor: '#81c784',
    },
});

const BoxNAV = styled(Box)({
    margin: '0em 0em 0em',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'right',
});

const MyBar = styled(AppBar)({
    background: '#81c784',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
})

const MyToolbar = styled(Toolbar)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
})
//#endregion

export function Header(props: { logged: boolean }) {

    //#region HOOKS
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //#endregion

    //#region METODOS DE CLASE

    const goHome = () => {
        if (props.logged == true) {
            dispatch(clearMarkers());
            navigate("/home");
        } else {
            navigate("/");
        }
    };

    const getMode = () => {
        if (props.logged) {
            return (<LogedMenu />)
        }
        else {
            return (<NoLogedMenu />)
        }
    }

    //#endregion

    return (

        //#region COMPONENTE 
        <MyBar position="static">
            <Container maxWidth="xl">
                <MyToolbar disableGutters>
                    <ButtonHOME
                        key={uuid()}
                        onClick={goHome}
                    >
                        <img id="imgLogo" src="nobgLogo.png"></img>
                    </ButtonHOME>
                    <VerticalDivider orientation='vertical' flexItem />
                    <BoxNAV>
                    </BoxNAV>
                    {getMode()}
                </MyToolbar>
            </Container>
        </MyBar >
        //#endregion

    );

}
