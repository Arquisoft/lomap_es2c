import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'

const MapBox = styled(Box)({
    minWidth: "75vw",
    backgroundColor: "brown"
})

export const MapComponent = () => {
    return (
        <MapBox></MapBox>
    )
}
