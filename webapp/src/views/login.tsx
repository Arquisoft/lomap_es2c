import * as React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from '@mui/material/styles';
import SForm from '../components/SesionForm';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const CSSTypography = styled(Typography)({
    color:"white",
    fontFamily:'verdana',
    fontWeight:'lighter',
});

const CSSButton = styled(Button)({
    backgroundColor:"white",
    color:"#81c784",
    fontWeight:"bold",
    '&:hover': {
      backgroundColor: '#1f4a21',
      color:'white',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      color:'white',
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


interface User {
    username: String;
    password: String;
  }

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const onSubmit: SubmitHandler<User> = data => console.log(data);
  console.log(errors);
  
  return (

    <SForm>

       
          <CSSTypography variant="h4" align="center"
           sx={{mt:"1.5em"}}>
            Inicia sesión
          </CSSTypography>
    

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: "2em" }}>
        <CSSTextField
            sx={{mb:"1em"}}
          id="outlined-required"
          label="Nombre de usuario"
          placeholder="Nombre de usuario"
          fullWidth
          {...register("username", {required: true, max: 20, min: 6, maxLength: 12})}
            />


        <CSSTextField
          id="outlined-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          fullWidth
          {...register("password", {required: true, maxLength: 100})}
        />

        <CSSButton 
            sx={{ mt: "2em", mb:"3em"}}
            variant="contained" 
            type="submit"
            size="large"
            fullWidth
            >
            Iniciar sesión</CSSButton>
        
        </Box>

        <Typography variant="body1" align="left">
            {'¿Eres nuevo? '}
            <Link
              href="/sign-up/"
              align="left"
              underline="always"
            >
              Regístrate
            </Link>
          </Typography>

    </SForm>

    
  );
}