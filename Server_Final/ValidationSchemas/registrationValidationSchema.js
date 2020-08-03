import yup from 'yup';
const registrationValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(8)
        .max(16)
        .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, { message: 'Password must have at least 8 charactes, 1 letter, 1 number and 1 special character', excludeEmptyString: true })
        .required(),
    username: yup
        .string()
        .required()
        .matches(/^[a-z ,.'-]+$/),
    aadhar: yup
        .number()
        .min(12)
        .positive()
        .required()
        .integer(),
    mobile: yup
        .number()
        .min(10)
        .positive()
        .required()
        .integer()
})
export default registrationValidationSchema;