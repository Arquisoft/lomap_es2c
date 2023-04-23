import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import PlaceCategories from '../PlaceCategories';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import { Place, Comment, Group, MarkerData } from 'shared/shareddtypes';
import { getUserInSesion } from 'api/api';
import { MapManager } from 'podManager/MapManager';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import * as fieldsValidation from '../../../../utils/fieldsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { useSession } from '@inrupt/solid-ui-react';
import { addMarkers, addPlaceMarker, clearMarkers, setGroupMarker } from 'utils/redux/action';
import { StyledRating, customIcons } from '../StyledRating';
import { IconContainerProps } from '@mui/material';

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

export default function AddPlaceForm(props: { refresh: any }) {

    const { session } = useSession();
    const { id, lat, lng } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();


    // Obtención del grupo al que se va a añadir el lugar
    let mapM = new MapManager();

    const userGroups = async () => {
        const groups = await mapM.verMapaDe(null, session);
        return groups;
    };

    const [group, setGroup] = useState<Group>();

    const findGroup = async () => {
        const grps = await userGroups();
        const group = grps.find((g) => g.name === id);
        setGroup(group);
    };

    useEffect(() => {
        findGroup();
    }, []);
    // ---- fin obtención del grupo

    // Actualización de marcadores
    const actualizarMarcadores = () => {
        dispatch(clearMarkers());

        dispatch(addPlaceMarker(false));

        dispatch(setGroupMarker(group.name as string))

        const groupPlaces = new MapManager().mostrarGrupo(group, session);

        const groupMarkers: MarkerData[] = [];

        groupPlaces.forEach((place) => {
            groupMarkers.push({
                position: [parseFloat(place.latitude), parseFloat(place.longitude)],
                name: place.nombre,
                type: "mine",
                iconUrl: "../markers/yellow-marker.png",
                category: place.category
            })
        })

        dispatch(addMarkers(groupMarkers));
    }

    // ---- fin actualización de marcadores


    // Manejo del formulario
    const [category, setCategory] = useState(null);
    const [score, setScore] = useState(4);

    const schema = fieldsValidation.placeValidation;
    type PlaceShema = yup.InferType<typeof schema>;


    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm<PlaceShema>({
        resolver: yupResolver(schema),
        defaultValues: {
            latitude: 0.0,
            longitude: 0.0,
        },
    });

    const handleSetValue = (field: any, value: any) => {
        setValue(field, parseFloat(value));
    };

    useEffect(() => {
        if (lat !== undefined) {
            setValue('latitude', parseFloat(lat));
        }
    }, [lat, setValue]);

    useEffect(() => {
        if (lng !== undefined) {
            setValue('longitude', parseFloat(lng));
        }
    }, [lng, setValue]);

    const onSubmit = (data: any) => {

        let comments: Comment[] = [{
            comment: data.review,
            date: new Date().getTime().toString(),
            author: getUserInSesion().username
        }]

        let p: Place = {
            nombre: data.placename,
            category: category,
            latitude: data.latitude as string,
            longitude: data.longitude as string,
            reviewScore: score.toString(),
            description: "",
            date: new Date().getTime().toString(),
            comments,
        }

        mapM.añadirLugarAGrupo(p, group, session).then(() => {
            temporalSuccessMessage("Lugar " + p.nombre + " añadido correctamente al grupo <b><em>" + group.name + "</em></b>. Habrá que volver, ¿o no?");
            actualizarMarcadores();
            navigate("/home/groups/showgroup/" + group.name)
            props.refresh()
        })
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleScoreChange = (event: any, value: number | null) => {
        if (value !== null) {
            setScore(value);
        }
    };

    const handleOnKeyPress = (e: any) => {
        const maxLength = e.target.maxLength;
        const currentValue: string = e.target.value;
        const currentLength = currentValue.length;
        const keyValue = e.key;
        const number = /^[0-9.-]*$/;
        if (currentLength >= maxLength || (!number.test(keyValue) && !e.ctrlKey)
            || (keyValue === '-' && currentLength !== 0)
            || keyValue === '.' && currentValue.includes('.')) {
            e.preventDefault();
        }
    }

    // ---- fin manejo formulario

    return (
        <>
            <div>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" onClick={() => { dispatch(addPlaceMarker(false)); navigate("/home/groups/main") }}>
                        Mis grupos
                    </Link>
                    <Link underline="hover" color="inherit" onClick={() => { dispatch(addPlaceMarker(false)); navigate("/home/groups/showgroup/" + id) }}>
                        {id}
                    </Link>
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
                    helperText={errors.placename ? errors.placename.message : ''}

                />
                <FormControl sx={{ mb: '0.8em', maxHeight: "50em", overflow: "none" }} fullWidth>
                    <InputLabel htmlFor="grouped-select">Categoría</InputLabel>
                    <Select
                        value={category ?? ''}
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
                                    <MenuItem key={category + name} value={category}>
                                        {category}
                                    </MenuItem>
                                )),
                            ]
                        ))}
                    </Select>
                </FormControl>
                <CoordinatesBox>
                    <Controller
                        name="longitude"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Longitud"
                                type="number"
                                error={Boolean(errors.longitude)}
                                helperText={errors.longitude?.message}
                                inputProps={{
                                    step: 0.000001,
                                    min: -180,
                                    max: 180,
                                    maxLength: 11
                                }}
                                disabled={lng !== undefined ? true : false}
                                onChange={(e) => handleSetValue(field.name, e.target.value)}
                                onKeyPress={(e) => handleOnKeyPress(e)}
                            />
                        )}
                    />

                    <Controller
                        name="latitude"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Latitud"
                                type="number"
                                error={Boolean(errors.latitude)}
                                helperText={errors.latitude?.message}
                                inputProps={{
                                    step: 0.000001,
                                    min: -90,
                                    max: 90,
                                    maxLength: 11
                                }}
                                disabled={lat !== undefined ? true : false}
                                onChange={(e) => handleSetValue(field.name, e.target.value)}
                                onKeyPress={(e) => handleOnKeyPress(e)}
                            />
                        )}
                    />
                </CoordinatesBox>


                <Box>
                    <LegendTypography sx={{ mb: "0.3em" }}> Reseña: </LegendTypography>

                    <textarea
                        id="review-AP"
                        placeholder="Reseña..."
                        style={{ width: '98.7%', height: '7vh', resize: 'none' }}
                        {...register("review")} />

                </Box>
                <Box sx={{ gridColumn: 3 }}>
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