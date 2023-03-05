import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Swal from "sweetalert2"
import "../App.css";
import { styled } from '@mui/material/styles';
import uuid from 'react-uuid';
import { useState } from 'react';
import { Factory, User } from '../domain/facade';
import { LogedMenu } from './LogedMenu';
import { NoLogedMenu } from './NoLogedMenu';

//#region DEFINICION DE COMPONENTES STYLED
const ButtonGENERIC = styled(Button)({
    padding: '1.5em 5em 1.5em',
    color: 'white',
    justifySelf: 'right',
    font: '1em Calibri',
    '&:hover': {
        outline: 'none',
        backgroundColor: '#1f4a21',
    },
});

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
})
//#endregion

export function Header() {

    //#region METODOS DE CLASE

    const goHome = () => {
        //redirect to main page
    };

    //#endregion

    return (

        //#region COMPONENTE 
        <MyBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ButtonHOME
                        key={uuid()}
                        onClick={goHome}
                    >
                        <img id="imgLogo" src="../nobgLogo.png"></img>
                    </ButtonHOME>
                    <BoxNAV>
                        <ButtonGENERIC
                            key={uuid()}
                        >
                            LOGIN
                        </ButtonGENERIC>
                        <ButtonGENERIC
                            key={uuid()}
                        >
                            SING UP
                        </ButtonGENERIC>
                    </BoxNAV>
                    <NoLogedMenu />
                </Toolbar>
            </Container>
        </MyBar>
        //#endregion

    );

}
