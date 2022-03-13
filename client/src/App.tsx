import { useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { authAsync, getIsAuth } from './features/auth/authSlice';
import { Login } from './features/auth/Login';
import { Registration } from './features/auth/Registration';
import { Calendar } from './features/tracker/Calendar';
import { Day } from './features/tracker/Day';
import { Tracker } from './features/tracker/Tracker';

// TODO: move to a different file
const Page404 = () => (
  <main
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '8px',
      height: '100%',
      width: '100%',
      fontSize: '24px',
    }}
  >
    <p>There&apos;s nothing here!</p>
    <Link to='/' style={{ color: 'white', fontSize: '16px' }}>
      Go back to main page
    </Link>
  </main>
);

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
            <Route path='/' element={<Tracker />}>
              <Route index element={<Calendar />} />
              <Route path='days/:id' element={<Day />} />
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
