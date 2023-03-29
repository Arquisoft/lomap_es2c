import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';

export const AddPlaceForm = () => {

    const navigate = useNavigate()

    const { lat, lon } = useParams()

    return (
        <Box>
            Place <CloseIcon onClick={() => navigate("/home/groups/main")} htmlColor="red" />
            {lat} - {lon}
        </Box>
    )
}
