import { FC } from "react";
import { Link } from "react-router-dom";

export const Page404: FC = () => (
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
