import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearMarkers, clearFriendsMarkers } from 'utils/redux/action';

const ErrorBox = styled(Box)({
    padding: "2em 7em 2em",
    backgroundColor: "#81c784",
    width: "60vw",
    height: "55vh",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    color: "white",
})

const TitleBox = styled(Box)({
    fontSize: "3em",
    alignSelf: "center",
    padding: "0.5em"
})

const TextBox = styled(Box)({
    fontSize: "1em",
    alignSelf: "center",
})

export const ErrorPage = () => {

    const dispatch = useDispatch();
    dispatch(clearMarkers());
    dispatch(clearFriendsMarkers());

    const location = useLocation();
    return (
        <ErrorBox>
            <TitleBox>
                Error 404: Página {location.pathname} no encontrada
            </TitleBox>
            <TextBox>
                Disculpamos las molestias pero la página a la que acaba de intentar acceder no existe o no se encuentra disponible. Vuelva al menú principal calcando <a href="/">aquí</a> o contacte con nosotros mediante nuestro GitHub proporcionado en el pie de la página. ¡Gracias por la compresión!
            </TextBox>
        </ErrorBox>
    )
}
