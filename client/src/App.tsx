import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Tracker } from './features/tracker/Tracker';
import { Registration } from './features/auth/Registration';
import { Login } from './features/auth/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { authAsync, getIsAuth } from './features/auth/authSlice';

export const App = () => {
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authAsync());
  }, []);

  return (
    <Router>
      <div className='app'>
        {isAuth ? (
          <Routes>
            <Route path='/' element={<Tracker />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            {/* <Redirect to='/login' /> */}
          </Routes>
        )}
      </div>
    </Router>
  );
};
