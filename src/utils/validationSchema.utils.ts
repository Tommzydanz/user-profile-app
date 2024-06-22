import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const editDetailsValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  job: Yup.string().required('Job Title is required'),
});
