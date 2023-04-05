import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import AddGroupForm  from './AddGroupForm';

export const AddGroup = () => {

    const navigate = useNavigate()

    return (
        <Box>
            <AddGroupForm></AddGroupForm>
        </Box>
    )
}
