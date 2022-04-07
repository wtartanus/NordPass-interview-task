const getAuthHeader = () => (
  new Headers({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  })
);

export default getAuthHeader;
