import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const CSSTypography = styled(Typography)({
  color: '#81c784',
  fontSize:'1.3em',
  fontFamily: 'Calibri',
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
          borderColor: 'grey',
      },
      '&:hover fieldset': {
          borderColor: '#1f4a21',
      },
      '&.Mui-focused fieldset': {
          borderColor: '#1f4a21',
      },
  }, '.MuiFormHelperText-root': {
      color: 'red !important',
    }
});


const LegendTypography = styled(Typography)({
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
   });

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export function RadioGroupRating() {
  return (
    <StyledRating
      name="highlight-selected-only"
      defaultValue={4}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}



export default function AddPlace() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
 
  const { lat, lon } = useParams();


  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <CSSTypography variant="body1" align="center"
          sx={{mb:"0.5em" }}>
          Añadir lugar
      </CSSTypography>
      <CSSTextField
                    id="placename-AP"
                    variant="outlined"
                    label="Nombre del lugar"
                    placeholder="Nombre del lugar"
                    fullWidth
                    {...register("placename")}
                    helperText={errors.placename ? 'Nombre inválido' : ''}
         
        /> 
        <CSSTextField
              id="longitude-AP"
              label={lon? ("Longitud: " + lon.toString()) : "Longitud"}
              placeholder="Longitud"
              disabled={lon? true : false}
              type="number"
              fullWidth
              {...register("longitude")}
              helperText={errors.longitude ? 'La coordenada de longitud no es válida' : ''}
          />   
          <CSSTextField
              id="latitude-AP"
              label={lat?  ("Latitud: " + lat.toString()) : "Latitud"}
              placeholder="Latitud"
              disabled={lat? true : false}
              type="number"
              fullWidth
              {...register("latitude")}
              helperText={errors.longitude ? 'La coordenada de latitud no es válida' : ''}
          /> 
          <LegendTypography   sx={{ mb:"0.3em" }}> Reseña: </LegendTypography>
         
           <textarea 
           placeholder="Reseña..."
           style={{ width: 200 }}   
           {...register("review-AP", {required: true, maxLength: 150})} />


          <LegendTypography sx={{ mt: "0.8em", mb:"0.3em" }}> Valoración: </LegendTypography>
          <RadioGroupRating/>
           <CSSButton
                    sx={{ mt: "1.2em"}}
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                >
                   Añadir
                </CSSButton>

    </Box>
  );
}