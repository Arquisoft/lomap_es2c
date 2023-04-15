import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'

//#region DEFINICION DE COMPONENTES STYLED
const MyBar = styled(AppBar)({
    background: '#81c784',
})

const FooterBox = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    margin: '0.3em 2em 0em',
})

const MemberBox = styled(Box)({
    gridColumn: '1',
    fontSize: '0.7em',
    alignSelf: 'center',
    justifySelf: 'center',
    padding: '0em 1em 0em',
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)'
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
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)'
})
//#endregion

export function Footer() {

    return (

        //#region COMPONENTE
        <MyBar position="static">
            <Container maxWidth="xl">
                <FooterBox>
                    <MemberBox>
                        <div style={{ gridColumn: "span 2", justifySelf: "center" }}>Aplicación realizada por:</div>
                        <ul>
                            <li>Abel Busto Dopazo</li>
                            <li>Paula Suárez Prieto</li>
                        </ul>
                        <ul>
                            <li>Adrián Fernández Álvarez</li>
                            <li>Guillermo Pulido Fernández</li>
                        </ul>
                    </MemberBox>
                    <LinkBox>
                        <div style={{ gridColumn: "span 2", justifySelf: "center" }}>Enlaces de interés:</div>
                        <ul>
                            <li><a href="https://github.com/Arquisoft/lomap_es2c/">GitHub</a></li>
                            <li><a href="https://arquisoft.github.io/lomap_es2c/">Documentación</a></li>
                        </ul>
                        <ul>
                            <li><a href="https://www.uniovi.es/">Universidad de Oviedo</a></li>
                            <li><a href="https://leafletjs.com/">Leafletjs (Mapa)</a></li>
                        </ul>
                    </LinkBox>
                    <RightsBox>
                        <p><img width="30px" alt="Logo lomap_es2c" src="nobgLogo.png" /> © LoMap es2c</p>
                        <p>Proyecto Open Source bajo la autoría del equipo de desarrollo lomap_es2c y con la supervisión de la Universidad de Oviedo.</p>
                    </RightsBox>
                </FooterBox>
            </Container>
        </MyBar >
        //#endregion

    )
}
