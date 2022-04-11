import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth, selectIsAuth, selectLoading } from './features/auth/authSlice';
import { Login } from './features/auth/Login';
import { Registration } from './features/auth/Registration';
import { Calendar } from './components/Calendar/Calendar';
import { Day } from './components/Day/Day';
import { Tracker } from './components/Tracker/Tracker';
import { LoadingPage } from './components/LoadingPage/LoadingPage';
import { Page404 } from './components/Page404/Page404';
import { AppLayout } from './components/Layout/AppLayout';

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(auth());
  }, []);

  const isAuth = useAppSelector(selectIsAuth);

  const isLoading = useAppSelector(selectLoading);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <AppLayout>
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
      </AppLayout>
    </Router>
  );
};
