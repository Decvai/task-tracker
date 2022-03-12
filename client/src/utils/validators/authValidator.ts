import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'confirmPassword', function (errorMessage) {
  return this.test(`test-confirm-password`, errorMessage, function (value) {
    return this.parent.password === value;
  });
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(12, 'Must be 12 characters or less')
    .required('Required'),
});

export const registrationValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  nickname: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(12, 'Must be 12 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(12, 'Must be 12 characters or less')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(12, 'Must be 12 characters or less')
    .confirmPassword('Must be equal to password')
    .required('Required'),
});
