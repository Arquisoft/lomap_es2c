import { Box, Collapse, Divider, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import { getMyGroups, getUserInSesion } from '../../api/api';
import { Group, User } from '../../shared/shareddtypes';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';

const ErrorBox = styled(Box)({
    padding: "2em 7em 2em",
    backgroundColor: "#81c784",
    width: "60vw",
    height: "55vh",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    color: "white",
})

const TitleBox = styled(Box)({
    fontSize: "3em",
    alignSelf: "center",
    padding: "0.5em"
})

const TextBox = styled(Box)({
    fontSize: "1em",
    alignSelf: "center",
})

export const ErrorPage = () => {
    return (
        <ErrorBox>
            <TitleBox>
                Error 404: Página no encontrada
            </TitleBox>
            <TextBox>
                Disculpamos las molestias pero la página a la que acaba de intentar acceder no existe o no se encuentra disponible. Vuelva al menú principal calcando <a href="/">aquí</a> o contacte con nosotros mediante nuestro GitHub proporcionado en el pie de la página. ¡Gracias por la compresión!
            </TextBox>
        </ErrorBox>
    )
}
