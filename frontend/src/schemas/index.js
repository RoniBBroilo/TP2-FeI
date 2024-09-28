import * as Yup from "yup";

export const registerPatientSchema = Yup.object({
  dni: Yup.string()
    .matches(/^\d{7,8}$/, "El DNI debe ser numérico y contener 7 u 8 dígitos")
    .required("DNI es requerido"),
  nombre: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El nombre no puede contener números")
    .required("Nombre es requerido"),
  apellido: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El apellido no puede contener números")
    .required("Apellido es requerido"),
  email: Yup.string()
    .required("El email es obligatorio")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email inválido"
    ),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Contraseña es requerida"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar contraseña es requerido"),
});

export const registerPsychologistSchema = Yup.object({
  matricula: Yup.string()
    .matches(
      /^\d{4,10}$/,
      "La matrícula debe ser numérica y contener entre 4 y 10 dígitos"
    )
    .required("Matrícula es requerida"),
  nombre: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El nombre no puede contener números")
    .required("Nombre es requerido"),
  apellido: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El apellido no puede contener números")
    .required("Apellido es requerido"),
  telefono: Yup.string()
    .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
    .required("Teléfono es requerido"),
  promedio: Yup.number()
    .min(0, "El promedio debe ser mayor o igual a 0")
    .max(10, "El promedio debe ser menor o igual a 10")
    .required("Promedio es requerido"),
  codigo_postal: Yup.string().required("Código postal es requerido"),
  id_tematica: Yup.string().required("Temática es requerida"),
  id_patologia: Yup.string().required("Patología es requerida"),
  id_corriente: Yup.string().required("Corriente psicológica es requerida"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Contraseña es requerida"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar contraseña es requerido"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("El email es obligatorio")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email inválido"
    ),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Contraseña es requerida"),
});

export const editPsychologist = Yup.object({
  matricula: Yup.string()
    .matches(
      /^\d{4,10}$/,
      "La matrícula debe ser numérica y contener entre 4 y 10 dígitos"
    )
    .required("Matrícula es requerida"),
  nombre: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El nombre no puede contener números")
    .required("Nombre es requerido"),
  apellido: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El apellido no puede contener números")
    .required("Apellido es requerido"),
  telefono: Yup.string()
    .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
    .required("Teléfono es requerido"),
  promedio: Yup.number()
    .min(0, "El promedio debe ser mayor o igual a 0")
    .max(10, "El promedio debe ser menor o igual a 10")
    .required("Promedio es requerido"),
  codigo_postal: Yup.string().required("Código postal es requerido"),
  id_tematica: Yup.string().required("Temática es requerida"),
  id_patologia: Yup.string().required("Patología es requerida"),
  id_corriente: Yup.string().required("Corriente psicológica es requerida"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
});

export const editPatient = Yup.object({
  dni: Yup.string()
    .matches(/^\d{7,8}$/, "El DNI debe ser numérico y contener 7 u 8 dígitos")
    .required("DNI es requerido"),
  nombre: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El nombre no puede contener números")
    .required("Nombre es requerido"),
  apellido: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "El apellido no puede contener números")
    .required("Apellido es requerido"),
  email: Yup.string()
    .required("El email es obligatorio")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email inválido"
    ),
});
