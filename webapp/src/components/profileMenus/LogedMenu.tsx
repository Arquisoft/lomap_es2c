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
import { getUserInSesion } from '../../api/api';

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

    const editProfile = () => {
        closeUserMenu();
        //var user = FactoryLoMap.getSesionManager().usuarioEnSesion()
        //Mostrar formulario editable con autogeneración de objeto User
        //Redirigir a editar usuario, a su vez llamara a Factory.getUserManager().modificarPerfil(User)
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
        let username;
        getUserInSesion().then(function (user) {
            username = user.username;
        })
        return username;
    }

    //#endregion

    //#region HOOKS
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement>(null);
    const [url, setUrl] = useState("../testUser.jfif");

    //#endregion

    return (

        //#region COMPONENTE
        <BoxProfile>
            <b><p>Sesión iniciada como {getUsername()}</p></b>
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
                    Profile
                </MenuItem>
                <MenuItem key={uuid()} onClick={editProfile}>
                    Edit profile
                </MenuItem>
                <MenuItem key={uuid()} onClick={goLogout}>
                    Logout
                </MenuItem>
            </MyMenu>
        </BoxProfile>
        //#endregion 

    )
}

export default LogedMenu;
