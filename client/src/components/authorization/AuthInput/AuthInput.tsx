import { FC } from 'react';
import styles from './auth-input.module.scss';

interface InputProps {
	value: React.InputHTMLAttributes<HTMLInputElement>['value'];
	type: React.InputHTMLAttributes<HTMLInputElement>['type'];
	placeholder: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthInput: FC<InputProps> = props => {
	return (
		<>
			<span className={styles.span}></span>
			<input
				className={styles.input}
				value={props.value}
				onChange={e => props.setValue(e.target.value)}
				type={props.type}
				placeholder={props.placeholder}
			/>
		</>
	);
};
