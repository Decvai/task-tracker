import { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginAsync, registrationAsync } from './auth.slice';

export const Registration: FC = () => {
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useAppDispatch();

	const clearRegistrationForm = () => {
		setEmail(() => '');
		setNickname(() => '');
		setPassword(() => '');
		setConfirmPassword(() => '');
	};

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const emailBuffer = email;
		const passwordBuffer = password;
		dispatch(registrationAsync({ email, nickname, password })).then(() => {
			dispatch(
				loginAsync({
					email: emailBuffer,
					password: passwordBuffer,
				})
			);
		});
		clearRegistrationForm();
	};

	return (
		<div className='flex-wrap'>
			<div className='authorization'>
				<div className='authorization__header'>Sign up</div>
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
						value={nickname}
						onChange={e => setNickname(e.target.value)}
						type='text'
						placeholder='Nickname'
					/>

					<span className='authorization__span'></span>
					<input
						className='authorization__input'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
					/>
					<span className='authorization__span'></span>
					<input
						className='authorization__input'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
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
