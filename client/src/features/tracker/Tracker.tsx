import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Calendar } from './Calendar';
import { Day } from './Day';

export const Tracker = () => {
  return (
    <div className='tracker'>
      <Sidebar />

      <Routes>
        <Route path='/' element={<Calendar />} />
        <Route path='/days/:id' element={<Day />} />

        {/* <Redirect to='/' /> */}
      </Routes>
    </div>
  );
};
