import React from 'react'
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '../components/mainComponents/Header';
import { Footer } from '../components/mainComponents/Footer';
import { HomePage } from '../components/mainComponents/HomePage';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import { getUserInSesion } from 'api/api';
import Swal from 'sweetalert2';

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

export default function HomeViewLogged(props: { welcome: string }) {

    const checkwebid = () => {
        Swal.fire("Prueba").then(() => {
            temporalSuccessMessage("La sesión se ha iniciado correctamente. " + getSaludo() + " <em>" + getUserInSesion().username + "</em>.");
        })
    }

    const getSaludo = () => {
        let now = new Date();
        let hours = now.getHours();
        if (hours >= 6 && hours < 8) return "A quién madruga Dios le ayuda";
        if (hours >= 8 && hours < 12) return "Ojalá tenga un buen día";
        if (hours >= 12 && hours < 20) return "Nos complace verle de nuevo";
        if (hours >= 20 || hours == 0) return "Buenas noches, ¿tuvo usted un buen día?,";
        if (hours >= 0 && hours < 6) return "Debería irse a dormir";
    }

    if (props.welcome == "true") {
        checkwebid()
    }

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
