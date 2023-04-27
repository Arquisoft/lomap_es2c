import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { IconContainer, StyledRating, customIcons } from './StyledRating';


const CSSTypography = styled(Typography)({
    color: '#81c784',
    fontSize: '1.3em',
    fontFamily: 'Calibri',
});

const CSSTextField = styled(TextField)({
    marginBottom: '0.8em',
    '& label.Mui-focused': {
        color: '#81c784',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#1f4a21',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'grey',
        },
        '&:hover fieldset': {
            borderColor: '#1f4a21',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#81c784',
        },
    }, '.MuiFormHelperText-root': {
        color: 'red !important',
    }
});

const CoordinatesBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})


const LegendTypography = styled(Typography)({
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
});

export default function PlaceComponent(props: any) {

    const navigate = useNavigate()

    let place = props.place;
    let groupname = props.group;

    return (
        <>
            <Box>
                <CSSTypography variant="body1" align="center"
                    sx={{ mt: "0.5em", mb: "0.5em" }}>
                    {place.nombre}
                </CSSTypography>

                <CSSTextField
                    id="placename-SP"
                    variant="outlined"
                    label="Categoría"
                    value={place.category ? place.category : "Otro"}
                    fullWidth
                    disabled
                />
                <CoordinatesBox>
                    <CSSTextField
                        id="longitude-SP"
                        label="Longitud"
                        value={(place.longitude.toString().substring(0, 8))}
                        placeholder="Longitud"
                        disabled

                    />
                    <CSSTextField
                        id="latitude-SP"
                        label="Latitud"
                        value={(place.latitude.toString().substring(0, 8))}
                        placeholder="Latitud"
                        disabled
                    />
                </CoordinatesBox>


                <Box>
                    <LegendTypography sx={{ mb: "0.3em" }}> Reseña: </LegendTypography>

                    <textarea
                        id="review-SP"
                        placeholder={place.comments[0] ? place.comments[0].comment : "Sin reseña"}
                        style={{ width: '98.7%', height: '7vh', resize: 'none' }}
                        readOnly
                    />

                </Box>
                <Box sx={{ gridColumn: 3 }}>
                    <LegendTypography sx={{ mt: "0.8em", mb: "0.3em" }}> Valoración: </LegendTypography>
                    <StyledRating
                        name="highlight-selected-only"
                        value={parseInt(place.reviewScore, 10) > 5 ? 5 : parseInt(place.reviewScore, 10)}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        highlightSelectedOnly
                        readOnly
                    />
                </Box>

            </Box>
        </>
    );
}
