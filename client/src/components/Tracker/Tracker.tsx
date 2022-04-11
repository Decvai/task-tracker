import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Layout/Sidebar';
import './tracker.scss';

export const Tracker = () => {
  return (
    <div className='tracker'>
      <Sidebar />

      <Outlet />
    </div>
  );
};
