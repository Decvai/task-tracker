import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { logout } from './authSlice';

export const Logout: FC = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <button onClick={logoutHandler} className='sidebar__logout'>
      Logout
    </button>
  );
};
