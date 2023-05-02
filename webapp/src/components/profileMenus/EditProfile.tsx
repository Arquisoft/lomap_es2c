import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { editUserDetails, getUserInSesion } from 'api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as fieldsValidation from '../../utils/fieldsValidation';
import ProfileTemplate from "./ProfileTemplate";
import EditIcon from '@mui/icons-material/Edit';
import { temporalSuccessMessage } from "utils/MessageGenerator";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'utils/redux/store';
import { setLastPath } from 'utils/redux/action';

//#region DEFINICION DE COMPONENTES STYLED

const StyledBox = styled(Box)({
    marginTop: '1em',
    marginLeft: '2em',
});


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
    const dispatch = useDispatch();


    const schema = fieldsValidation.editProfileValidation;
    type EditSchema = yup.InferType<typeof schema>;
    const { register, handleSubmit } = useForm<EditSchema>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<EditSchema> = data => tryToEdit(data);

    const user = getUserInSesion()

    const url = useSelector((state: RootState) => state.app.lastPath);

    const showPassword = () => {
        dispatch(setLastPath("/home/edit/psw"))
        navigate("/home/edit/psw")
    }

    const goBack = () => {
        console.log(url)
        if (url === "/home/edit" || url === null || url === "/home/edit/psw")
            navigate("/")
        else
            navigate(url)
    }

    const tryToEdit = async(editions: EditSchema) => {

        if (editions.biography !== undefined && editions.biography !== '' && editions.biography !== null) {
            let editedUser = { username: user.username, webID: user.webID, password: user.password, description: editions.biography, img: user.img }
            await editUserDetails(editedUser).then(() => {
                temporalSuccessMessage("Tú perfil se ha editado correctamente. La nueva biografía te sienta mejor.");
                goBack();
            }).catch((e) => {
                fieldsValidation.showError("No se ha podido actualizar el perfil.", e as string, () => { });
                return false;
            })
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
        </StyledBox>
    )
}