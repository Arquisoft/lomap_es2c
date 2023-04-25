import * as yup from "yup";
import Swal from "sweetalert2";

export function showError(
  errorTitle: string,
  errorMessage: string,
  f: () => any
) {
  Swal.fire({
    icon: "error",
    title: errorTitle,
    text: errorMessage,
    confirmButtonColor: "#81c784",
  }).then((result) => {
    if (result.isConfirmed) f();
  });
}

// User validations

export function checkPasswords(pass: String, confirmPass: String) {
  if (pass == null ||  pass === undefined || pass.trim().length === 0)
    return false;
  return confirmPass === pass;
}

const usernameConstraints = yup
  .string()
  .matches(
    /^[A-Za-z0-9]+$/,
    "El nombre de usuario debe de empezar por una letra"
  )
  .min(6, "El nombre de usuario debe de tener entre 6 y 10 caracteres")
  .max(10, "El nombre de usuario debe de tener entre 6 y 10 caracteres");

const passwordConstraints = yup
  .string()
  .matches(/^.*[0-9].*$/, "La contraseña debe contener al menos un número")
  .matches(
    /^.*[A-Z].*$/,
    "La contraseña debe contener al menos una letra mayúscula"
  )
  .matches(
    /^.*\W.*$/,
    "La contraseña debe contener al menos un caracter especial"
  )
  .min(8, "La contraseña debe de tener una longitud mínima de 8 caracteres")
  .max(24, "La contraseña debe de tener una longitud máxima de 24 caracteres");


const biographyConstraints = yup
  .string()
  .max(100, "La biografía puede contener un máximo de 100 caracteres");


export const signupValidationSchema = yup.object({
    username: usernameConstraints.required("Debe de introducir un nombre de usuario"),
    password: passwordConstraints.required("Debe de introducir una contraseña")
}).required();

export const editProfileValidation = yup.object({
    username: usernameConstraints.notRequired(),
    biography: biographyConstraints.notRequired()
});

export const passwordValidation = yup
  .object({
    password: passwordConstraints,
  })
  .required();

// Group validations
export const groupValidation = yup.object({
  groupName: yup
    .string()
    .matches(
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/g,
      "El nombre no puede contener caracteres especiales"
    )
    .min(3, "El nombre debe de tener entre 3 y 30 caracteres")
    .max(30, "El nombre debe de tener entre 3 y 30 caracteres")
    .required(),
});

// Place validations
export const placeValidation = yup.object({
    placename: yup.string().matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/g, "El nombre no puede contener caracteres especiales")
        .min(3, "El nombre debe de tener entre 3 y 30 caracteres")
        .max(30, "El nombre debe de tener entre 3 y 30 caracteres")
        .required("Debes de introducir un nombre"),
    longitude: yup.number().min(-90, "La longitud debe estar comprendida entre -180 y 180")
        .max(90, "La longitud debe estar entre -180 y 180")
        .required("La longitud es un campo obligatorio"),
    latitude: yup.number().min(-90, "La latitud debe estar comprendida entre -90 y 90")
        .max(90, "La latitud debe estar entre -90 y 90")
        .required("La latitud es un campo obligatorio"),
    review: yup.string().max(150, "La longitud máxima permitida es de 150 caracteres"),
});
