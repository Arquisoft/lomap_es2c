import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Paper, StyledComponentProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from './Header';
import Login from './userIdentification/login';
import { Footer } from './Footer';
import { Sign } from 'crypto';

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
    return (

        //#region COMPONENTE
        <MainBox>
            <HomeContainer>
                <TextBox>
                    <img src="../logoCompleto.png"></img>
                    <p>La empresa de desarrollo de software HappySw ha sido contratada por el ayuntamiento de la ciudad de Bruselas para desarrollar un sistema denominado LoMap en el que los ciudadanos puedan disponer de mapas personalizados sobre lugares y negocios locales de la ciudad.
                        Los lugares que se incluirán en el mapa pueden ir desde tiendas a bares, restaurantes, paisajes, monumentos, etc.</p>
                    <p>Los mapas personalizados estarán bajo control de los usuarios y la información compartida será almacenadas en el pod personal que cada usuario proporcione siguiendo los principios del proyecto SOLID.
                        Aunque la empresa ha sido contratada por el ayuntamiento de una ciudad concreta, su intención es crear una solución de software genérica que pueda ser desplegada y utilizada en otras ciudades.</p>
                    <p>El enfoque inicial es sobre los usuarios, permitiéndoles crear mapas personalizados de los lugares que les interesan.
                        El siguiente paso podría ser permitir a los establecimientos (tiendas, restaurantes, etc.) crear sus propios espacios como una versión digital de su lugar físico.</p>
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
