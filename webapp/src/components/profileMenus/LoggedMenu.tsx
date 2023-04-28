import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import "../../App.css";
import { styled } from '@mui/material/styles';
import uuid from 'react-uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserInSesion, logout, searchUserByUsername } from 'api/api';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from 'shared/shareddtypes';
import { NotificationManager, temporalSuccessMessage } from 'utils/MessageGenerator';
import { Divider } from '@mui/material';
import { showError } from '../../utils/fieldsValidation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'utils/redux/store';
import { setLastPath } from 'utils/redux/action';

//#region DEFINICION DE COMPONENTES STYLED

const BoxProfile = styled(Box)({
    padding: '0em 1em 0em',
    display: 'flex',
    flexDirection: 'row',
    columnGap: '2em'
})

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const MyMenu = styled(Menu)({
    marginTop: '3em',
})

//#endregion

//#region DEFINICION DE COMPONENTES PERSONALIZADOS

function LoginInformation(props: any) {
    return <b><p>{props.name}</p></b>;
}
//#endregion
export function LoggedMenu() {

    const location = useLocation();
    const { pathname } = location;
    const dispatch = useDispatch();

    const userInSession = getUserInSesion().username

    const imgUrl = useSelector((state: RootState) => state.user.imgUrl);

    //#region METODOS DE CLASE

    const getProfile = async () => {
        closeUserMenu();
        let imgHtml = ` <img id="profileImageLM" src="defaultUser2.png" alt="Foto de perfil" >`;
        if (imgUrl !== null) {
            imgHtml = ` <img id="profileImagePodLM" src= ` + imgUrl + ` alt="Foto de perfil" crossOrigin="anonymous" />`
        }
        await searchUserByUsername(userInSession).then((user) => {
            Swal.fire({
                html: imgHtml + `</br>
                        <h2> ` + user.username + ` </h2> 
                        <label data-testid="profileInfo" for="webid-gp" class="swal2-label">WebID: </label>
                        <input type="text" id="webid-gp" class="swal2-input" disabled placeholder=` + user.webID + `>
                        <label for="biography-gp" class="swal2-label">Biografía: </label>
                        <textarea rows="5" id="biography-gp" class="swal2-input" disabled placeholder="` + (user.description ? user.description : "Escribe una descripción") + `"></textarea>`,
                confirmButtonText: 'Editar perfil',
                confirmButtonColor: '#81c784',
                focusConfirm: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    showEdit();
                    closeUserMenu();
                }
            })
        }
        ).catch((err: any) => {
            showError("Error al mostrar tú perfil", err.toString(), Swal.close);
        });
    }



    async function showEdit() {
        closeUserMenu();
        dispatch(setLastPath(pathname))
        navigate("/home/edit");
    }

    const goLogout = (user: User) => {
        closeUserMenu();
        logout();
        navigate("/");
        temporalSuccessMessage("La sesión se ha cerrado correctamente. " + getDespedida() + " <em>" + user.username + "</em>.");
    }

    const getDespedida = () => {
        let now = new Date();
        let hours = now.getHours();
        if (hours >= 6 && hours < 8) return "Hasta luego, qué tenga usted un buen día";
        if (hours >= 8 && hours < 12) return "Le echaremos de menos, ojalá verle de vuelta";
        if (hours >= 12 && hours < 20) return "Adiós, o como dirían los italianos <em>chao</em>";
        if (hours >= 20 || hours === 0) return "Buenas noches, que duerma usted bien";
        if (hours >= 0 && hours < 6) return "¿Qué hacía todavía despierto? Buenas noches";
    }

    const closeUserMenu = () => {
        setAnchorElUser(null);
    };

    const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    //#endregion

    //#region HOOKS
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement>(null);
    //#endregion


    return (

        //#region COMPONENTE
        <BoxProfile>
            <NotificationManager />
            <VerticalDivider orientation='vertical' flexItem />
            <LoginInformation name={userInSession} />
            <Tooltip title="Open settings">
                <IconButton data-testid="profileMenuButton" onClick={openUserMenu} sx={{ padding: 0 }}>
                    {imgUrl !== null ?
                        <Avatar data-testid="userProfileImg" >
                            <img id="profileImagePod" src={imgUrl} alt="Foto de perfil del usuario" crossOrigin="anonymous" />
                        </Avatar>
                        :
                        <Avatar data-testid="userProfileImg" alt="Foto de perfil del usuario" src="defaultUser.png" />
                    }
                </IconButton>
            </Tooltip>
            <MyMenu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={closeUserMenu}
            >
                <MenuItem data-testid="getProfileButton" key={uuid()} onClick={getProfile}>
                    <PersonIcon /> Profile
                </MenuItem>
                <MenuItem data-testid="showEditButton" key={uuid()} onClick={showEdit}>
                    <EditIcon /> Edit profile
                </MenuItem>
                <MenuItem data-testid="logoutButton" key={uuid()} onClick={() => goLogout(getUserInSesion())}>
                    <LogoutIcon /> Logout
                </MenuItem>
            </MyMenu>
        </BoxProfile>
        //#endregion 

    )
}