import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../userIdentification/Paper';
import { styled } from '@mui/material/styles';
import { useSession } from '@inrupt/solid-ui-react';
import PodManager  from '../../podManager/PodManager';
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
                        sx={{ py: { xs: "4em", md: "4em" }, px: { xs: "3em", md: "3em" } }}
                    >
                        <LogoBox>
                            { imgUrl !== null ? 
                                <img id="profileImagePodPT" src={ imgUrl } alt="Foto de perfil" crossOrigin="anonymous" />
                                :
                                 <img id="profileImage" src="defaultUser.png" alt="Foto de perfil" />
                            }
                            
                        </LogoBox>
                        {children}
                    </Paper>
                </Box>
            </Container>
        </Box>
        //#endregion

    );
}