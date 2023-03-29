import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'
import { Button } from '@mui/material';
import { MapsManagerPanel } from '../windowComponents/MapsManagerPanel';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const MapBox = styled(Box)({
    minWidth: "75vw",
    backgroundColor: "brown"
})

export const MapComponent = () => {

    const navigate = useNavigate();

    const { mainop } = useParams();

    return (
        <MapBox>
            <Button onClick={() => { if (mainop == "groups") navigate("/home/groups/addplace") }}>
                Añadir lugar
            </Button>
        </MapBox>
    )
}
