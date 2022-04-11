import { FC } from 'react';
import { Link } from 'react-router-dom';
import './page404.scss';

export const Page404: FC = () => (
  <main className='page404'>
    <p>There&apos;s nothing here!</p>
    <Link to='/' className='page404__link'>
      Go back to main page
    </Link>
  </main>
);
