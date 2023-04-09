import { Box, Collapse, Divider, Tooltip } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import { Group } from '../../../shared/shareddtypes';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { render } from 'react-dom';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { useSession } from '@inrupt/solid-ui-react';
import PodManager from '../../../podManager/PodManager'
import { Session } from '@inrupt/solid-client-authn-browser/dist/Session';
import { useDispatch } from 'react-redux';
import { addMarkers, clearMarkers, setGroupMarker } from 'utils/redux/action';

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

export const Groups = (props: { groups: Promise<Group[]>, daddy: any, session: any }) => {

    const dispatch = useDispatch();
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
        const newMarkers = placeMarkers;
        dispatch(clearMarkers());
        
        dispatch(setGroupMarker(group.name as string))
       
        alert("Se muestra el grupo " + group.name)
        if(group.name == 'aaa'){
            dispatch(addMarkers([{position:[40.326565,4.32236], name:"paula"}]))
        } else {
            console.log(newMarkers)
            dispatch(addMarkers(newMarkers));
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
                                                    <SentimentSatisfiedAltIcon htmlColor="green" />
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

// Para probar sin pods

type MarkerData = {
    position: [number, number];
    name: string;
};
type Place = {
    nombre: string,
    categoria: string,
    latitud: string,
    longitud: string,
    puntuacion: string,
    comentario: string
}

const places: Place[] = [
    {nombre: "Bar de Pepe", categoria:"Bar", latitud:"50.862545", longitud:"4.32321", puntuacion:"3", comentario:"Review del bar de Pepe"},
    {nombre: "Restaurante 1", categoria:"Restaurante", latitud:"50.962545", longitud:"4.42321", puntuacion:"4", comentario:"Review del restaurante 1"},
    {nombre: "Tienda 1", categoria:"Tienda", latitud:"50.782545", longitud:"4.37321", puntuacion:"5", comentario:"Review de la tienda 1"},
]

const placeMarkers: MarkerData[] = places.map(({ latitud, longitud, nombre }) => ({
    position: [parseFloat(latitud), parseFloat(longitud)],
    name: nombre
  }));