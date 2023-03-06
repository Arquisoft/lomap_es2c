import * as React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from '@mui/material/styles';
import SForm from '../components/SesionForm';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { User, FactoryLoMap } from '../domain/facade';


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
    },
});

//#endregion

export default function Signup() {

    //#region HOOKS

    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    //#endregion

    //#region METODOS DE CLASE
    const onSubmit: SubmitHandler<User> = data => trySignUp(data);
    console.log(errors);

    const trySignUp = (user: User) => {
        FactoryLoMap.getSesionManager().registrarse(user);
        //Cambiar del NoLoggedMenu a LoggedMenu
    }

    const showLogin = () => {
        //Cambiar del Signup a Login component
        //let navigate = useNavigate();
        // navigate("/login");
    }

    //#endregion

    return (

        //#region COMPONENTE
        <SForm>

            <CSSTypography variant="h4" align="center"
                sx={{ mt: "0.5em" }}>
                Crear cuenta
            </CSSTypography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: "1em" }}>
                <CSSTextField
                    id="outlined-required"
                    label="Nombre de usuario"
                    placeholder="Nombre de usuario"
                    fullWidth
                    {...register("username", { required: true, max: 20, min: 6, maxLength: 12 })}
                />

                <CSSTextField
                    id="outlined-required"
                    label="WebID"
                    placeholder="WebID"
                    fullWidth
                    {...register("webid", { required: true, max: 20, min: 6, maxLength: 12 })}
                />

                <CSSTextField
                    id="outlined-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    {...register("password", { required: true, maxLength: 100 })}
                />

                <CSSTextField
                    id="outlined-password-input"
                    label="Repite la contraseña"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    {...register("password", { required: true, maxLength: 100 })}
                />

                <CSSButton
                    sx={{ mt: "1.5em", mb: "2em" }}
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                >
                    Crear cuenta
                </CSSButton>

            </Box>

            <Typography variant="body1" align="left">
                {'¿Ya tienes cuenta? '}
                <Link
                    onClick={showLogin}
                    align="left"
                    underline="always"
                >
                    Inicia sesión
                </Link>
            </Typography>

        </SForm>
        //#endregion

    );
}