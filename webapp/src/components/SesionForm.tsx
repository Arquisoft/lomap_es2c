import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from './Paper';
import logo from '../logoCompleto.png';
import { styled } from '@mui/material/styles';

const LogoBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})

export default function SesionForm(props: React.HTMLAttributes<HTMLDivElement>) {

    //#region METODOS DE CLASE
    const { children } = props;
    //#endregion

    return (

        //#region COMPONENTE
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ mt: "1em", mb: "1em" }}>
                    <Paper
                        background="light"
                        sx={{ py: { xs: "4em", md: "4em" }, px: { xs: "3em", md: "3em" } }}
                    >
                        <LogoBox>
                            <img src={logo} alt="Logo LoMap" />
                        </LogoBox>
                        {children}
                    </Paper>
                </Box>
            </Container>
        </Box>
        //#endregion

    );
}