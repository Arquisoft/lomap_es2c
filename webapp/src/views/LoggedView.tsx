import React from 'react'
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '../components/mainComponents/Header';
import { Footer } from '../components/mainComponents/Footer';
import { MainPage } from '../components/mainComponents/MainPage';

//#region DEFINICION DE COMPONENTES STYLED
const MyContainer = styled(Container)({
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

export default function LoggedView(props: { session: () => any }) {

    return (
        //#region COMPONENTE
        <MyContainer disableGutters maxWidth={false}>
            <MyPaper elevation={1}><Header logged={true} /></MyPaper>
            <MainPage session={props.session} />
            <MyPaper2 elevation={1}><Footer /></MyPaper2>
        </MyContainer>
        //#endregion

    )
}
