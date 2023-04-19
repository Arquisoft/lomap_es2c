import * as React from 'react';
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

export function NoLogedMenu() {

    const navigate = useNavigate();

    //#region METODOS DE CLASE
    const showLogin = () => {
        closeUserMenu();
        navigate("/login")
        //Redirect login view
    }

    const showSignUp = () => {
        closeUserMenu();
        navigate("/signup")
        //Redirect singup view
    }

    const closeUserMenu = () => {
        setAnchorElUser(null);
    };

    const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    //#endregion

    //#region HOOKS
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    //#endregion

    return (

        //#region COMPONENTE
        <BoxProfile>
            <Tooltip title="Open settings">
                <IconButton onClick={openUserMenu} sx={{ padding: 0 }}>
                    <Avatar data-testid="defaultImg" src="/broken-image.jpg" />
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
                <MenuItem key={uuid()} onClick={showSignUp}>
                    Sing Up
                </MenuItem>
                <MenuItem key={uuid()} onClick={showLogin}>
                    Login
                </MenuItem>
            </MyMenu>
        </BoxProfile>
        //#endregion

    )
}
