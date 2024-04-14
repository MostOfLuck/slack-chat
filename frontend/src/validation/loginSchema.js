import * as Yup from 'yup';

const loginSchema = (requiredField) => Yup.object().shape({
  username: Yup
    .string()
    .trim()
    .required(requiredField),
  password: Yup
    .string()
    .trim()
    .required(requiredField),
});

export default loginSchema;
