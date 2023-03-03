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
import Login from '../../src/views/login';
import { Footer } from './Footer';

//#region DEFINICION DE COMPONENTES STYLED
const MyContainer = styled(Container)({
    'background-color': '#388e3c',
    'background-image': 'url("../nobgLogo.png")',
    display: 'flex',
    'flex-direction': 'column',
})

const MyPaper = styled(Paper)({
    'background-color': 'rgba(255, 0, 0, 0.0)',
})

const MyPaper2 = styled(Paper)({
    'background-color': 'rgba(255, 0, 0, 0.0)',
})
//#endregion

export default function container() {
    return (

        //#region COMPONENTE
        <MyContainer disableGutters maxWidth={false}>
            <MyPaper elevation={1}><Header /></MyPaper>
            <Login />
            <MyPaper2 elevation={1}><Footer /></MyPaper2>
        </MyContainer>
        //#endregion

    )
}
