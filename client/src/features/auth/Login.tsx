import { FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { AuthInput } from './AuthInput/AuthInput';
import { loginAsync } from './auth.slice';
import { Link } from 'react-router-dom';

export const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(loginAsync({ email, password }));
	};

	return (
		<div className='flex-wrap'>
			<div className='authorization'>
				<div className='authorization__header'>Sign in</div>
				<form className='authorization__form' onSubmit={submitHandler}>
					<AuthInput
						value={email}
						setValue={setEmail}
						type='text'
						placeholder='Email'
					/>
					<AuthInput
						value={password}
						setValue={setPassword}
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
				</form>

				<Link to='/registration' className='authorization__sign-up'>
					Sign up for an account
				</Link>
			</div>
		</div>
	);
};
