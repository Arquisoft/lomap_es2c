import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'

//#region DEFINICION DE COMPONENTES STYLED
const MyBar = styled(AppBar)({
    background: '#81c784',
})

const FooterBox = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    margin: '0.5em 2em 0.5em',
})

const MemberBox = styled(Box)({
    gridColumn: '1',
    fontSize: '0.7em',
    alignSelf: 'center',
    justifySelf: 'center',
    padding: '0em 1em 0em',
})

const RightsBox = styled(Box)({
    gridColumn: '3',
    fontSize: '0.7em',
    alignSelf: 'center',
    justifySelf: 'center',
    padding: '0em 1em 0em',
})

const LinkBox = styled(Box)({
    gridColumn: '2',
    fontSize: '0.7em',
    alignSelf: 'center',
    justifySelf: 'center',
    padding: '0em 1em 0em',
})
//#endregion

export function Footer() {

    return (

        //#region COMPONENTE
        <MyBar position="static">
            <Container maxWidth="xl">
                <FooterBox>
                    <MemberBox>
                        Aplicación realizada por:
                        <ul>
                            <li>Abel Busto Dopazo</li>
                            <li>Paula Suárez Prieto</li>
                            <li>Adrián Fernández Álvarez</li>
                            <li>Juan Hermosa Casaprima</li>
                            <li>Guillermo Pulido Fernández</li>
                        </ul>
                    </MemberBox>
                    <LinkBox>
                        Enlaces de interés:
                        <ul>
                            <li><a href="https://github.com/Arquisoft/lomap_es2c/">GitHub</a></li>
                            <li><a href="https://arquisoft.github.io/lomap_es2c/">Documentación</a></li>
                            <li><a href="https://www.inrupt.com/solid">Inrupt PODs</a></li>
                            <li><a href="https://www.uniovi.es/">Universidad de Oviedo</a></li>
                        </ul>
                    </LinkBox>
                    <RightsBox>
                        <p><img width="35px" alt="Logo lomap_es2c" src="./nobgLogo.png" /> © LoMap es2c</p>
                        <p>Proyecto Open Source bajo la autoría del equipo de desarrollo lomap_es2c y con la supervisión de la Universidad de Oviedo.</p>
                    </RightsBox>
                </FooterBox>
            </Container>
        </MyBar>
        //#endregion

    )
}
