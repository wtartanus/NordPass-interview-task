import {API} from '~/constants';

import getUrl from '../utils/getUrl';
import getAuthHeader from '~/utils/getAuthHeader';

const logout = async () => {
    await fetch(getUrl(API.Logout), {
        method: 'POST',
        headers: getAuthHeader(),
    });
    
    localStorage.removeItem('token');
};

export default logout;