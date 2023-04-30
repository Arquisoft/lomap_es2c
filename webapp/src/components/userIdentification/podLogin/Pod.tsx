import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SForm from '../SesionForm';
import GetProviders from './PodProviders';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { logout } from '../../../api/api';
import { LoginButton } from "@inrupt/solid-ui-react";
import { useNavigate } from 'react-router-dom';


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

const CSSTypography = styled(Typography)({
    color: "white",
    fontFamily: 'Calibri',
    fontWeight: 'lighter',
});

export default function PodLogin() {
    const [provider, setProvider] = useState('');
    const [idp, setIdp] = useState("https://inrupt.net");

    let redirectToUrl = window.location.origin.concat("/home/welcome"); 


    const providers = GetProviders();
    const navigate = useNavigate();

    const handleLogin = async () => {
        document.cookie = "isPodLogged=true; path=/"; document.cookie = "sameWebId=false; path=/";
    };
    const handleError = async () => {
        logout(); navigate("/login");
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <SForm>
                <CSSTypography variant="h5" align="center"
                    sx={{ mt: "0.5em", mb: "1em" }}>
                    Inicia sesión con tu proveedor de pod
                </CSSTypography>


                <Autocomplete
                    options={providers}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    data-testid="providersCb"
                    onChange={ (event, newValue) => {
                        if(newValue !== null)
                        {
                            setProvider(newValue.name);
                            setIdp(newValue.url);
                        } else
                        {
                            setProvider("");
                            setIdp("");
                        }
                    } }
                    isOptionEqualToValue={ (option, value) => option.name === value.name }
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img style={{ width: "50px", height: "auto" }}
                                loading="lazy"
                                width="60"
                                src={"/" + option.name + ".png"}
                                srcSet={"/" + option.name + ".png"}
                                alt={"Logo de " + option.name}
                            />
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Proveedor"
                            variant='outlined'
                            sx={ { backgroundColor: "white", borderRadius:"5%"}}
                            InputProps={ {
                            ...params.InputProps,
                              startAdornment: (
                                    (provider.length > 0) ? (
                                        <InputAdornment position="start">
                                        <img
                                            style={{ width: "50px", height: "auto" }}
                                            src={"/" + params.inputProps.value + ".png"}
                                            alt={"Logo de " + params.inputProps.value}
                                        />
                                        </InputAdornment>
                                    ) : null)
                            } }
                        />

                    )}
                />

                <LoginButton
                    oidcIssuer={idp}
                    redirectUrl={
                        redirectToUrl
                    }
                    onError={handleError}
                >
                    <CSSButton
                        sx={{ mt: "1.5em", mb: "2em" }}
                        variant="contained"
                        type="submit"
                        size="large"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Iniciar sesión
                    </CSSButton>
                </LoginButton>
            </SForm>
        </Box>
    );
}