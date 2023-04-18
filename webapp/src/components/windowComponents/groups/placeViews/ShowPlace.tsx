import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import TextField from '@mui/material/TextField';
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

const CSSTypography = styled(Typography)({
    color: '#81c784',
    fontSize: '1.3em',
    fontFamily: 'Calibri',
});
/*
const CSSButton = styled(Button)({
    backgroundColor: "white",
    color: "#81c784",
    fontWeight: "bold",
    '&:hover': {
        backgroundColor: '#1f4a21',
        color: 'white',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        color: 'white',
        backgroundColor: '#1f4a21',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem #1f4a21',
    },
});
*/
const CSSTextField = styled(TextField)({
    marginBottom: '0.8em',
    '& label.Mui-focused': {
        color: '#81c784',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#1f4a21',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'grey',
        },
        '&:hover fieldset': {
            borderColor: '#1f4a21',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#81c784',
        },
    }, '.MuiFormHelperText-root': {
        color: 'red !important',
    }
});

const BoxCircularProgress = styled(Box)({
    paddingTop: '8em',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
})

const CoordinatesBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})


const LegendTypography = styled(Typography)({
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
});

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

export function RadioGroupRating() {
    return (
        <StyledRating
            name="highlight-selected-only"
            defaultValue={4}
            IconContainerComponent={IconContainer}
            getLabelText={(value: number) => customIcons[value].label}
            highlightSelectedOnly
        />
    );
}

const comments: Comment[] = [
    { author: "security", date: "10/04/2023", comment: "Review del bar de Pepe" }
]

const places: Place[] = [
    { nombre: "Bar de Pepe", category: "Bar", latitude: "50.862545", longitude: "4.32321", reviewScore: "3", comments: comments, description: "", date: "10/10/2023" },
    { nombre: "Restaurante 1", category: "Restaurante", latitude: "50.962545", longitude: "4.42321", reviewScore: "4", comments: comments, description: "", date: "10/10/2023" },
    { nombre: "Tienda 1", category: "Tienda", latitude: "50.782545", longitude: "4.37321", reviewScore: "5", comments: comments, description: "", date: "10/10/2023" },
]

function PlaceComponent(props: any) {

    const navigate = useNavigate()

    let place = props.place;
    let groupname = props.group;

    return (
        <>
            <Box>
                <CSSTypography variant="body1" align="center"
                    sx={{ mt: "0.5em", mb: "0.5em" }}>
                    {place.nombre}
                </CSSTypography>

                <CSSTextField
                    id="placename-SP"
                    variant="outlined"
                    label="Categoría"
                    value={place.nombre}
                    fullWidth
                />
                <CoordinatesBox>
                    <CSSTextField
                        id="longitude-SP"
                        label="Longitud"
                        value={(place.longitude.toString().substring(0, 8))}
                        placeholder="Longitud"
                        disabled

                    />
                    <CSSTextField
                        id="latitude-SP"
                        label="Latitud"
                        value={(place.latitude.toString().substring(0, 8))}
                        placeholder="Latitud"
                        disabled
                    />
                </CoordinatesBox>


                <Box>
                    <LegendTypography sx={{ mb: "0.3em" }}> Reseña: </LegendTypography>

                    <textarea
                        id="review-SP"
                        placeholder={place.comments[0] ? place.comments[0].comment : "Sin reseña"}
                        style={{ width: '98.7%', height: '7vh', resize: 'none' }}
                        readOnly
                    />

                </Box>
                <Box sx={{ gridColumn: 3 }}>
                    <LegendTypography sx={{ mt: "0.8em", mb: "0.3em" }}> Valoración: </LegendTypography>
                    <StyledRating
                        name="highlight-selected-only"
                        value={parseInt(place.reviewScore, 10) > 5 ? 5 : parseInt(place.reviewScore, 10)}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        highlightSelectedOnly
                        readOnly
                    />
                </Box>

            </Box>
        </>
    );
}

function PlaceError(props: any) {

    const navigate = useNavigate()
    let groupname = props.group;

    return (
        <>
            <Box>
                <CSSTypography variant="body1" align="center"
                    sx={{ mt: "0.5em", mb: "0.5em" }}>
                    Ha ocurrido un error al intentar recuperar la información del lugar <em>{props.placename}</em>
                </CSSTypography>

            </Box>
        </>
    );
}


export default function ShowPlace(props: { session: any }) {
    const { id, lat } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)


    let place: Place = places.find((p) => p.nombre == lat)

    let mapM = new MapManager();

    const userGroups = async () => {
        let myGroups: Group[] = [];
        await mapM.verMapaDe(null, props.session).then(function (groups) {
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
            setPodPlace(mapM.mostrarGrupo(g, props.session).find((p) => p.nombre == lat));
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