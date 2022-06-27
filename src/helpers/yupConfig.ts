import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Campo requerido",
  },
  string: {
    email: "Correo electrónico no válido.",
    min: "Ingrese mínimo ${min} caracteres",
    max: "Ingrese máximo ${max} caracteres",
    length: "Campo debe ser de ${length} dígitos",
  },
  number: {
    min: "Valor inválido (debe ser mayor o igual a ${min})",
    max: "Valor inválido (debe ser menor o igual a ${max})",
    positive: "El número  debe ser positivo.",
  },
});

export default yup;
