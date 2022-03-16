import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth, selectIsAuth, selectLoading } from './features/auth/authSlice';
import { Login } from './features/auth/Login';
import { Registration } from './features/auth/Registration';
import { Calendar } from './features/tracker/Calendar';
import { Day } from './features/tracker/Day';
import { Tracker } from './features/tracker/Tracker';
import { LoadingPage } from './utils/LoadingPage/LoadingPage';
import { Page404 } from './utils/Page404/Page404';

export const App = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector(selectLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  if (isLoading) {
    return (
      <LoadingPage />
    )
  }

  return (
    <Router>
      <div className='app'>
        {isAuth ? (
          <Routes>
            <Route path='/' element={<Tracker />}>
              <Route index element={<Calendar />} />
              <Route path='days/:dayId' element={<Day />} />
              <Route path='*' element={<Page404 />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path='/'>
              <Route path='registration' element={<Registration />} />
              <Route index element={<Login />} />
              <Route path='*' element={<Page404 />} />
            </Route>
          </Routes>
        )}
      </div>
    </Router>
  );
};
