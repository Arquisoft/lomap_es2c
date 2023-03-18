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
import { User } from '../../shared/shareddtypes';
import { getUserDetails, getUserInSesion } from '../../api/api';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import * as fieldsValidation from '../../utils/fieldsValidation';

//#region DEFINICION DE COMPONENTES STYLED

const BoxProfile = styled(Box)({
    padding: '0em 1em 0em',
    display: 'flex',
    flexDirection: 'row',
    columnGap: '2em'
})


const MyMenu = styled(Menu)({
    marginTop: '3em',
})

//#endregion

function LogedMenu() {


    const passwordSchema = fieldsValidation.passwordValidation;

    const editSchema = fieldsValidation.editProfileValidation;

    
    //#region METODOS DE CLASE

    const getProfile = async () => {
        closeUserMenu();
        let user = await getUserInSesion();
        Swal.fire({
            title: 'Mi perfil',
            html: ` <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + user.username + `>
                    <label for="webid-gp" class="swal2-label">WebID: </label>
                    <input type="text" id="webid-gp" class="swal2-input" disabled placeholder=` + user.webID + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="5" id="biography-gp" class="swal2-input" disabled placeholder="Biografía..."></textarea>`,
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
        let user = await getUserInSesion();
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
            
                passwordSchema.validate({password:pass}).then(() => {

                    let confirmPass = (Swal.getPopup().querySelector('#rpassword-ep') as HTMLInputElement).value

                    if(fieldsValidation.checkPasswords(pass, confirmPass)){
                        let oldPassword = (Swal.getPopup().querySelector('#opassword-ep') as HTMLInputElement).value
                        
                        if(oldPassword === oldPassword){ // Comprobar con la guardada en la BD
                            user = { username: user.username, webID: user.webID, password: pass };
                            return user;
                        } else {
                            fieldsValidation.showError("No se ha podido actualizar la contraseña", "Contraseña actual incorrecta", showEdit);
                        }
                    }
                    else {
                        fieldsValidation.showError("No se ha podido actualizar la contraseña", "Las contraseñas no coinciden", showEdit);
                        
                    }
                }).catch( e => {
                  
                    let errorMessage = (e as string)
                    fieldsValidation.showError("No se ha podido actualizar la contraseña", errorMessage, showEdit);
                })
                
            }
        }).then((result) => {
            if (result.isConfirmed) {
                editProfile(user);
            } else if (result.isDenied) {
                showEditNoPss();
            }
        })
    }

    const editProfile = (user: User) => {

    }

    async function showEditNoPss(): Promise<void> {
        closeUserMenu();
        let user = await getUserInSesion();
        Swal.fire({
            title: 'Edita tu perfil',
            html: ` <label for="name-ep" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-ep" class="swal2-input" placeholder=` + user.username + `>
                    <label for="webid-ep" class="swal2-label">WebID: </label>
                    <input type="text" id="webid-ep" class="swal2-input" placeholder=` + user.webID + `>
                    <label for="biagraphy-ep" class="swal2-label">Biografía: </label>
                    <textarea rows="5" id="biography-ep" class="swal2-input" placeholder="Biografía..."></textarea>`,
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
                let name = (Swal.getPopup().querySelector('#name-ep') as HTMLInputElement).value
                let webid = (Swal.getPopup().querySelector('#webid-ep') as HTMLInputElement).value
                let biography = (Swal.getPopup().querySelector('#biography-ep') as HTMLInputElement).value

                if(!name && !webid && !biography){
                    showQuestion();
                } else{

                    if(!name)
                        name = user.username as string;
                    
                    if(!webid)
                        webid = user.webID as string;
                    
                    if(!biography)
                        biography = "..."; // Cambiarlo por user.biography

                    editSchema.validate({
                        username: name,
                        webID: webid,
                        biography: biography
                    }).then(() => {
                        user = {username: name, webID: webid, password: user.password }
                        return user;
                    }).catch( e => {
                        let errorMessage = (e as string)
                        fieldsValidation.showError("No se ha podido actualizar el perfil", errorMessage, showEditNoPss);
                    })
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                editProfile(user);
            } else if (result.isDenied) {
                showEdit();
            }
        })
    }


    const goLogout = () => {
        closeUserMenu();
        //var state = FactoryLoMap.getSesionManager().cerrarSesion();
        navigate("/");
        //Mostrar mensaje en función de si se cerro sesión correctamente o no, mostrar NoLoggedMenu
    }

    const closeUserMenu = () => {
        setAnchorElUser(null);
    };

    const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const getUsername = () => {
        getUserInSesion().then(function (userReq) {
            setUsername(userReq.username)
        });
    }

    //#endregion

    //#region HOOKS
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement>(null);
    const [url, setUrl] = useState("../testUser.jfif");
    const [username, setUsername] = useState<String>("");

    //#endregion

    return (
        //#region COMPONENTE
        <BoxProfile>
            <b><p>Sesión iniciada como {getUsername()}{username}</p></b>
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
                <MenuItem key={uuid()} onClick={goLogout}>
                    <LogoutIcon /> Logout
                </MenuItem>
            </MyMenu>
        </BoxProfile>
        //#endregion 

    )
}

export default LogedMenu;
