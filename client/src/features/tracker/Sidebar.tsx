import { useAppDispatch, useAppSelector } from '../../app/hooks';
import defaultAvatar from '../../assets/avatar.jpg';
import { getCurrentUser, logout } from '../auth/authSlice';
import achievementImg from '../../assets/achievement.png';

const BASE_EXP = 1000;
const FACTOR = 2;

export const Sidebar = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);
  if(!currentUser) return null;

  const avatar = currentUser.avatar || defaultAvatar;

  const userLvl = Math.floor(Math.pow(currentUser.exp / BASE_EXP, FACTOR)) + 1;
  const expToLvlUp = BASE_EXP * Math.pow(userLvl, FACTOR);
  const expPercent = ((currentUser.exp * 100) / expToLvlUp).toFixed(2);
  const expPercentStyle = {
    '--exp-percent': `${expPercent}%`,
  } as React.CSSProperties;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__profile'>
        <div className='sidebar__profile-icon'>
          <img src={avatar} alt='avatar' />
        </div>
        <div className='sidebar__profile-nickname'>{currentUser.nickname}</div>
        <div className='sidebar__profile-lvl'>{userLvl}lvl</div>
        <div className='sidebar__status-bar'>
          <div className='sidebar__status-bar-percent'>{expPercent}%</div>
          <div
            className='sidebar__status-bar-scale'
            style={expPercentStyle}
          ></div>
        </div>
      </div>
      <div className='sidebar__achievements achievements'>
        <div className='achievements__header'>
          <div className='achievements__icon'>
            <img src={achievementImg} alt='achievements icon' />
          </div>
          <p>Achievements</p>
        </div>
        <div className='achievements__list'></div>
      </div>
      <button onClick={logoutHandler} className='sidebar__logout'>
        Logout
      </button>
    </div>
  );
};
