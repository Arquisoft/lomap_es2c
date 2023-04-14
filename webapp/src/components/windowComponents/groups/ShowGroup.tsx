import { Box, Collapse, CircularProgress, Divider, Tooltip, Breadcrumbs, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
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
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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
import AddIcon from '@mui/icons-material/Add';
import { getUserInSesion } from 'api/api';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ScrollBox = styled(Box)({
    maxHeight: '40vh',
    overflow: 'auto',
    scrollbarColor: '#81c784 white'
})

const InfoBox = styled(Box)({
    color: '#1f4a21',
    textAlign: 'center'
})

const BoxCircularProgress = styled(Box)({
    paddingTop: '3.5em',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '30vh'
})

const AddItem = styled(ListItemButton)({
    color: '#81c784',
})

const BCBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '2em'
})

const HorizontalDivider = styled(Divider)({
    width: '100%'
})

const CSSTypography = styled(Typography)({
    color: '#81c784',
    fontSize: '1.3em',
    fontFamily: 'Calibri',
});

export const ShowGroup = (props: { session: any, refresh: any }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const userGroup = async (): Promise<Group> => {
        let group = null
        await new MapManager().verMapaDe(getUserInSesion(), props.session).then((groups) => {
            for (let i = 0; i < groups.length; i++) {
                console.log(groups[i])
                if (groups[i].name === id) {
                    group = groups[i];
                    break
                }
            }
        })
        return group;
    }

    const [group, setGroup] = useState<Promise<Group>>(userGroup())

    const ref = useRef<HTMLDivElement>(null);

    const { id } = useParams();

    const addPlace = () => {
        navigate("/home/groups/addplace/" + id)
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
                    navigate("/home/groups/main")
                    temporalSuccessMessage("El grupo <em><b>" + group.name + "</b></em> se ha eliminado correctamente. ¿Malos recuerdos?");
                    props.refresh()
                });
            } else {
                Swal.close();
            }
        })
    }

    const deleteGroup = (group: Promise<Group>) => {
        group.then((grp) => {
            showQuestion(grp);
        })
    }

    return (
        <>
            <BCBox>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/groups/main")}>
                        Mis grupos
                    </Link>
                    <Typography color="text.primary">{id}</Typography>
                </Breadcrumbs>
                <Tooltip title="Delete group" sx={{ ml: "0.6em" }}>
                    <CloseIcon onClick={() => deleteGroup(group)} htmlColor="red" />
                </Tooltip>
            </BCBox>
            <CSSTypography variant="body1" align="center"
                sx={{ mt: "0.5em", mb: "0.5em" }}>
                {id}
            </CSSTypography>
            <AddItem onClick={() => addPlace()}>
                <ListItemIcon>
                    <AddIcon htmlColor='#81c784' />
                </ListItemIcon>
                <ListItemText primary="Añadir lugar" />
            </AddItem>
            <HorizontalDivider light color="#81c784" />
            {loading &&
                <BoxCircularProgress>
                    <CircularProgress size={100} color="primary" />
                </BoxCircularProgress>
            }
            <Box ref={ref}>
                <GroupDetails session={props.session} daddy={ref} group={group} stopLoading={() => setLoading(false)} refresh={() => setGroup(userGroup())} />
            </Box>
        </>
    )
}

const GroupDetails = (props: { session: any, daddy: any, group: Promise<Group>, stopLoading: any, refresh: any }) => {

    const navigate = useNavigate()

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

    props.group.then((grp) => {
        render(
            <>
                {grp != null ?
                    <>
                        <ScrollBox>
                            <List component="div" disablePadding>
                                {grp.places.map((place, j) => {
                                    return (
                                        <React.Fragment key={j}>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/home/groups/showplace/" + grp.name + "/" + place.nombre)} >
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
                        </ScrollBox>
                    </>
                    :
                    <>
                        <InfoBox><p><b>Este grupo no existe.</b></p><p>Deberías crearlo antes, ¿no?</p></InfoBox>
                    </>
                }
            </>, props.daddy.current)
        props.stopLoading()
    })
    return (<></>)
}
