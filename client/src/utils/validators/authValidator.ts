import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
	email: Yup.string().email('Invalid email address').required('Required'),
	password: Yup.string()
		.min(3, 'Must be 3 characters or more')
		.max(12, 'Must be 12 characters or less')
		.required('Required'),
});
