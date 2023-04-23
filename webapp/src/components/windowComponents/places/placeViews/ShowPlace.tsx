import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from 'react-router-dom';
import { Place, Comment, Group } from '../../../../shared/shareddtypes'
import { MapManager } from 'podManager/MapManager';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import PlaceComponent from '../PlaceComponent';
import { useSession } from '@inrupt/solid-ui-react';

const CSSTypography = styled(Typography)({
    color: '#81c784',
    fontSize: '1.3em',
    fontFamily: 'Calibri',
});


const BoxCircularProgress = styled(Box)({
    paddingTop: '8em',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
})


export default function ShowPlace() {
    const { session } = useSession();
    const { id, lat } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)


    let mapM = new MapManager();

    const userGroups = async () => {
        let myGroups: Group[] = [];
        await mapM.verMapaDe(null, session).then(function (groups) {
            for (let i = 0; i < groups.length; i++) {
                myGroups.push(groups[i]);
            }
        })

        return myGroups;
    }

    const filterGroups = async (groups: Promise<Group[]>) => {
        return (await groups).find((g) => g.name == id)
    }

    const checkPlace = async (group: Promise<Group>) => {
        group.then((g) => {
            setPodPlace(mapM.mostrarGrupo(g, session).find((p) => p.nombre == lat));
            setLoading(false);
        })
    }

    const [groups, setGroups] = useState<Promise<Group[]>>(userGroups)
    const [group, setGroup] = useState<Promise<Group>>(filterGroups(groups))
    const [podPlace, setPodPlace] = useState<Place>(null);



    const placeDoesntExist = () => {
        checkPlace(group)
        return podPlace === undefined || podPlace === null;
    }

    return (
        <>
            <div>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/groups/main")}>
                        Mis grupos
                    </Link>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/groups/showgroup/" + id)}>
                        {id}
                    </Link>
                    <Typography color="text.primary">{lat}</Typography>
                </Breadcrumbs>
            </div>
            {placeDoesntExist() ? (
                <>
                    {loading &&
                        <BoxCircularProgress>
                            <CircularProgress size={100} color="primary" />
                        </BoxCircularProgress>
                    }
                </>
            ) : (
                <PlaceComponent place={podPlace} group={id} />
            )
            }
        </>
    )
}