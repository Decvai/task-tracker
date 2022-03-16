import { useAppSelector } from '../../app/hooks';
import achievementImg from '../../assets/achievement.png';
import defaultAvatar from '../../assets/avatar.jpg';
import { selectCurrentUser } from '../auth/authSlice';
import { Logout } from '../auth/Logout';

const BASE_EXP = 1000;
const FACTOR = 2;

export const Sidebar = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  if(!currentUser) return null;

  const avatar = currentUser.avatar || defaultAvatar;

  const userLvl = Math.floor(Math.pow(currentUser.exp / BASE_EXP, FACTOR)) + 1;
  const expToLvlUp = BASE_EXP * Math.pow(userLvl, FACTOR);
  const expPercent = ((currentUser.exp * 100) / expToLvlUp).toFixed(2);
  const expPercentStyle = {
    '--exp-percent': `${expPercent}%`,
  } as React.CSSProperties;

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
      <Logout />
    </div>
  );
};
