import { useEffect, useState } from 'react';

const Clock = () => {
	let time = new Date().toLocaleTimeString();

	const [ctime, setCtime] = useState(time);

	useEffect(() => {
		const interval = setInterval(updateTime, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	function updateTime() {
		time = new Date().toLocaleTimeString();
		setCtime(time);
	}

	return <div className='clock'>{ctime}</div>;
};

export default Clock;
