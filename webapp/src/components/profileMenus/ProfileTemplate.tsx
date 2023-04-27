import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../userIdentification/Paper';
import { styled } from '@mui/material/styles';
import { useSession } from '@inrupt/solid-ui-react';
import PodManager from '../../podManager/PodManager';
import { useSelector } from 'react-redux';
import { RootState } from 'utils/redux/store';
import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';
import { readCookie } from 'utils/CookieReader';

const LogoBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})

export default function SesionForm(props: React.HTMLAttributes<HTMLDivElement>) {

    //#region METODOS DE CLASE
    const { children } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    //#endregion

    const imgUrl = useSelector((state: RootState) => state.user.imgUrl);

    const goBack = () => {
        let url: string = readCookie("lastPath");
            if (url === "/home/edit")
                url = "/";
            if (url === "/home/edit/psw" && pathname === "/home/edit/psw")
            url = "/home/edit";
            if (url === "/home/edit/psw" && pathname === "/home/edit")
                url = "/";
            navigate(url)
     }
    
    
    return (

        //#region COMPONENTE
        <Box sx={ { display: 'flex', } } >
            <Fab style={ { backgroundColor: '#81c784', color: '#fff' } } aria-label="add" onClick={ goBack }>
                <KeyboardBackspaceIcon />
            </Fab>
            <Container maxWidth="sm">
                <Box sx={{ mb: "1em" }}>
                    <Paper
                        background="light"
                        sx={{ pt:'2em', pl:'2em', pr:'2em' }}
                    >
                        <LogoBox>
                            {imgUrl !== null ?
                                <img id="profileImagePodPT" src={imgUrl} alt="Foto de perfil" crossOrigin="anonymous" />
                                :
                                <img id="profileImage" src="defaultUser.png" alt="Foto de perfil" />
                            }

                        </LogoBox>
                        {children}
                    </Paper>
                </Box>
            </Container >
        </Box >
        //#endregion

    );
}