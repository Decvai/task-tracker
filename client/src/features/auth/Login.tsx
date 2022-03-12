import { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { AuthCredentials, loginAsync } from './authSlice';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ErrorIcon from '../../assets/error.png';
import { loginValidationSchema } from '../../utils/validators/authValidator';
import { getErrorMessage } from '../../utils/helpers';

export const Login: FC = () => {
	const dispatch = useAppDispatch();
	const [loginError, setLoginError] = useState<string>('');

	const initialValues: AuthCredentials = {
		email: '',
		password: '',
	};

	const submitHandler = async (credentials: AuthCredentials) => {
		try {
			await dispatch(loginAsync(credentials));
		} catch (err) {
      setLoginError(getErrorMessage(err));
		}
	};

	return (
		<div className='flex-wrap'>
			<div className='authorization'>
				<div className='authorization__header'>Sign in</div>

				<Formik
					initialValues={initialValues}
					onSubmit={submitHandler}
					validationSchema={loginValidationSchema}
				>
					{({ isSubmitting }) => (
						<Form className='authorization__form'>
							<span className='authorization__span'></span>
							<Field
								id='email'
								className='authorization__input'
								name='email'
								type='text'
								placeholder='Email'
							/>
							<ErrorMessage
								className='error'
								component='div'
								name='email'
							/>

							<span className='authorization__span'></span>
							<Field
								id='password'
								className='authorization__input'
								name='password'
								type='password'
								placeholder='Password'
							/>
							<ErrorMessage
								className='error'
								component='div'
								name='password'
							/>

							<div className='confirm-btn authorization__confirm'>
								<input
									className={
										isSubmitting
											? 'submit loading'
											: 'submit'
									}
									type='submit'
									value='Continue'
									disabled={isSubmitting}
								/>
							</div>
						</Form>
					)}
				</Formik>

				{loginError && (
					<div className='log-error'>
						<img src={ErrorIcon} alt='ErrorIcon' />
						{loginError}
					</div>
				)}

				<Link to='/registration' className='authorization__sign-up'>
					Sign up for an account
				</Link>
			</div>
		</div>
	);
};
