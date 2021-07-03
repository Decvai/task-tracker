import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import { AuthInput } from './AuthInput/AuthInput';

export const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(login(email, password));
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
			</div>
		</div>
	);
};
