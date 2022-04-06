import {API} from '~/constants';
import getUrl from '~/utils/getUrl';
import getAuthHeader from '~/utils/getAuthHeader';

import request from './request';

const logout = async () => {
    await request(
        getUrl(API.Logout),
        getAuthHeader(),
    );
    
    localStorage.removeItem('token');
};

export default logout;