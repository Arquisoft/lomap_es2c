import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

//#region DEFINICION DE COMPONENTES STYLED
const HomeContainer = styled(Container)({
    display: 'grid',
    gridTemplateColumns: 'repeat(5,1fr)',
    gridTemplateRows: 'repeat(4,1fr)',
    margin: '3em',
    rowGap: '2em',
    columnGap: '3em',
    textAlign: 'center',
})

const TextBox = styled(Box)({
    gridColumn: '1/4',
    gridRow: '1/5',
    justifySelf: 'center',
    alignSelf: 'center',
    color: "white",
    fontFamily: 'Calibri',
    fontWeight: 'lighter',
    fontSize: '1.2em',
    backgroundColor: '#81c784',
    width: '100%',
    height: '100%',
    margin: '0em 0.5em 0em',
    padding: '0em 1em 0em',
    textAlign: 'justify',
    paddingTop: '0.85em',
})

const InfoBox = styled(Box)({
    gridColumn: '4/6',
    gridRow: '1/3',
    justifySelf: 'center',
    alignSelf: 'center',
    color: "white",
    fontFamily: 'Calibri',
    fontWeight: 'lighter',
    fontSize: '1.1em',
    backgroundColor: '#81c784',
    width: '100%',
    height: '100%',
    textAlign: 'justify',
    paddingTop: '0.85em',
})

const ImgBox = styled(Box)({
    gridColumn: '4/6',
    gridRow: '3/5',
    justifySelf: 'center',
    alignSelf: 'center',
    color: "white",
    fontFamily: 'Calibri',
    fontWeight: 'lighter',
    fontSize: '1em',
    backgroundColor: '#81c784',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: '0.85em',
})

const MainBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})
//#endregion

export function HomePage() {

    const navigate = useNavigate();

    const goSignup = () => {
        navigate("signup")
    }

    return (

        //#region COMPONENTE
        <MainBox>
            <HomeContainer>
                <TextBox>
                    <img src="../logoCompleto.png"></img>
                    <p>Bienvenido a LoMap, la aplicación que te permite organizar tu vida alrededor de los lugares que más te gustan.</p>
                    <p>En nuestra aplicación podrás guardar todos los lugares que te gustan, te relajan y te encanta visitar una y otra vez. ¿Acabas de comer en el restaurante nuevco de la ciudad?,
                        ¿descubriste un mirador al que necesitas ir con tu amor platónico?, ¿te has enamorado de la camarera de ese bar y necesitas volver?,
                        Añade todos los lugares que quieras en LoMap y organizalos en los grupos que prefieras para tener toda tu vida a un solo click.</p>
                    <p>Podrás añadir comentarios a cada lugar, fotos para recordar lo maravillosos que eran. Puedes añadir a tus amigos y compartir con ellos esos lugares
                        a los que siempre se te olvida llevarles. No dudes, crea tu cuenta <a id="homeA" onClick={goSignup}>aquí</a> de forma gratuita y disfruta de nuestra aplicación.
                    </p>
                </TextBox>
                <InfoBox>
                </InfoBox>
                <ImgBox>
                    <img width="90%" src="../bruselas.jfif" />
                    <p>Conoce Bruselas de la mano de tus amigos</p>
                </ImgBox>
            </HomeContainer >
        </MainBox>
        //#endregion

    )
}
