const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar__profile'>
				<div className='sidebar__profile-icon'>
					<img
						src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
						alt='avatar'
					/>
				</div>
				<div className='sidebar__profile-nickname'>Cvai</div>
				<div className='sidebar__profile-lvl'>88lvl</div>
				<div className='sidebar__status-bar'>
					<div className='sidebar__status-bar-percent'>33%</div>
					<div className='sidebar__status-bar-scale'>-------</div>
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

export default Sidebar;
