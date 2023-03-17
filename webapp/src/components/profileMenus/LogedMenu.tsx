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

    //#region METODOS DE CLASE

    const getProfile = () => {
        closeUserMenu();
        //var user = FactoryLoMap.getSesionManager().usuarioEnSesion()
        //Rellenar formulario read only 
    }

    async function showEdit(): Promise<void> {
        closeUserMenu();
        let user = await getUserInSesion();
        Swal.fire({
            title: 'Edita tu perfil',
            html: `<input type="password" id="password-ep" class="swal2-input" placeholder="Nueva contraseña">
                    <input type="password" id="rpassword-ep" class="swal2-input" placeholder="Confirmar contraseña"> `,
            confirmButtonText: 'Cambiar contraseña',
            denyButtonText: 'Volver',
            confirmButtonColor: '#81c784',
            denyButtonColor: 'grey',
            showDenyButton: true,
            focusConfirm: false,
            preConfirm: () => {
                let pssw = (Swal.getPopup().querySelector('#password-ep') as HTMLInputElement).value
                let rpssw = (Swal.getPopup().querySelector('#rpassword-ep') as HTMLInputElement).value
                return { username: user.username, webID: user.webID, password: user.password }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                editProfile(result.value);
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
            html: `<input type="text" id="name-ep" class="swal2-input" placeholder=` + user.username + `>
                    <input type="text" id="webid-ep" class="swal2-input" placeholder=` + user.webID + `>
                    <textarea rows="5" id="biografia-ep" class="swal2-input" placeholder="Descripción"></textarea>`,
            confirmButtonText: 'Editar',
            denyButtonText: 'Cambiar contraseña',
            showDenyButton: true,
            confirmButtonColor: '#81c784',
            denyButtonColor: 'grey',
            focusConfirm: false,
            preConfirm: () => {
                let name = (Swal.getPopup().querySelector('#name-ep') as HTMLInputElement).value
                let webid = (Swal.getPopup().querySelector('#webid-ep') as HTMLInputElement).value
                let descripcion = (Swal.getPopup().querySelector('#biografia-ep') as HTMLInputElement).value
                if (!name || !webid) {
                    name = (Swal.getPopup().querySelector('#name-ep') as HTMLInputElement).placeholder
                }
                return { username: name, webID: webid, password: user.password }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                editProfile(result.value);
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
