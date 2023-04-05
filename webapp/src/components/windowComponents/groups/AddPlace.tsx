import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import AddPlaceForm from './AddPlaceForm';

export const AddPlace = () => {

    const navigate = useNavigate()

    const { lat, lon } = useParams()

    return (
        <Box>
            <AddPlaceForm></AddPlaceForm>
        </Box>
    )
}
