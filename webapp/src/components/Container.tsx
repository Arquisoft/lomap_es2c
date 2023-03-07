import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Paper, StyledComponentProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from './Header';
import Login from './userIdentification/login';
import Signup from './userIdentification/signup';
import { Footer } from './Footer';
import { Sign } from 'crypto';
import { HomePage } from './HomeContainer';

//#region DEFINICION DE COMPONENTES STYLED
const MyContainer = styled(Container)({
    backgroundImage: 'url("../background.png")',
    backgroundPosition: 'center',
    backgroundSize: '95%',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#17261E',
    minHeight: '100vh',
    alignContent: 'center',
    justifyContent: 'space-between',
})

const MyPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
})

const MyPaper2 = styled(Paper)({
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
})
//#endregion

export default function container() {
    return (

        //#region COMPONENTE
        <MyContainer disableGutters maxWidth={false}>
            <MyPaper elevation={1}><Header /></MyPaper>
            <Signup />
            <MyPaper2 elevation={1}><Footer /></MyPaper2>
        </MyContainer>
        //#endregion

    )
}
