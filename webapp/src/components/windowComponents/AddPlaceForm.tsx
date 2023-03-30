import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import AddPlaceComponent from '../mapComponents/AddPlaceComponent';

export const AddPlaceForm = () => {

    const navigate = useNavigate()

    const { lat, lon } = useParams()

    return (
        <Box>
            Place <CloseIcon onClick={() => navigate("/home/groups/main")} htmlColor="red" />
            Volver al grupo <CloseIcon onClick={() => navigate("/home/0")} htmlColor="red" />
            <AddPlaceComponent></AddPlaceComponent> 
        </Box>
    )
}
