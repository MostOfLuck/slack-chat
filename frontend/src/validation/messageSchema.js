import * as Yup from 'yup';

const messageSchema = (requiredField) => Yup.object().shape({
  text: Yup
    .string()
    .trim()
    .required(requiredField),
});

export default messageSchema;
