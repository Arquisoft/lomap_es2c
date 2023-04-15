import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
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
import PlaceCategories from './PlaceCategories';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import { Place, Comment, Group } from 'shared/shareddtypes';
import { getUserInSesion } from 'api/api';
import { MapManager } from 'podManager/MapManager';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import * as fieldsValidation from '../../../utils/fieldsValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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

export default function AddPlaceForm(props: { session: any, refresh: any }) {
    const { id, lat, lng } = useParams();
    const navigate = useNavigate()

    const [category, setCategory] = useState('');
    const [score, setScore] = useState(4);

    let mapM = new MapManager();

    const userGroups = async () => {
        const groups = await mapM.verMapaDe(null, props.session);
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

    const schema = fieldsValidation.placeValidation;
    type PlaceShema = yup.InferType<typeof schema>;

    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm<PlaceShema>({
        resolver: yupResolver(schema),
        defaultValues: {
            latitude: 0,
            longitude: 0,
          },
    });

    const handleSetValue = (field:any, value:any) => {
        setValue(field, value);
      };

    useEffect(() => {
        if (lat !== null) {
            setValue('latitude', parseFloat(lat));
        }
      }, [lat, setValue]);

      useEffect(() => {
        if (lng !== null) {
            setValue('longitude', parseFloat(lng));
        }
      }, [lng, setValue]);

    const onSubmit = (data: any) => {
        console.log(data.review)
        let longitude = data.longitude == "" ? lng : data.longitude;
        let latitude = data.latitude == "" ? lat : data.latitude;
        let comments: Comment[] = [{
            comment: data.review,
            date: getDate(),
            author: getUserInSesion().username
        }]

        let p: Place = {
            nombre: data.placename,
            category: category,
            latitude: latitude as string,
            longitude: longitude as string,
            reviewScore: score.toString(),
            description: "",
            date: getDate(),
            comments,
        }

        mapM.añadirLugarAGrupo(p, group, props.session).then(() => {
            temporalSuccessMessage("Lugar " + p.nombre + " añadido correctamente al grupo <b><em>" + group.name + "</em></b>. Habrá que volver, ¿o no?");
            navigate("/home/groups/showgroup/" + group.name)
            props.refresh()
        })
    };

    const getDate = (): string => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleScoreChange = (event: any, value: number | null) => {
        if (value !== null) {
            setScore(value);
        }
    };

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
                            max: 180
                            }}
                            disabled={lng !== undefined ? true : false}
                            onChange={(e) => handleSetValue(field.name, e.target.value)}
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
                            max: 90
                            }}
                            disabled={lat !== undefined ? true : false}
                            onChange={(e) => handleSetValue(field.name, e.target.value)}
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