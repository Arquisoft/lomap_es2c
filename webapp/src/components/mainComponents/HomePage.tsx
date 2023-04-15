import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ImgCarrusel from './ImgCarrusel';
import { getMyFriendRequests, getUserInSesion } from 'api/api';
import { temporalErrorMessage, temporalSuccessMessage } from 'utils/MessageGenerator';
import { User } from 'shared/shareddtypes';
import { showError } from 'utils/fieldsValidation';

//#region DEFINICION DE COMPONENTES STYLED
const HomeContainer = styled(Container)({
    display: 'grid',
    gridTemplateColumns: 'repeat(5,1fr)',
    gridTemplateRows: 'repeat(4,1fr)',
    margin: '2.5em',
    rowGap: '2em',
    columnGap: '3em',
    textAlign: 'center',
})

const TextBox = styled(Box)({
    gridColumn: '1/4',
    gridRow: '1/5',
    justifySelf: 'center',
    alignSelf: 'center',
    color: "white",
    fontFamily: 'Calibri',
    fontWeight: 'lighter',
    fontSize: '1.1em',
    backgroundColor: '#81c784',
    width: '100%',
    height: '100%',
    margin: '0em 0.5em 0em',
    padding: '0em 1em 0em',
    textAlign: 'justify',
    paddingTop: '0.85em',
})

const InfoBox = styled(Box)({
    gridColumn: '4/6',
    gridRow: '1/5',
    justifySelf: 'center',
    alignSelf: 'center',
    color: "white",
    fontFamily: 'Calibri',
    fontWeight: 'lighter',
    fontSize: '1em',
    backgroundColor: '#81c784',
    width: '100%',
    height: '100%',
    textAlign: 'justify',
    paddingTop: '0.85em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
})

const MainBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})

const ScrollBox = styled(Box)({
    maxHeight: '50vh',
    overflow: 'auto',
    scrollbarColor: '#81c784 white',
    padding: '0em 0.9em 0em',
})

const TitleBox = styled(Box)({
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: '1.2em'
})

const GoButton = styled(Button)({
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#1f4a21',
    color: 'white',
    marginBottom: '0.4em',
    '&:hover': {
        backgroundColor: '#1f4a21',
        color: 'white',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        color: 'white',
        backgroundColor: '#1f4a21',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem #1f4a21',
    },
})
//#endregion

export function HomePage() {

    const navigate = useNavigate();

    const goSignup = () => {
        navigate("/signup")
    }

    const goMain = () => {
        navigate("/home/groups/main")
        if (getUserInSesion() != null) {
            checkRequests(getUserInSesion())
        }
    }

    const checkRequests = (user: User) => {
        getMyFriendRequests(user).then((reqs) => {
            if (reqs.length > 0) temporalSuccessMessage("Tienes " + reqs.length + " solicitudes de amistad pendientes. ¡Echales un ojo!");
        }).catch((err: any) => {
            temporalErrorMessage("Error listando tus solicitudes de amistad. Algo va mal... Contacta con nosotros si sigue así.")
        })
    }

    return (

        //#region COMPONENTE
        <MainBox>
            <HomeContainer>
                <TextBox>
                    <img src="../logoCompleto.png"></img>
                    <p>Bienvenido a LoMap, la aplicación que te permite organizar tu vida alrededor de los lugares que más te gustan.</p>
                    <p>En nuestra aplicación podrás guardar todos los lugares que te gustan, te relajan y te encanta visitar una y otra vez. ¿Acabas de comer en el restaurante nuevco de la ciudad?,
                        ¿descubriste un mirador al que necesitas ir con tu amor platónico?, ¿te has enamorado de la camarera de ese bar y necesitas volver?,
                        Añade todos los lugares que quieras en LoMap y organizalos en los grupos que prefieras para tener toda tu vida a un solo click.</p>
                    <p>Podrás añadir comentarios a cada lugar, fotos para recordar lo maravillosos que eran. Puedes añadir a tus amigos y compartir con ellos esos lugares
                        a los que siempre se te olvida llevarles. No dudes, crea tu cuenta <a id="homeA" onClick={goSignup}>aquí</a> de forma gratuita y disfruta de nuestra aplicación.
                    </p>
                </TextBox>
                <InfoBox>
                    <TitleBox>
                        Descubre LoMap
                    </TitleBox>
                    <ScrollBox>
                        <ImgCarrusel />
                    </ScrollBox>
                    <GoButton onClick={() => goMain()}>
                        ¡Adelante!
                    </GoButton>
                </InfoBox>
            </HomeContainer >
        </MainBox>
        //#endregion

    )
}
