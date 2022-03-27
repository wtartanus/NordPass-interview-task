const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export default getAuthHeader;
