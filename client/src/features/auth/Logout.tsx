import { ButtonHTMLAttributes, FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { logout } from './authSlice';

type LogoutProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Logout: FC<LogoutProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <button onClick={logoutHandler} {...rest}>
      {children || 'Logout'}
    </button>
  );
};
