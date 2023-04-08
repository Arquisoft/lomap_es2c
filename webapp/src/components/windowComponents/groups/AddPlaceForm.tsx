import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import PlaceCategories  from './PlaceCategories';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';

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
    puntuacion: string
}
export default function AddPlaceForm() {
    const { id, lat, lng } = useParams();
    const navigate = useNavigate()

    const [category, setCategory] = useState('');
    const [score, setScore] = useState(4);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        if(data.longitude == null){
            data.longitude = lng;
        }
        if(data.latitude == null){
            data.latitude = lat;
        }

        let p:Place = {
            nombre: data.placename,
            categoria: category,
            latitud: data.latitude as string,
            longitud: data.longitude as string,
            puntuacion: score.toString()
        }
        
        console.log(p)
    };

    
    const handleCategoryChange = (event: SelectChangeEvent) => {
      setCategory(event.target.value as string);
    };

    
    const handleScoreChange = (event: any, value: number | null) => {
        if (value !== null) {
            setScore(value);
        }
    };

    console.log(category)
    console.log(score)

    return (
        <>
            <div>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" onClick={() => navigate("/home/groups/main")}>
                        Mis grupos
                    </Link>
                    <Typography color="inherit">{id}</Typography>
                    <Typography color="text.primary">Nuevo lugar</Typography>
                </Breadcrumbs>
            </div>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <CSSTypography variant="body1" align="center"
                    sx={{ mt: "0.5em", mb: "0.5em" }}>
                    Añadir lugar
                </CSSTypography>
                
                    <CSSTextField
                        id="placename-AP"
                        variant="outlined"
                        label="Nombre del lugar"
                        placeholder="Nombre del lugar"
                        fullWidth
                        {...register("placename")}
                        helperText={errors.placename ? 'Nombre inválido' : ''}

                    />
                    <FormControl sx={{mb: '0.8em', maxHeight: "50em", overflow: "none" }} fullWidth>
                    <InputLabel htmlFor="grouped-select">Categoría</InputLabel>
                    <Select
                        value={category}
                        defaultValue="" 
                        placeholder='Categoría'
                        id="grouped-select" 
                        label="Categoría"
                        onChange={handleCategoryChange}
                        fullWidth
                    >
                        {PlaceCategories.map(({ name, categories }) => (
                        [
                            <ListSubheader key={name}>{name}</ListSubheader>,
                            ...categories.map((category) => (
                            <MenuItem key={category+name} value={category}>
                                {category}
                            </MenuItem>
                            )),
                        ]
                        ))}
                    </Select>
                    </FormControl>
                    <CoordinatesBox>
                    <CSSTextField
                        id="longitude-AP"
                        label={lng ? ("Longitud: " + lng.toString().substring(0,8)) : "Longitud"}
                        placeholder="Longitud"
                        disabled={lng ? true : false}
                        type="number"
                        {...register("longitude")}
                        helperText={errors.longitude ? 'La coordenada de longitud no es válida' : ''}
                    />
               
                <CSSTextField
                    id="latitude-AP"
                    label={lat ? ("Latitud: " + lat.toString().substring(0,9)) : "Latitud"}
                    placeholder="Latitud"
                    disabled={lat ? true : false}
                    type="number"
                    {...register("latitude")}
                    helperText={errors.longitude ? 'La coordenada de latitud no es válida' : ''}
                />
                 </CoordinatesBox>
                 
              
                 <Box>
                <LegendTypography sx={{ mb: "0.3em" }}> Reseña: </LegendTypography>

                <textarea
                    id="review"
                    placeholder="Reseña..."
                    style={{ width: '98.7%', height: '7vh', resize: 'none'}}
                    {...register("review-AP", { required: true, maxLength: 150 })} />

                </Box>
                <Box sx={{ gridColumn: 3}}>
                <LegendTypography sx={{ mt: "0.8em", mb: "0.3em" }}> Valoración: </LegendTypography>
                <StyledRating
                    name="highlight-selected-only"
                    defaultValue={4}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value: number) => customIcons[value].label}
                    highlightSelectedOnly
                    onChange={handleScoreChange}
                />
                </Box>
              
                <CSSButton
                    sx={{ mt: "1.2em" }}
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                >
                    Añadir
                </CSSButton>

            </Box>
        </>
    );
}