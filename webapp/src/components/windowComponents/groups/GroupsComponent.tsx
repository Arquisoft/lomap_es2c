import { Box, Collapse, Divider, Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import { getUserInSesion } from '../../../api/api';
import { Group, Place, User } from '../../../shared/shareddtypes';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import AddPlaceForm from './AddPlaceForm';
import AddGroupForm from './AddGroupForm';
import { useNavigate, useParams } from 'react-router-dom';
import { render } from 'react-dom';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { useSession } from '@inrupt/solid-ui-react';
import PodManager from '../../../podManager/PodManager'
import { Session } from '@inrupt/solid-client-authn-browser/dist/Session';

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

export const Groups = (props: { groups: Promise<Group[]>, daddy: any, session: any }) => {

    const navigate = useNavigate()

    const [open, setOpen] = React.useState("");

    const deleteGroup = (group: Group) => {
        new PodManager().deleteGroup(props.session, group)
    }

    const addPlace = (group: Group) => {
        navigate("/home/groups/addplace/" + group.name)
    }

    const generateOpen = (elems: number) => {
        let str = ""
        for (let i = 0; i < elems; i++) {
            str += '0';
        }
        return str;
    }

    const handleClick = (item: number) => {
        let c = open.charAt(item) == '0' ? '1' : '0';
        let newOpen = ""
        for (let i = 0; i < open.length; i++) {
            newOpen += (i == item ? c : open.charAt(i));
        }
        setOpen(newOpen)
    }

    const isOpen = (item: number) => {
        let c = open.charAt(item);
        if (c != '0' && c != '1') return false;
        return open.charAt(item) == '0' ? false : true;
    }

    const mostrarGrupo = (group: Group) => {
        navigate("/home/groups/main/" + group.name)
        alert("Se muestra el grupo " + group.name)
    }


    const getScoreIcon = (place: Place) => {
        switch (place.reviewScore) {
            case "-1": return (<SentimentNeutralIcon color="info" />)
            case "1": return (<SentimentVeryDissatisfiedIcon color="error" />)
            case "2": return (<SentimentDissatisfiedIcon color="error" />)
            case "3": return (<SentimentSatisfiedIcon color="warning" />)
            case "4": return (<SentimentSatisfiedAltIcon color="success" />)
            case "5": return (<SentimentVerySatisfiedIcon color="success" />)
            default: return (<SentimentVerySatisfiedIcon color="success" />)
        }
    }

    props.groups.then((grps: Group[]) => {
        if (open.length != grps.length) setOpen(generateOpen(grps.length))
        render(
            <>
                {grps.map((group, i) => {
                    return (
                        <React.Fragment key={i}>
                            < ListItemButton >
                                <ListItemIcon>
                                    <MapIcon />
                                </ListItemIcon>
                                <ListItemText primary={group.name} onClick={() => mostrarGrupo(group)} />
                                {isOpen(i) ?

                                    <ExpandLess onClick={() => { handleClick(i) }} />
                                    :

                                    <ExpandMore onClick={() => { handleClick(i) }} />
                                }
                                <VerticalDivider orientation='vertical' flexItem />
                                <Box sx={{ ml: "0.8em" }}>
                                    <AddLocationIcon onClick={() => addPlace(group)} htmlColor="#81c784" />
                                </Box>
                                <VerticalDivider orientation='vertical' flexItem />
                                <Tooltip title="Delete group" sx={{ ml: "0.6em" }}>
                                    <CloseIcon onClick={() => deleteGroup(group)} htmlColor="red" />
                                </Tooltip>
                            </ListItemButton>
                            <Collapse in={isOpen(i)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {group.places.map((place, j) => {
                                        return (
                                            <React.Fragment key={i + "-" + j}>
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        <PlaceIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={place.nombre} />
                                                    {getScoreIcon(place)}
                                                </ListItemButton>
                                            </React.Fragment>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    )
                })}
            </>, props.daddy.current)
    })
    return <></>
}