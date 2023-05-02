import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from 'react-router-dom';
import { Place, Group } from '../../../../shared/shareddtypes'
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import PlaceComponent from '../PlaceComponent';
import { mostrarGrupoPod, verMapaDeAmigo } from '../../../../podManager/MapManager';
import { searchUserByUsername } from 'api/api';
import { useSession } from '@inrupt/solid-ui-react';
import { showError } from 'utils/fieldsValidation';
import Swal from 'sweetalert2';


const BoxCircularProgress = styled(Box)({
    paddingTop: '8em',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
})


export default function ShowFriendPlace() {
    const { session } = useSession();
    const { id, lat, lng } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const userGroups = async () => {
        let myGroups: Group[] = [];
        await searchUserByUsername(id).then(async (friend) => {
            await verMapaDeAmigo(friend, session).then((groups) => {
                for (let i = 0; i < groups.length; i++) {
                    myGroups.push(groups[i]);
                }
            })
        })

        return myGroups;
    }

    const filterGroups = async (groups: Promise<Group[]>) => {
        return (await groups).find((g) => g.name === lat)
    }

    const checkPlace = async (group: Promise<Group>) => {
        group.then((g) => {
            setPodPlace(mostrarGrupoPod(g, session).find((p) => p.nombre === lng));
            setLoading(false);
        }).catch((e) => {
            showError("Error inesperado", e.message, Swal.close)
        })
    }

    const groups = userGroups();
    const group = filterGroups(groups)
    const [podPlace, setPodPlace] = useState<Place>(null);

    const placeDoesntExist = () => {
        checkPlace(group).then(() => { }).catch((e) => {
            showError("Error inesperado", e.message, Swal.close)
        })
        return podPlace === undefined || podPlace === null;
    }

    return (
        <>
            <div>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/friends/main")}>
                        Amigos
                    </Link>
                    <Typography color="text.primary">{id}</Typography>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/friends/showgroup/" + id + "/" + lat)}>
                        {lat}
                    </Link>
                    <Typography color="text.primary">{lng}</Typography>
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