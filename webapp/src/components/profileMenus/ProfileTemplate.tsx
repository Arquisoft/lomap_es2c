import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../userIdentification/Paper';
import { styled } from '@mui/material/styles';
import { useSession } from '@inrupt/solid-ui-react';
import PodManager from '../../podManager/PodManager';
import { useSelector } from 'react-redux';
import { RootState } from 'utils/redux/store';

const LogoBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})

export default function SesionForm(props: React.HTMLAttributes<HTMLDivElement>) {

    //#region METODOS DE CLASE
    const { children } = props;
    //#endregion

    const imgUrl = useSelector((state: RootState) => state.user.imgUrl);


    return (

        //#region COMPONENTE
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ mb: "1em" }}>
                    <Paper
                        background="light"
                        sx={{ pt: '2.5em', pb: '0.5em', pr: '2em', pl: '2em' }}
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