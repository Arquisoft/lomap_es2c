import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'

//#region DEFINICION DE COMPONENTES STYLED
const MyBar = styled(AppBar)({
    background: '#81c784',
})
//#endregion

export function Footer() {

    return (

        //#region COMPONENTE
        <MyBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                </Toolbar>
            </Container>
        </MyBar>
        //#endregion

    )
}
