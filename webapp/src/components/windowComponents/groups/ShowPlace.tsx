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
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from 'react-router-dom';
import { Session } from '@inrupt/solid-client-authn-browser/dist/Session';


const CSSTypography = styled(Typography)({
    color: '#81c784',
    fontSize: '1.3em',
    fontFamily: 'Calibri',
});

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

export default function ShowPlace (props: { session: () => Session }) {
    const { id, lat } = useParams();
    const navigate = useNavigate()


    let place: Place = places.find((p) => p.nombre == lat) //findPlaceByName(props.name)
    
   
    return (
        <>
            <div>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/groups/main")}>
                        Mis grupos
                    </Link>
                    <Typography color="inherit">{id}</Typography>
                    <Typography color="text.primary">{place.nombre}</Typography>
                </Breadcrumbs>
            </div>
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
                        value={("Longitud: " + place.longitud.toString().substring(0,8))}
                        placeholder="Longitud"
                        disabled

                    />
                    <CSSTextField
                        id="latitude-SP"
                        value={("Latitud: " + place.latitud.toString().substring(0,8))}
                        placeholder="Latitud"
                        disabled
                    />
                 </CoordinatesBox>
                 
              
                 <Box>
                <LegendTypography sx={{ mb: "0.3em" }}> Reseña: </LegendTypography>

                <textarea
                    id="review-SP"
                    placeholder={place.comentario}
                    style={{ width: '98.7%', height: '7vh', resize: 'none'}}
                    disabled
                />

                </Box>
                <Box sx={{ gridColumn: 3}}>
                <LegendTypography sx={{ mt: "0.8em", mb: "0.3em" }}> Valoración: </LegendTypography>
                <StyledRating
                    name="highlight-selected-only"
                    value={parseInt(place.puntuacion,10)}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value: number) => customIcons[value].label}
                    highlightSelectedOnly
                    disabled
                />
                </Box>
              
            </Box>
        </>
    );
}