import React from 'react'
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '../components/mainComponents/Header';
import { Footer } from '../components/mainComponents/Footer';
import { useSession } from "@inrupt/solid-ui-react";
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import { editUserDetails, getMyFriends, getUserInSesion, logout } from '../api/api';
import { User } from 'shared/shareddtypes';
import Swal from 'sweetalert2';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { readCookie } from 'utils/CookieReader';
import { useDispatch } from 'react-redux';
import { setProfileImage } from 'utils/redux/action';
import { obtenerFoto } from 'podManager/MapManager';
import { deleteFriendApi } from '../api/api';

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

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { welcome } = useParams();
    const { session } = useSession();


    const profileImageUrl = async () => {
        return await obtenerFoto(session.info.webId);
    }

    if (session.info.webId) {
        document.cookie = "userWebId=" + session.info.webId + "; path=/"
    }

    React.useEffect(() => {
        if (welcome && readCookie("sameWebId") !== "true" && session.info.webId)
            checkWebId();
        const fetchImgUrl = async () => {
            const url = await profileImageUrl();
            dispatch(setProfileImage(url))
        };
        if (session.info?.webId !== undefined)
            fetchImgUrl();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session.info.webId]);


    const getSaludo = () => {
        let now = new Date();
        let hours = now.getHours();
        if (hours >= 6 && hours < 8) return "A quién madruga Dios le ayuda";
        if (hours >= 8 && hours < 12) return "Ojalá tenga un buen día";
        if (hours >= 12 && hours < 20) return "Nos complace verle de nuevo";
        if (hours >= 20 || hours === 0) return "Buenas noches, ¿tuvo usted un buen día?,";
        if (hours >= 0 && hours < 6) return "Debería irse a dormir";
    }

    const saludo = () => {
        let user: User = getUserInSesion();
        temporalSuccessMessage("La sesión se ha iniciado correctamente. " + getSaludo() + " <em>" + user.username + "</em>.");
    }

    const checkWebId = () => {
        let user: User = getUserInSesion();
        setTimeout(() => {
            if (user.webID !== readCookie("userWebId")) {
                Swal.fire({
                    title: "Actualizar webId",
                    text: "El webId con el que has iniciado sesión no coincide con el vinculado a su perfil, ¿desea actualizarlo?. De actualizarlo perderá todas sus amistades y grupos.",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#81c784',
                    cancelButtonColor: 'grey',
                    confirmButtonText: 'Actualizar',
                    cancelButtonText: 'Cerrar sesión'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let updatedUser: User = user;
                        updatedUser.webID = session.info.webId;
                        editUserDetails(updatedUser);
                        eliminarAmigos(user);
                        saludo();
                    } else {
                        logout(); navigate("/login")
                    }
                })
            } else {
                saludo(); document.cookie = "sameWebId=true; path=/"
            }
        }, 3000);
    }

    const eliminarAmigos = (user: any) => {
        getMyFriends(user).then(friends => {
            for (let i = 0; i < friends.length; i++) {
                deleteFriendApi(friends[i]);
            }
        })
    }

    return (

        //#region COMPONENTE
        <MyContainer disableGutters maxWidth={false}>
            <MyPaper elevation={1}><Header logged={true} /></MyPaper>
            <Outlet />
            <MyPaper2 elevation={1}><Footer /></MyPaper2>
        </MyContainer>
        //#endregion

    )
}