import { Container, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ErrorPage } from 'components/mainComponents/ErrorPage'
import { Footer } from 'components/mainComponents/Footer'
import { Header } from 'components/mainComponents/Header'
import React from 'react'

const MyContainer = styled(Container)({
    backgroundImage: 'url("../background.png")',
    backgroundPosition: 'center',
    backgroundSize: '95%',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    minHeight: '100vh',
    alignContent: 'center',
    justifyContent: 'space-between',
})

const MyPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
})

const MyPaper2 = styled(Paper)({
    backgroundColor: 'rgba(255, 0, 0, 0.0)',
})

export const NoFound = () => {
    return (
        <MyContainer disableGutters maxWidth={false}>
            <MyPaper elevation={1}><Header logged={false} /></MyPaper>
            <ErrorPage />
            <MyPaper2 elevation={1}><Footer /></MyPaper2>
        </MyContainer>
    )
}
