import { Loader } from '../Loader/Loader';

export const LoadingPage = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px',
    }}
  >
    <Loader />
    <div style={{ fontSize: '24px', paddingLeft: '8px' }}>Loading...</div>
  </div>
);
