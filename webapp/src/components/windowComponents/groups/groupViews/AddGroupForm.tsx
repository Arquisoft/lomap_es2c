import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import * as fieldsValidation from '../../../../utils/fieldsValidation';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { crearGrupo } from 'podManager/MapManager';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import { Group } from 'shared/shareddtypes';
import { useSession } from '@inrupt/solid-ui-react';

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
        color: '#1f4a21',
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
            borderColor: '#1f4a21',
        },
    }, '.MuiFormHelperText-root': {
        color: 'red !important',
    }
});



export function AddGroupForm(props: { refresh: any }) {

    const { session } = useSession();
    const schema = fieldsValidation.groupValidation;
    type GroupSchema = yup.InferType<typeof schema>;

    const { register, handleSubmit, formState: { errors } } = useForm<GroupSchema>({
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit((data: any) => {
        crearGrupo(data.groupName, session).then((grupo: Group) => {
            navigate("/home/groups/main")
            props.refresh()
            temporalSuccessMessage("Grupo <em><b>" + grupo.name + "</b></em> creado correctamente. ¡A añadir lugares se ha dicho!");
        }).catch((e: any) => {
            temporalSuccessMessage("Se ha creado todo correctamente en el POD. ¡A añadir grupos se ha dicho!");
        })
    })

    const navigate = useNavigate()

    return (<>
        <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="hover" color="inherit" onClick={() => navigate("/home/groups/main")}>
                    Mis grupos
                </Link>
                <Typography color="black">Nuevo grupo</Typography>
            </Breadcrumbs>
        </div>
        <Box component="form" onSubmit={onSubmit}>
            <CSSTypography variant="body1" align="center"
                sx={{ mt: "1.5em", mb: "1em" }}>
                Nuevo grupo de lugares
            </CSSTypography>
            <CSSTextField
                id="placename-AP"
                variant="outlined"
                label="Nombre del grupo"
                placeholder="Nombre del grupo"
                fullWidth
                {...register("groupName")}
                helperText={errors.groupName ? errors.groupName.message : ''}

            />

            <CSSButton
                sx={{ mt: "1.2em" }}
                variant="contained"
                type="submit"
                size="large"
                fullWidth
            >
                Crear grupo
            </CSSButton>

        </Box>
    </>
    );
}