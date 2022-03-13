import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const Tracker = () => {
  return (
    <div className='tracker'>
      <Sidebar />

      <Outlet />
    </div>
  );
};
