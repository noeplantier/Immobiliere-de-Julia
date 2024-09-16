const accountServices = {
  saveToken: (token) => sessionStorage.setItem('token', token),

  logout: () => sessionStorage.removeItem('token'),

  isLogged: () => !!sessionStorage.getItem('token'),
};
export default accountServices;
