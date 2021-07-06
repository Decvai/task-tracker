import { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { registrationAsync } from './auth.slice';
import { AuthInput } from './AuthInput/AuthInput';

export const Registration: FC = () => {
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useAppDispatch();

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(registrationAsync({ email, nickname, password }));
	};

	return (
		<div className='flex-wrap'>
			<div className='authorization'>
				<div className='authorization__header'>Sign up</div>
				<form className='authorization__form' onSubmit={submitHandler}>
					<AuthInput
						value={email}
						setValue={setEmail}
						type='text'
						placeholder='Email'
					/>
					<AuthInput
						value={nickname}
						setValue={setNickname}
						type='text'
						placeholder='Nickname'
					/>
					<AuthInput
						value={password}
						setValue={setPassword}
						type='password'
						placeholder='Password'
					/>
					<AuthInput
						value={confirmPassword}
						setValue={setConfirmPassword}
						type='password'
						placeholder='Confirm password'
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

				<Link to='/login' className='authorization__login'>
					Already have an account? Log in
				</Link>
			</div>
		</div>
	);
};
