const logoutUser = () => {
  localStorage.removeItem('FBIdToken');
  window.location.href = '/login'; // redirect to login
};

export default logoutUser;
