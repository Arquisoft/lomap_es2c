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
import {
    LoginButton,
    useSession,
} from "@inrupt/solid-ui-react";
import { useNavigate } from 'react-router-dom';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';


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
    const { session } = useSession();

    const [providers, setProviders] = useState(GetProviders());
    const navigate = useNavigate();



    const handleLogin = async () => {
        handleIncomingRedirect({ restorePreviousSession: true }).then((s) => {
            console.log("REDIRECT")
            console.log(s)
        })
        document.cookie = "isPodLogged=true; path=/"
        document.cookie = "sameWebId=false; path=/"
    };

    const handleError = async () => {
        logout();
        navigate("/login");
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
                    onChange={(event, newValue) => { setProvider(newValue.name); setIdp(newValue.url) }}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="60"
                                src={"../" + option.name + ".png"}
                                srcSet={"../" + option.name + ".png"}
                                alt={"Logo de " + option.name}
                            />
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Proveedor"
                            inputProps={{
                                ...params.inputProps,
                                startadornment: (
                                    <InputAdornment position="start">
                                        <img src={"../" + params.inputProps.value + ".png"} alt={"Logo de " + params.inputProps.value} />
                                    </InputAdornment>
                                ),

                            }}
                        />

                    )}
                />

                <LoginButton
                    oidcIssuer={idp}
                    redirectUrl={"http://localhost:3000/home/welcome"}
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