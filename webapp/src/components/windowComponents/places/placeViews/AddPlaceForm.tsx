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
import { Place, Comment, Group, MarkerData, Image } from 'shared/shareddtypes';
import { getUserInSesion } from 'api/api';
import { añadirLugarAGrupo, mostrarGrupoPod, verMapaDe } from 'podManager/MapManager';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import * as fieldsValidation from '../../../../utils/fieldsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { useSession } from '@inrupt/solid-ui-react';
import { addMarkers, addPlaceMarker, clearMarkers, setGroupMarker } from 'utils/redux/action';
import { IconContainer, StyledRating, customIcons } from '../StyledRating';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Axios from 'axios';

const CSSTypography = styled(Typography)({
    color: '#81c784',
    fontSize: '1.3em',
    fontFamily: 'Calibri',
});

const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: '#81c784 white',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
})

const CSSButton = styled(Button)({
    backgroundColor: "white",
    color: "#81c784",
    fontWeight: "bold",
    width: "95%",
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
    width:'95%',
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
   // justifyContent: 'space-between',
    width: '95%'
})


const LegendTypography = styled(Typography)({
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};



export default function AddPlaceForm(props: { refresh: any }) {


    const { session } = useSession();
    const { id, lat, lng } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userGroups = async () => {
        const groups = await verMapaDe(null, session);
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

        const groupPlaces = mostrarGrupoPod(group, session);

        const groupMarkers: MarkerData[] = [];

        groupPlaces.forEach((place) => {
            groupMarkers.push({
                position: [parseFloat(place.latitude), parseFloat(place.longitude)],
                name: place.nombre,
                type: "mine",
                iconUrl: "../markers/myMarker.png",
                category: place.category,
                imageUrl: place.images[0]?.url
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

    // Manejo de imágenes
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [fileName, setFileName] = useState("¡Sube una foto!")

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file !== undefined )
        {
             setFileName(file.name)
        setSelectedImage(file);
        }
       
    };

    // ---- fin manejo imágenes

    function addPlaceToGroup(data:any, urlImg: any) {
        let comments: Comment[] = [{
            comment: data.review,
            date: new Date().getTime().toString(),
            author: getUserInSesion().webID
        }]

        let images: Image[] = [{
            author: getUserInSesion().webID,
            url: urlImg
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
            images,
        }

        añadirLugarAGrupo(p, group, session).then(() => {
            temporalSuccessMessage("Lugar " + p.nombre + " añadido correctamente al grupo <b><em>" + group.name + "</em></b>. Habrá que volver, ¿o no?");
            actualizarMarcadores();
            navigate("/home/groups/showgroup/" + group.name)
            props.refresh()
        })
    
    }

    const onSubmit = (data: any) => {
        if (selectedImage !== null) {

            const fd = new FormData();
            fd.append("file", selectedImage)
            fd.append("upload_preset", "t9chndiq")

            Axios.post("https://api.cloudinary.com/v1_1/lomapes2c/image/upload", fd).then((res) => {
                let urlImg = res.data.secure_url;
                addPlaceToGroup(data, urlImg);
            });

        } else
        {
            addPlaceToGroup(data, "");
        }


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
            || (keyValue === '.' && currentValue.includes('.'))) {
            e.preventDefault();
        }
    }


    // ---- fin manejo formulario

    return (
        <ScrollBox>
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
                    {...register("placename")}
                    helperText={errors.placename ? errors.placename.message : ''}

                />
                <FormControl sx={{ mb: '0.8em', maxHeight: "50em", overflow: "none", width: "95%" }} fullWidth>
                    <InputLabel htmlFor="grouped-select">Categoría</InputLabel>
                    <Select
                        value={category ?? ''}
                        placeholder='Categoría'
                        id="grouped-select"
                        label="Categoría"
                        onChange={handleCategoryChange}
                        MenuProps={ MenuProps }
                        required
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
                                helperText={ errors.longitude?.message }
                                fullWidth
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
                                helperText={ errors.latitude?.message }
                                fullWidth
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
                        style={{ width: '93%', height: '7vh', resize: 'none' }}
                        {...register("review")} />

                </Box>
                <Box sx={{ gridColumn: 3 }}>
                    <LegendTypography sx={{ mt: "0.8em", mb: "0.3em" }}> Valoración: </LegendTypography>
                    <StyledRating
                        name="highlight-selected-only"
                        data-testid="rating"
                        defaultValue={4}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleScoreChange}
                    />
                </Box>

                <div id="uploadImageDiv">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <PhotoCamera />
                        <input id="uploadImage" name="uploadImage" accept="image/*" type="file"
                            onChange={handleFileUpload} />
                        
                    </IconButton>
                    <p style={{color:"primary", fontSize: "0.8em" }}>{fileName}</p>

                </div>

                <CSSButton
                    sx={{ mt: "1.2em" }}
                    variant="contained"
                    type="submit"
                    size="large"
                >
                    Añadir
                </CSSButton>

            </Box>
        </ScrollBox>
    );
}