import { useEffect, useState } from 'react';

export const Clock = () => {
  let time = new Date().toLocaleTimeString();

  const [ctime, setCtime] = useState(time);

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };

  return <div className='clock'>{ctime}</div>;
};
