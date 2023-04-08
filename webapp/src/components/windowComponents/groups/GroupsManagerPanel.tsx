import { Box, Collapse, Divider, Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import { getMyGroups, getUserInSesion } from '../../../api/api';
import { Group, User } from '../../../shared/shareddtypes';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import AddPlaceForm from './AddPlaceForm';
import AddGroupForm from './AddGroupForm';
import { useNavigate, useParams } from 'react-router-dom';
import { render } from 'react-dom';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ShowPlace from './ShowPlace';
import { useDispatch } from 'react-redux';
import { addMarkers, clearMarkers, setGroupMarker } from 'utils/redux/action';

const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: 'black white'
})

const AddItem = styled(ListItemButton)({
    color: '#81c784',
})

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const HorizontalDivider = styled(Divider)({
    width: '100%'
})


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

  interface Props {
    markers: MarkerData[];
  }

export const GroupsManagerPanel = (props: Props) => {

    const ref = useRef<HTMLDivElement>(null);

    const userGroups = async () => {
        let myGroups: Group[] = [];
        let user = getUserInSesion();
        await getMyGroups(user).then(function (groups) {
            for (let i = 0; i < groups.length; i++) {
                myGroups.push(groups[i]);
            }
        })
        myGroups.push({
            "nombre": "Bares favoritos",
            "places": [{
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }, {
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }]
        })
        myGroups.push({
            "nombre": "Rutas de montaña",
            "places": [{
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }, {
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }]
        })
        return myGroups;
    }

    const [groups, setGroups] = useState<Promise<Group[]>>(userGroups)

    const { op } = useParams()

    const navigate = useNavigate()


    return (
        <>
            {op == "main" ?
                <>
                    <AddItem onClick={() => navigate("/home/groups/addgroup")}>
                        <ListItemIcon>
                            <AddIcon htmlColor='#81c784' />
                        </ListItemIcon>
                        <ListItemText primary="Añadir grupo" />
                    </AddItem>
                    <HorizontalDivider light color="#81c784" />
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Tus grupos de mapas
                            </ListSubheader>
                        }
                    >
                        <ScrollBox>
                            <Box ref={ref}>
                                <Groups groups={groups} daddy={ref} markers={props.markers} />
                            </Box>
                        </ScrollBox>
                    </List >
                </>
                :
                (op == "addgroup" ?
                    <AddGroupForm />
                    :
                    (op == "addplace" ?
                        <AddPlaceForm />
                        :
                        (op == "showplace" ?
                        <ShowPlace />
                        :
                        <ErrorPage></ErrorPage>
                    )
                    )
                )
            }
        </ >
    )
}

const Groups = (props: { groups: Promise<Group[]>, daddy: any, markers: MarkerData[]}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState("");

    const deleteGroup = (group: Group) => {
        alert("eliminar grupo " + group);
    }

    const addPlace = (group: Group) => {
        navigate("/home/groups/addplace/" + group.nombre)
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
        console.log(newMarkers)
        dispatch(setGroupMarker(group.nombre as string))
        dispatch(addMarkers(newMarkers));
        alert("Se muestra el grupo " + group.nombre)
        
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
                                <ListItemText primary={group.nombre} onClick={() => mostrarGrupo(group)} />
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
