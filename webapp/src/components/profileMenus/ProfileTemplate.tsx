import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../userIdentification/Paper';
import { styled } from '@mui/material/styles';
import { useSession } from '@inrupt/solid-ui-react';
import PodManager  from '../../podManager/PodManager';

const LogoBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})

export default function SesionForm(props: React.HTMLAttributes<HTMLDivElement>) {

    //#region METODOS DE CLASE
    const { children } = props;
    //#endregion
    const { session } = useSession();

    
    const profileImageUrl = async () => {
    const img = await new PodManager().getPhoto(session);
        return img;
    }

    const [imgUrl, setImgUrl] = React.useState('');

    React.useEffect(() => {
        const fetchImgUrl = async () => {
            const url = await profileImageUrl();
            setImgUrl(url);
        };
        fetchImgUrl();
    }, []);


    
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
                                <img id="profileImagePod" src={ imgUrl } alt="Foto de perfil" crossOrigin="anonymous" />
                                :
                                 <img id="profileImage" src="defaultUser3.png" alt="Foto de perfil" />
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