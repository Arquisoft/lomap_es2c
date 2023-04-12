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
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
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
import { Place, Comment, MarkerData } from '../../../shared/shareddtypes'
import { MapManager } from 'podManager/MapManager';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import Swal from 'sweetalert2';

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const InfoBox = styled(Box)({
    color: '#1f4a21',
    textAlign: 'center'
})

export const Groups = (props: { groups: Promise<Group[]>, daddy: any, session: any, refresh: any, stopLoading: any }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [open, setOpen] = React.useState("");
    const [selectedGroup, setSelectecGroup] = React.useState("");



    const deleteGroup = (group: Group) => {
        showQuestion(group)
    }

    const showQuestion = (group: Group) => {
        Swal.fire({
            title: "Eliminar grupo",
            html: `<p>¿Esta seguro de que quieres eliminar el grupo <em><b> ${group.name}</b></em>?</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#81c784',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                new PodManager().deleteGroup(props.session, group).then(() => {
                    props.refresh();
                    temporalSuccessMessage("El grupo <em><b>" + group.name + "</b></em> se ha eliminado correctamente. ¿Malos recuerdos?");
                });
            } else {
                Swal.close();
            }
        })
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

    /* SIN USAR POD
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
        */

    const mostrarGrupo = (group: Group) => {
        setSelectecGroup(group.name)

        dispatch(clearMarkers()); // Se eliminan los marcadores mostrados anteriormente

        dispatch(setGroupMarker(group.name as string)) // Se asigna el nombre del grupo que se va a mostrar

        const groupPlaces = new MapManager().mostrarGrupo(group, props.session);

        /*
        const groupMarkers : MarkerData[] = groupPlaces.map(({ latitude, longitude, nombre }) => ({
            position: [parseFloat(latitude), parseFloat(longitude)],
            name: nombre
        })); */

        const groupMarkers: MarkerData[] = [];
        groupPlaces.forEach((place) => {
            groupMarkers.push({
                position: [parseFloat(place.latitude), parseFloat(place.longitude)],
                name: place.nombre
            })
        })

        dispatch(addMarkers(groupMarkers)); // Se muestran los nuevos marcadores

        temporalSuccessMessage("Mostrando el grupo <em><b>" + group.name + "</em></b>.");

        navigate("/home/groups/showgroup/" + group.name)

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
                {
                    grps.length > 0 ?
                        <React.Fragment key="group-render">
                            {grps.map((group, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        < ListItemButton sx={{
                                            backgroundColor: selectedGroup === group.name ? '#DFF3CC' : 'inherit'
                                        }}>
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
                        </React.Fragment>
                        :
                        <InfoBox>
                            <p><b>Aqui deberia haber grupos...</b></p><p>¡Venga, añade alguno!</p>
                        </InfoBox>
                }
            </>, props.daddy.current)
        props.stopLoading()
    })
    return (<></>)
}

// Para probar sin pods


const comments: Comment[] = [
    { author: "security", date: "10/04/2023", comment: "Review del bar de Pepe" }
]

const places: Place[] = [
    { nombre: "Bar de Pepe", category: "Bar", latitude: "50.862545", longitude: "4.32321", reviewScore: "3", comments: comments, description: "", date: "10/10/2023" },
    { nombre: "Restaurante 1", category: "Restaurante", latitude: "50.962545", longitude: "4.42321", reviewScore: "4", comments: comments, description: "", date: "10/10/2023" },
    { nombre: "Tienda 1", category: "Tienda", latitude: "50.782545", longitude: "4.37321", reviewScore: "5", comments: comments, description: "", date: "10/10/2023" },
]

const placeMarkers: MarkerData[] = places.map(({ latitude, longitude, nombre }) => ({
    position: [parseFloat(latitude), parseFloat(longitude)],
    name: nombre
}));
