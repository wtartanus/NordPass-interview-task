import {FC} from 'react';
import {useHistory} from 'react-router-dom';

import {Routes} from '~/constants';
import logout from '~/services/logout';

import { useUserContext } from '../../../UserContext';

import './header-style.scss';

interface IHeader {
  vulnerableItemsCount: number;
  username: string;
}

const Header: FC<IHeader> = ({vulnerableItemsCount, username}) => {
  const {deleteData} = useUserContext();
  const {push} = useHistory();

  const processLogout = async () => {
    await logout();
    deleteData();
    push(Routes.Login);
  }

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={processLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${vulnerableItemsCount} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  )
};

export default Header;
