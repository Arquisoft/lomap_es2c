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
import { useSession } from '@inrupt/solid-ui-react';
import PodManager from '../../../podManager/PodManager'
import { Session } from '@inrupt/solid-client-authn-browser/dist/Session';
import { Groups } from './GroupsComponent';
import { MapManager } from 'podManager/MapManager';

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

export const GroupsManagerPanel = (props: { session: () => Session }) => {

    const ref = useRef<HTMLDivElement>(null);

    const userGroups = async () => {
        let myGroups: Group[] = [];
        await new MapManager().verMapaDe(null, props.session()).then(function (groups) {
            for (let i = 0; i < groups.length; i++) {
                myGroups.push(groups[i]);
            }
        })

        /*myGroups.push({
            "name": "Bares favoritos",
            "places": [{
                nombre: "El Rincón de Juan",
                category: "Bar",
                latitude: "40.4168",
                longitude: "-3.7038",
                description: "Bar de tapas tradicional en el centro de Madrid.",
                comments: [
                  {
                    author: "Pedro",
                    comment: "Las mejores tapas de la ciudad, recomiendo las croquetas de jamón.",
                    date: "2022-03-15T12:30:00Z"
                  },
                  {
                    author: "Ana",
                    comment: "Ambiente acogedor y personal muy amable.",
                    date: "2022-03-18T19:45:00Z"
                  }
                ],
                reviewScore: "4.5",
                date: "2022-03-01T10:00:00Z"
              },{
                nombre: "La Taberna del Puerto",
                category: "Bar",
                latitude: "43.3623",
                longitude: "-8.4115",
                description: "Bar de mariscos y pescados en el puerto de A Coruña.",
                comments: [
                  {
                    author: "María",
                    comment: "Excelente marisco y vistas espectaculares del puerto.",
                    date: "2022-03-25T14:20:00Z"
                  },
                  {
                    author: "Juan",
                    comment: "Muy buen servicio y atención, el arroz con bogavante estaba delicioso.",
                    date: "2022-03-28T21:15:00Z"
                  }
                ],
                reviewScore: "4.8",
                date: "2022-03-10T13:45:00Z"
              }]
        })
        myGroups.push({
            "name": "Rutas de montaña",
            "places": [{
                latitude: "42.6547",
                longitude: "-0.9868",
                nombre: "Ruta de la Forcanada",
                category: "Rutas de montaña",
                description: "Esta es una ruta de alta montaña en el Pirineo catalán. Es una de las más espectaculares de los Pirineos, y una de las más exigentes físicamente.",
                comments: [
                  {
                    author: "Juan Pérez",
                    comment: "Una ruta espectacular con paisajes increíbles. Hay que estar en buena forma física para hacerla.",
                    date: "2022-06-15"
                  },
                  {
                    author: "María Rodríguez",
                    comment: "La ruta es muy dura, pero las vistas son impresionantes. Merece la pena el esfuerzo.",
                    date: "2022-08-03"
                  }
                ],
                reviewScore: "4.5",
                date: "2022-07-01"
              }, {
                latitude: "43.1707",
                longitude: "-1.2467",
                nombre: "Camino de Santiago",
                category: "Rutas de montaña",
                description: "El Camino de Santiago es una ruta de peregrinación que se ha convertido en una de las rutas de senderismo más populares de España. Se puede hacer en diferentes etapas, y ofrece una gran variedad de paisajes y lugares de interés.",
                comments: [
                  {
                    author: "Pedro Gómez",
                    comment: "Hacer el Camino de Santiago es una experiencia única. Es una ruta con mucha historia y cultura, y los paisajes son muy variados.",
                    date: "2022-05-10"
                  },
                  {
                    author: "Sofía Martínez",
                    comment: "El Camino de Santiago es una experiencia inolvidable. Es una ruta exigente físicamente, pero muy gratificante.",
                    date: "2022-09-01"
                  }
                ],
                reviewScore: "4.7",
                date: "2022-06-01"
              }]
        })*/
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
                                <Groups groups={groups} daddy={ref} session={props.session} />
                            </Box>
                        </ScrollBox>
                    </List >
                </>
                :
                (op == "addgroup" ?
                    <AddGroupForm session={props.session} />
                    :
                    (op == "addplace" ?
                        <AddPlaceForm session={props.session} />
                        :
                        <ErrorPage></ErrorPage>
                    )
                )
            }
        </ >
    )
}
