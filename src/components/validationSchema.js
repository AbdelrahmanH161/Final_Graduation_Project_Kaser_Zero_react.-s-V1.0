import * as yup from 'yup';

export const validationSchema = yup.object().shape({
        userName:yup.string().required("must enter your name"),
        email:yup.string().required("must enter your email.").email("must enter invalid email."),
        phoneNumber:yup.string().required("must enter your phone number.").min(11,"must enter invalid phone number."),
        password:yup.string().required("must enter your Password.").min(6,"must enter al least 6 character."),
        confirmpassword:yup.string().required("must enter your Confirm Password.").oneOf([yup.ref('password')],"Password & Confirm Password does not match."),
})