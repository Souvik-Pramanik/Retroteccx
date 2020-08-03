import yup from 'yup';

const signinValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(8)
        .max(16)
        .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, { message: 'Password must have at least 8 charactes, 1 letter, 1 number and 1 special character', excludeEmptyString: true })
        .required()
});
export default signinValidationSchema;