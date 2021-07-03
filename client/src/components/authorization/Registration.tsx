import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthInput } from './AuthInput/AuthInput';

export const Registration: FC = () => {
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch();

	return (
		<div className='flex-wrap'>
			<div className='authorization'>
				<div className='authorization__header'>Sign up</div>
				<form
					className='authorization__form'
					onSubmit={e => e.preventDefault()}
				>
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
			</div>
		</div>
	);
};
