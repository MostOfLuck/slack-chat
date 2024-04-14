import * as Yup from 'yup';

const signupSchema = (
  userNameLength,
  passwordLength,
  requiredField,
  passwordMatching,
) => Yup.object().shape({
  username: Yup
    .string()
    .trim()
    .min(3, userNameLength)
    .max(20, userNameLength)
    .required(requiredField),
  password: Yup
    .string()
    .min(6, passwordLength)
    .trim()
    .required(requiredField),
  passwordConfirmation: Yup
    .string()
    .trim()
    .oneOf([Yup.ref('password')], passwordMatching)
    .required(requiredField),
});

export default signupSchema;
