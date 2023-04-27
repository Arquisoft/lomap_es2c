import { Box, CircularProgress, Divider, Breadcrumbs, Typography, Collapse } from '@mui/material'
import React, { useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Group } from '../../../../shared/shareddtypes';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate, useParams } from 'react-router-dom';
import { render } from 'react-dom';
import { Place } from '../../../../shared/shareddtypes'
import { searchUserByUsername } from 'api/api';
import { verMapaDeAmigo } from 'podManager/MapManager';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { CategoriesFilter } from '../filters/CategoriesFilter';
import { useSession } from '@inrupt/solid-ui-react';
import { useDispatch } from 'react-redux';
import { clearFilterForFriendMarkers, setFilterForFriendMarkers } from 'utils/redux/action';
import PlaceCategories from '../../places/PlaceCategories';


const ScrollBox = styled(Box)({
    maxHeight: '45vh',
    overflow: 'hidden auto',
    scrollbarColor: '#81c784 white'
})

const InfoBox = styled(Box)({
    color: '#1f4a21',
    textAlign: 'center'
})

const FilterBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
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

export const ShowFriendGroup = () => {

    const { session } = useSession();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const { lat, id, op } = useParams();

    const userGroup = async (): Promise<Group> => {
        let group = null
        await searchUserByUsername(id).then(async (friend) => {
            await verMapaDeAmigo(friend, session).then((groups) => {
                for (let i = 0; i < groups.length; i++) {
                    if (groups[i].name === lat) {
                        group = groups[i];
                        break
                    }
                }
            })
        })
        return group;
    }

    const [group, setGroup] = useState<Promise<Group>>(userGroup())

    const ref = useRef<HTMLDivElement>(null);

    return (
        <>
            <BCBox>
                <Breadcrumbs data-testid="showfriendgroupbc" separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/friends/main")}>
                        Amigos
                    </Link>
                    <Typography color="text.primary">{id}</Typography>
                    <Typography color="text.primary">{lat}</Typography>
                </Breadcrumbs>
            </BCBox>
            <CSSTypography variant="body1" align="center"
                sx={{ mb: "0.5em" }}>
                {lat}
            </CSSTypography>
            <HorizontalDivider light color="#81c784" />
            {loading &&
                <BoxCircularProgress>
                    <CircularProgress size={100} color="primary" />
                </BoxCircularProgress>
            }
            <Box ref={ref}>
                <GroupDetails friend={id} session={session} daddy={ref} group={group} stopLoading={() => setLoading(false)} />
            </Box>
        </>
    )
}

const GroupDetails = (props: { friend: any, session: any, daddy: any, group: Promise<Group>, stopLoading: any }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const [filters, setFilterState] = useState<string[]>([]);

    const setFilter = (categories: any) => {
        setFilterState(categories);
        dispatch(clearFilterForFriendMarkers());
    }

    function filterPlaces(place: Place) {
        const placeCategory = PlaceCategories.find((pc) => pc.categories.includes(place.category));
        let checkPlace = filters.includes(placeCategory?.name);

        if (filters.length > 0) {
            dispatch(clearFilterForFriendMarkers());
            dispatch(setFilterForFriendMarkers(filters))
        }

        return checkPlace;
    }

    const [open, setOpen] = React.useState(false);

    props.group.then((grp) => {
        render(
            <>
                {grp !== null ?
                    <>
                        <ScrollBox>
                            <FilterBox>
                                <FilterAltIcon />
                                <ListItemText primary="Filtros" />
                                {open ?
                                    <ExpandLess onClick={() => setOpen(false)} />
                                    :
                                    <ExpandMore data-testid="filterxm" onClick={() => setOpen(true)} />
                                }
                            </FilterBox>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <CategoriesFilter setFilter={setFilter} />
                                </List>
                            </Collapse>

                            <List component="div" disablePadding>
                                {grp.places.filter((place) => filters.length === 0 ? true : filterPlaces(place)).map((place, j) => {
                                    return (
                                        <React.Fragment key={j}>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/home/friends/showplace/" + props.friend + "/" + grp.name + "/" + place.nombre)} >
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
                        <InfoBox><p><b>Este grupo no existe.</b></p><p>¿Como has llegado aquí? Da la vuelta y no pruebes cosas raras.</p></InfoBox>
                    </>
                }
            </>, props.daddy.current)
        props.stopLoading()
    })
    return (<></>)
}
