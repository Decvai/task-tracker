import { FC } from 'react';
import './appLayout.scss';

export const AppLayout: FC = ({ children, ...rest }) => {
  return (
    <div className='app' {...rest}>
      {children}
    </div>
  );
};
