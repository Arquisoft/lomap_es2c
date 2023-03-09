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
import { ProfileMenu } from './ProfileMenu';

const BoxProfile = styled(Box)({
    padding: '0em 1em 0em',
})


const MyMenu = styled(Menu)({
    marginTop: '3em',
})
//#endregion

export function NoLogedMenu(props: { changeLoged: (isLoged: boolean) => void }) {

    //#region METODOS DE CLASE
    const showLogin = () => {
        closeUserMenu();
        props.changeLoged(true);
        //Redirect login view
    }

    const showSignUp = () => {
        closeUserMenu();
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
                    <Avatar alt="Remy Sharp" src={"../logo192.png"} />
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
