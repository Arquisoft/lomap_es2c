import { Box } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';


const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: 'black white'
})

export const FriendManagerPanel = () => {

    let lista = [
        "hola",
        "hola2",
        "hola47",
        "adios",
        "g",
        "hola",
        "hola2",
        "hola47",
        "adios",
        "g",
        "hola",
        "hola2",
        "hola47",
        "adios",
        "g",
        "hola",
        "hola2",
        "hola47",
        "adios",
        "g",
    ]

    const generateOpen = () => {
        let str = ""
        for (let i = 0; i < lista.length; i++) {
            str += '0';
        }
        return str;
    }

    const [open, setOpen] = React.useState(generateOpen());

    const handleClick = (item: number) => {
        let c = open.charAt(item) == '0' ? '1' : '0';
        let newOpen = ""
        for (let i = 0; i < open.length; i++) {
            newOpen += (i == item ? c : open.charAt(i));
        }
        setOpen(newOpen)
        console.log(newOpen)
    }

    const isOpen = (item: number) => {
        return open.charAt(item) == '0' ? false : true;
    }

    return (
        <ScrollBox>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Tus grupos de mapas
                    </ListSubheader>
                }
            >
                {lista.map((str, i) => {
                    return (
                        <>
                            <ListItemButton onClick={() => handleClick(i)}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={str} />
                                {isOpen(i) ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={isOpen(i)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <MapIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </>)
                })}
            </List>
        </ScrollBox>
    )
}
