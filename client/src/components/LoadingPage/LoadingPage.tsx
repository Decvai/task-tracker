import { FC } from 'react';
import { Loader } from '../Loader/Loader';
import './loadingPage.scss';

export const LoadingPage: FC = () => (
  <div className='loading-page'>
    <Loader />
    <div className='loading-page__text'>Loading...</div>
  </div>
);
