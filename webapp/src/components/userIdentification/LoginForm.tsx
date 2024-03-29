import { useForm } from "react-hook-form";
import { styled } from '@mui/material/styles';
import SForm from './SesionForm';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { User } from '../../shared/shareddtypes';
import { login } from '../../api/api';
import { showError } from "utils/fieldsValidation";

//#region DEFINICION DE COMPONENTES STYLED

const CSSTypography = styled(Typography)({
    color: "white",
    fontFamily: 'Calibri',
    fontWeight: 'lighter',
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
    },
});

//#endregion

export function Login() {

    //#region HOOKS
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    //#endregion

    //#region METODOS DE CLASE
    const onSubmit = handleSubmit(data => tryLogin(data));

    const tryLogin = (user: User) => {
        login(user).then(function (userApi: User) {
            if (userApi !== null) {
                document.cookie = "notifications=; path=/"
                navigate("/podlogin");
            }
        }).catch((err: any) => {
            showError("Error al iniciar sesión", err.message, () => { });
        });
    }


    const showSignup = () => {
        navigate("/signup");
        return
    }

    //#endregion

    return (

        //#region COMPONENTE
        <SForm>

            <CSSTypography variant="h4" align="center"
                sx={{ mt: "0.5em" }}
                data-testid="loginTitle">
                Inicia sesión
            </CSSTypography>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: "1em" }}>
                <CSSTextField
                    sx={{ mb: "0.5em" }}
                    id="outlined-required"
                    label="Nombre de usuario"
                    placeholder="Nombre de usuario"
                    fullWidth
                    data-testid="nameInput"
                    {...register("username", { required: true, maxLength: 30 })}
                    helperText={errors.username ? 'Debe introducir un nombre de usuario válido' : ''}

                />

                <CSSTextField
                    id="outlined-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    data-testid="passwordInput"
                    {...register("password", { required: true, maxLength: 30 })}
                    helperText={errors.username ? 'Debe introducir una contraseña' : ''}
                />

                <CSSButton
                    sx={{ mt: "1.5em", mb: "2em" }}
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    data-testid="loginButton"
                >
                    Iniciar sesión
                </CSSButton>

            </Box>

            <Typography variant="body1" align="left">
                {'¿Eres nuevo? '}
                <Link
                    onClick={showSignup}
                    align="left"
                    underline="always"
                    data-testid="goSignupButton"
                >
                    Regístrate
                </Link>
            </Typography>

        </SForm >
        //#endregion

    );
}