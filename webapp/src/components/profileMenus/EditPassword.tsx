import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { editPassword, getUserInSesion } from 'api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as fieldsValidation from '../../utils/fieldsValidation';
import ProfileTemplate from "./ProfileTemplate";
import { temporalSuccessMessage } from "utils/MessageGenerator";

//#region DEFINICION DE COMPONENTES STYLED

const StyledBox = styled(Box)({
    marginTop: '1em',
    marginLeft: '2em',
});

const CSSTypography = styled(Typography)({
    color: "white",
    fontFamily: 'Calibri',
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

//#endregion


export function EditPassword() {

    const navigate = useNavigate();

    const schema = fieldsValidation.editProfileValidation;
    type EditSchema = yup.InferType<typeof schema>;
    const { register, handleSubmit, formState: { errors } } = useForm<EditSchema>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<EditSchema> = data => tryToEdit(data);


    const [confirmPass, setConfirmPass] = useState('')

    const [currentPassword, setCurrentPassword] = useState('')

    const user = getUserInSesion();


    const tryToEdit = async(editions: EditSchema) => {

        if (currentPassword !== undefined && currentPassword !== '' && currentPassword !== null) {
            if (confirmPass !== undefined && confirmPass !== '' && confirmPass !== null) {
                if (fieldsValidation.checkPasswords(confirmPass, editions.newPassword)) {
                    await editPassword(currentPassword, editions.newPassword).then(() => {
                        temporalSuccessMessage("Contraseña editada correctamente. ¿Quién se sabía la antigua?");
                        navigate("/home/edit")
                    }).catch((e) => {
                        fieldsValidation.showError("No se actualizó la contraseña", e as string, () => { });
                    })
                } else {
                    fieldsValidation.showError("No se ha podido actualizar la contraseña", "Las contraseñas no coinciden", () => { });
                }
            }
            else {
                fieldsValidation.showError("No se ha podido actualizar la contraseña", "Debe confirmar la nueva contraseña", () => { });
            }
        } else {
            fieldsValidation.showError("No se ha podido actualizar la contraseña", "Debe introducir la contraseña actual", () => { });
        }

    }

    return (
        <StyledBox component="form" onSubmit={handleSubmit(onSubmit)}>
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
                    Actualizar contraseña
                </CSSTypography>



                <CSSTextField sx={{ mt: "0.8em" }}
                    id="oldPasswordEP"
                    label="Contraseña actual"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    onChange={(e: any) => setCurrentPassword(e.target.value)}
                />

                <CSSTextField sx={{ mt: "0.3em" }}
                    id="passwordSU"
                    label="Nueva contraseña"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    {...register("newPassword")}

                    helperText={errors.newPassword ? errors.newPassword.message : ''}
                />

                <CSSTextField sx={{ mt: "0.3em" }}
                    id="confirmPasswordSU"
                    label="Repite la nueva contraseña"
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
                    data-testid="editPasswordButton"
                >
                    Editar perfil
                </CSSButton>

            </ProfileTemplate>
        </StyledBox>
    )
}