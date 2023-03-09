import React, { useState } from 'react'
import Container from '@mui/material/Container';
import { Paper, StyledComponentProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HomePage } from '../components/HomePage';

//#region DEFINICION DE COMPONENTES STYLED
const MyContainer = styled(Container)({
    backgroundImage: 'url("../background.png")',
    backgroundPosition: 'center',
    backgroundSize: '95%',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
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

export default function LoggedView() {

    return (

        //#region COMPONENTE
        <MyContainer disableGutters maxWidth={false}>
            <MyPaper elevation={1}><Header logged={true} /></MyPaper>
            <HomePage />
            <MyPaper2 elevation={1}><Footer /></MyPaper2>
        </MyContainer>
        //#endregion

    )
}
