import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from '@mui/material/styles';
import SForm from '../userIdentification/SesionForm';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { User } from '../../shared/shareddtypes';
import { editPassword, editUserDetails, getUserInSesion } from 'api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as fieldsValidation from '../../utils/fieldsValidation';
import ProfileTemplate from "./ProfileTemplate";
import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { temporalSuccessMessage } from "utils/MessageGenerator";
import { readCookie } from "utils/CookieReader";

//#region DEFINICION DE COMPONENTES STYLED

const CSSTypography = styled(Typography)({
    color: "white",
    fontFamily: 'Calibri',
});

const EditPasswordIcon = styled(EditIcon)({
    color: "#1f4a21",
})

const EditPasswordButton = styled(Button)({
    color: 'white',
    borderColor: '#1f4a21',
    textTransform: 'none',
    '&:hover': {
        color: '#1f4a21',
        borderColor: '#1f4a21',
        boxShadow: 'none',
    },
});

const CSSButton = styled(Button)({
    backgroundColor: "white",
    color: "#81c784",
    fontWeight: "bold",
    '&:hover': {
        backgroundColor: '#1f4a21',
        color: 'white',
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
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: '#1f4a21',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1f4a21',
        },
    }, '.MuiFormHelperText-root': {
        color: 'white !important',
    }
});


const LegendTypography = styled(Typography)({
    color: 'white',
    fontFamily: '"Calibri", "Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '400',
    fontSize: '1em',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
});

//#endregion


export function EditProfile() {

    const navigate = useNavigate();

    const schema = fieldsValidation.editProfileValidation;
    type EditSchema = yup.InferType<typeof schema>;
    const { register, handleSubmit, formState: { errors } } = useForm<EditSchema>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<EditSchema> = data => tryToEdit(data);

    const [user, setUser] = useState(getUserInSesion())


    const showPassword = () => {
        navigate("/home/edit/psw")
    }

    const goBack = () => {
        let url = readCookie("lastPath");
        if (url === "/home/edit")
            url = "/";
        navigate(url)
    }



    const tryToEdit = (editions: EditSchema) => {

        if (editions.biography !== undefined && editions.biography !== '' && editions.biography !== null) {
            let editedUser = { username: user.username, webID: user.webID, password: user.password, description: editions.biography, img: user.img }
            editUserDetails(editedUser).then(() => {
                temporalSuccessMessage("Tú perfil se ha editado correctamente. La nueva biografía te sienta mejor.");
                goBack();
            }).catch((e) => {
                fieldsValidation.showError("No se ha podido actualizar el perfil.", e as string, () => { });
                return false;
            })
        }
    }

    return (
        <Box sx={{ '& > :not(style)': { ml: '2em', mt: '2em' } }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Fab style={{ backgroundColor: '#81c784', color: '#fff' }} aria-label="add" onClick={goBack}>
                <KeyboardBackspaceIcon />
            </Fab>
            <ProfileTemplate>
                <CSSTypography variant="h3" align="center"
                    data-testid="usernameEditProfile"
                >
                    {user.username}
                </CSSTypography>
                <CSSTypography fontWeight='lighter' variant="h5" align="center"
                    sx={{ mt: "0.5em" }}
                    data-testid="editProfileTitle"
                >
                    Edita tu perfil
                </CSSTypography>
                <Box>
                    <LegendTypography sx={{ mb: "0.3em" }}> Biografía: </LegendTypography>

                    <textarea
                        id="biography-EP"
                        placeholder={user?.description ? user.description : "Edita tu biografía..."}
                        {...register("biography")}
                    />

                </Box>



                <EditPasswordButton sx={{ mt: "0.8em" }} variant="outlined" startIcon={<EditPasswordIcon />} onClick={showPassword}>
                    Actualizar contraseña
                </EditPasswordButton>

                <CSSButton
                    sx={{ mt: "1.5em", mb: "2em" }}
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    data-testid="editProfileButton"
                >
                    Editar perfil
                </CSSButton>

            </ProfileTemplate>
        </Box>
    )
}