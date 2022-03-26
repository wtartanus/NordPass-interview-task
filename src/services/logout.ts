import {API} from '~/constants';

import getUrl from '../utils/getUrl';

const logout = async () => {
    const url = getUrl(API.Logout);

    try {
        await fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
        });
        localStorage.removeItem('token');
    } catch (e) {
        console.error(e.message);
    }
};

export default logout;