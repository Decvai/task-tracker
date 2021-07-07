import { FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { AuthCredentials, loginAsync } from './auth.slice';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { loginValidate } from '../../utils/validators/auth.validator';

export const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();

	const initialValues: AuthCredentials = {
		email: '',
		password: '',
	};

	const clearLoginForm = () => {
		setEmail(() => '');
		setPassword(() => '');
	};

	// const submitHandler = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();

	// 	dispatch(loginAsync({ email, password }));
	// 	clearLoginForm();
	// };

	const submitHandler = (credentials: AuthCredentials) => {
		console.log(credentials);
	};

	return (
		<div className='flex-wrap'>
			<div className='authorization'>
				<div className='authorization__header'>Sign in</div>
				{/* <form className='authorization__form' onSubmit={submitHandler}>
					<span className='authorization__span'></span>
					<input
						className='authorization__input'
						value={email}
						onChange={e => setEmail(e.target.value)}
						type='text'
						placeholder='Email'
					/>
					<span className='authorization__span'></span>
					<input
						className='authorization__input'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
					/>

					<div className='confirm-btn authorization__confirm'>
						<input
							className={
								// isSubmitting ? 'submit loading' : 'submit'
								'submit'
							}
							type='submit'
							value='Continue'
							// disabled={isSubmitting}
						/>
					</div>
				</form> */}

				<Formik
					initialValues={initialValues}
					onSubmit={submitHandler}
					validate={loginValidate}
				>
					{() => {
						<Form>test</Form>;
					}}
				</Formik>
				{/* 
				<form className='authorization__form' onSubmit={submitHandler}>
					<span className='authorization__span'></span>
					<input
						className='authorization__input'
						value={email}
						onChange={e => setEmail(e.target.value)}
						type='text'
						placeholder='Email'
					/>
					<span className='authorization__span'></span>
					<input
						className='authorization__input'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
					/>

					<div className='confirm-btn authorization__confirm'>
						<input
							className={
								// isSubmitting ? 'submit loading' : 'submit'
								'submit'
							}
							type='submit'
							value='Continue'
							// disabled={isSubmitting}
						/>
					</div>
				</form> */}

				<Link to='/registration' className='authorization__sign-up'>
					Sign up for an account
				</Link>
			</div>
		</div>
	);
};
