import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export const AddGroupForm = () => {

    const navigate = useNavigate()

    return (
        <Box>
            Group <CloseIcon onClick={() => navigate("/home/0")} htmlColor="red" />
        </Box>
    )
}
