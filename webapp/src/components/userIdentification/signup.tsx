import * as React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from '@mui/material/styles';
import SForm from './SesionForm';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FactoryLoMap, UserInt } from 'restapi/src/facade';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';


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

export function Signup() {

    //#region HOOKS
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserInt>();

    const [confirmPass, setConfirmPass] = useState('')
    const [pass, setPass] = useState('')

    //#endregion

    //#region METODOS DE CLASE
    const onSubmit: SubmitHandler<UserInt> = data => trySignup(data);
    console.log(errors);

    const trySignup = (user: UserInt) => {


        if (checkFields(user.username, user.webID, user.password)) {
            console.log("pasa1")
            if (checkPasswords()) {
                console.log("pasa")
                FactoryLoMap.getSesionManager().registrarse(user)

                if (true) {
                    Swal.fire({
                        title: 'Cuenta creada',
                        text: "¡Su cuenta ha sido creada con éxito!",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#81c784',
                        confirmButtonText: 'Inicia sesión',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            showLogin()
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se ha podido crear su cuenta.',
                        confirmButtonColor: '#81c784',
                    }).then((result) => {
                        return
                    })
                }
            } else {
                console.log("no")
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Las contraseñas no coinciden',
                    confirmButtonColor: '#81c784',
                }).then((result) => {
                    return
                })
            }
        }

        //Cambiar del NoLoggedMenu a LoggedMenu
    }

    const showLogin = () => {
        //Cambiar del Signup a Login component
        navigate("/login");
    }

    const checkPasswords = () => {
        return confirmPass === pass
    }

    const checkFields = (username: String, webid: String, password: String) => {
        if (username.length == 0)
            return false
        else if (webid.length == 0)
            return false
        else if (password.length == 0)
            return false
        else
            return true
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
                    id="usernameSU"
                    label="Nombre de usuario"
                    placeholder="Nombre de usuario"
                    fullWidth
                    {...register("username", { required: true, max: 20, min: 6, maxLength: 12 })}
                    helperText={errors.username ? 'Debe introducir un nombre de usuario de entre 6 y 12 caracteres' : ''}
                />

                <CSSTextField
                    id="webidSU"
                    label="WebID"
                    placeholder="WebID"
                    fullWidth
                    {...register("webID", { required: true, min: 6, maxLength: 100 })}
                    helperText={errors.webID ? 'Debe introducir un WebID válido' : ''}
                />

                <CSSTextField
                    id="passwordSU"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    {...register("password", { required: true, minLength: 8, maxLength: 24 })}
                    onChange={(e: any) => setPass(e.target.value)}
                    helperText={errors.password ? 'Debe introducir una contraseña con una longitud mínima de 8 caracteres' : ''}
                />

                <CSSTextField
                    id="confirmPasswordSU"
                    label="Repite la contraseña"
                    type="password"
                    fullWidth
                    autoComplete="current-password"
                    onChange={(e: any) => setConfirmPass(e.target.value)}

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