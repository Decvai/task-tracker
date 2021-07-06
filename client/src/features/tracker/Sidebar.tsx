import Avatar from '../../assets/avatar.jpg';

export const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar__profile'>
				<div className='sidebar__profile-icon'>
					<img src={Avatar} alt='avatar' />
				</div>
				<div className='sidebar__profile-nickname'>Cvai</div>
				<div className='sidebar__profile-lvl'>88lvl</div>
				<div className='sidebar__status-bar'>
					<div className='sidebar__status-bar-percent'>33%</div>
					<div className='sidebar__status-bar-scale'></div>
				</div>
			</div>
			<div className='sidebar__achievements'>
				<div className='sidebar__achievements-icon'>
					<img
						src='https://pics.freeicons.io/uploads/icons/png/19795616721571183081-512.png'
						alt='achievements icon'
					/>
				</div>
				<p>Achievements</p>
			</div>
		</div>
	);
};
