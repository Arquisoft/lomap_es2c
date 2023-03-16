import * as React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from '@mui/material/styles';
import SForm from './SesionForm';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { User } from '../../shared/shareddtypes';
import { signup } from '../../api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as fieldsValidation from '../../utils/fieldsValidation';

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
    }, '.MuiFormHelperText-root': {
        color: 'white !important',
      }
});

//#endregion

export function Signup() {

    //#region HOOKS
    const schema = yup.object({
        username: yup.string().matches(/^[A-Za-z][A-Za-z0-9]+$/, "El nombre de usuario debe de empezar por una letra")
                                .min(6, "El nombre de usuario debe de tener entre 6 y 10 caracteres")
                                    .max(10, "El nombre de usuario debe de tener entre 6 y 10 caracteres")
                                        .required("Debe de introducir un nombre de usuario"),
        webID: yup.string().matches(/^https:\/\/[A-Za-z][A-Za-z0-9]+$/).required(),
        password: yup.string().matches(/^[A-Za-z0-9]+$/, 'La contraseña no puede contener caracteres especiales')
                                .min(8, "La contraseña debe de tener una longitud mínima de 8 caracteres")
                                    .max(24, "La contraseña debe de tener una longitud mínima de 24 caracteres")
                                        .required("Debe de introducir una contraseña"),
      }).required();

    type UserSchema = yup.InferType<typeof schema>;


    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        resolver: yupResolver(schema)
    });

    const [confirmPass, setConfirmPass] = useState('')
    const [pass, setPass] = useState('')

    //#endregion

    //#region METODOS DE CLASE
    const onSubmit: SubmitHandler<UserSchema> = data => trySignup(data);
    console.log(errors);

    const trySignup = (user: UserSchema) => {
        if (user.username && user.webID && user.password) {
            let newUser: User = {username: user.username, webID: user.webID, password: user.password};
            if (fieldsValidation.checkPasswords(pass, confirmPass)) {
                signup(newUser).then(function (userResponse: User) {
                    successSignup(userResponse)
                }).catch((e) => {
                    failSignup()
                })
            } else {
                failRepeatPassword()
            }
        }
        //Cambiar del NoLoggedMenu a LoggedMenu
    }

    const successSignup = (user: User) => {
        console.log(user)
        Swal.fire({
            title: 'Cuenta creada',
            text: "¡Cuenta " + user.username + " ha sido creada con éxito!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#81c784',
            confirmButtonText: 'Inicia sesión',
        }).then((result) => {
            if (result.isConfirmed) {
                showLogin()
            }
        })
    }

    const failRepeatPassword = () => {
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

    const failSignup = () => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha podido crear su cuenta.',
            confirmButtonColor: '#81c784',
        }).then((result) => {
            return
        });
    }

    const showLogin = () => {
        //Cambiar del Signup a Login component
        navigate("/login");
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
                    {...register("username")}
                    helperText={errors.username ? errors.username.message : ''}
                />

                <CSSTextField
                    id="webidSU"
                    label="WebID"
                    placeholder="WebID"
                    fullWidth
                    {...register("webID")}
                    helperText={errors.webID ? 'Debe introducir un WebID válido' : ''}
                />

                <CSSTextField
                    id="passwordSU"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    {...register("password")}
                    onChange={(e: any) => setPass(e.target.value)}
                    helperText={errors.password ? errors.password.message : ''}
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

