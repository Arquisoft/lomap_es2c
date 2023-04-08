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
import { useNavigate } from 'react-router-dom';
import { editPassword, editUserDetails, getMyFriendRequests, getUserInSesion, logout, searchUserByUsername } from '../../api/api';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import * as fieldsValidation from '../../utils/fieldsValidation';
import { handleErrors } from 'api/ErrorHandler';
import { User } from 'shared/shareddtypes';
import { NotificationManager, temporalInfoMessage, temporalSuccessMessage } from 'utils/MessageGenerator';
import { Divider } from '@mui/material';

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
function LogedMenu() {


    const passwordSchema = fieldsValidation.passwordValidation;

    const editSchema = fieldsValidation.editProfileValidation;

    const [userInSession, setUser] = useState(getUserInSesion().username)


    //#region METODOS DE CLASE

    const getProfile = async () => {
        closeUserMenu();
        let user = await searchUserByUsername(userInSession);
        console.log("loooog")
        Swal.fire({
            title: 'Mi perfil',
            html: ` <label for="webid-gp" class="swal2-label">WebID: </label>
                    <input type="text" id="webid-gp" class="swal2-input" disabled placeholder=` + user.webID + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="5" id="biography-gp" class="swal2-input" disabled placeholder="` + (user.description ? user.description : "Escribe una descripción") + `"></textarea>`,
            confirmButtonText: 'Editar perfil',
            confirmButtonColor: '#81c784',
            focusConfirm: false,
            imageUrl: url,
            imageWidth: 'auto',
            imageHeight: 200,
            imageAlt: 'Foto de perfil actual',
        }).then((result) => {
            if (result.isConfirmed) {
                showEditNoPss();
            }
        })
    }


    const showQuestion = () => {
        Swal.fire({
            title: "Cancelar edición",
            text: "No se ha realizado ningún cambio. ¿Desea abandonar la edición del perfil?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#81c784',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Salir sin editar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.close();
            } else {
                showEditNoPss()
            }
        })
    }

    async function showEdit(): Promise<void> {
        closeUserMenu();
        let oldpsw: string;
        let newpsw: string;
        Swal.fire({
            title: 'Cambiar contraseña',
            html: `<label for="opassword-ep" class="swal2-label">Contraseña actual: </label>
                    <input type="password" id="opassword-ep" class="swal2-input" placeholder="Contraseña actual" {...register("password")}>
                    <label for="password-ep" class="swal2-label">Nueva contraseña: </label>
                    <input type="password" id="password-ep" class="swal2-input" placeholder="Nueva contraseña" {...register("password")}>
                    <label for="rpassword-ep" class="swal2-label">Confirmar nueva contraseña: </label>
                    <input type="password" id="rpassword-ep" class="swal2-input" placeholder="Confirmar contraseña"> 
                    `,

            confirmButtonText: 'Cambiar contraseña',
            denyButtonText: 'Volver',
            confirmButtonColor: '#81c784',
            denyButtonColor: 'grey',
            showDenyButton: true,
            focusConfirm: false,
            preConfirm: async () => {
                let pass = (Swal.getPopup().querySelector('#password-ep') as HTMLInputElement).value

                passwordSchema.validate({ password: pass }).then(() => {

                    let confirmPass = (Swal.getPopup().querySelector('#rpassword-ep') as HTMLInputElement).value

                    if (fieldsValidation.checkPasswords(pass, confirmPass)) {
                        let oldPassword = (Swal.getPopup().querySelector('#opassword-ep') as HTMLInputElement).value
                        oldpsw = oldPassword;
                        newpsw = pass;
                    }
                    else {
                        fieldsValidation.showError("No se ha podido actualizar la contraseña", "Las contraseñas no coinciden", showEdit);

                    }
                }).catch(e => {

                    let errorMessage = (e as string)
                    fieldsValidation.showError("No se ha podido actualizar la contraseña", errorMessage, showEdit);
                })

            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleErrors(() => editPassword(oldpsw, newpsw), () => {
                    Swal.close();
                })
                temporalSuccessMessage("Contraseña editada correctamente.")
            } else if (result.isDenied) {
                showEditNoPss();
            }
        })
    }

    async function showEditNoPss(): Promise<void> {
        closeUserMenu();
        let edited = true;
        let user = await searchUserByUsername(userInSession);
        Swal.fire({
            title: 'Edita tu perfil',
            html: ` 
                    <label for="biagraphy-ep" class="swal2-label">Biografía: </label>
                    <textarea rows="5" id="biography-ep" class="swal2-input" placeholder="` + (user.description ? user.description : "Escribe una descripción") + `"></textarea>`,
            confirmButtonText: 'Editar',
            denyButtonText: 'Cambiar contraseña',
            showDenyButton: true,
            confirmButtonColor: '#81c784',
            denyButtonColor: 'grey',
            focusConfirm: false,
            imageUrl: url,
            imageWidth: 'auto',
            imageHeight: 200,
            imageAlt: 'Foto de perfil actual',
            preConfirm: () => {
                let biography = (Swal.getPopup().querySelector('#biography-ep') as HTMLInputElement).value

                if (!biography) {
                    edited = false;
                    showQuestion();
                } else {
                    edited = true;
                    if (!biography)
                        biography = "..."; // Cambiarlo por user.biography

                    editSchema.validate({
                        biography: biography
                    }).then(() => {
                        user = { username: user.username, webID: user.webID, password: user.password, description: biography, img: user.img }
                        return user;
                    }).catch(e => {
                        let errorMessage = (e as string)
                        fieldsValidation.showError("No se ha podido actualizar el perfil", errorMessage, showEditNoPss);
                    })
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed && edited) {
                await editUserDetails(user)
                temporalSuccessMessage("Tú perfil se ha editado correctamente. La nueva biografía te sienta mejor.");
            } else if (result.isDenied) {
                showEdit();
            }
        })
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
        if (hours >= 20 || hours == 0) return "Buenas noches, que duerma usted bien";
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
    const [url, setUrl] = useState("testUser.jfif");
    const [username, setUsername] = useState<String>("");
    //#endregion


    return (

        //#region COMPONENTE
        <BoxProfile>
            <NotificationManager />
            <VerticalDivider orientation='vertical' flexItem />
            <LoginInformation name={userInSession} />
            <Tooltip title="Open settings">
                <IconButton onClick={openUserMenu} sx={{ padding: 0 }}>
                    <Avatar alt="Remy Sharp" src={url} />
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
                <MenuItem key={uuid()} onClick={getProfile}>
                    <PersonIcon /> Profile
                </MenuItem>
                <MenuItem key={uuid()} onClick={showEditNoPss}>
                    <EditIcon /> Edit profile
                </MenuItem>
                <MenuItem key={uuid()} onClick={() => goLogout(getUserInSesion())}>
                    <LogoutIcon /> Logout
                </MenuItem>
            </MyMenu>
        </BoxProfile>
        //#endregion 

    )
}

export default LogedMenu;
