import api from './api';

const UserService = {
  getUsers: () => {
    return api.get('users');
  },

  getUserById: userId => {
    return api.get(`users/${userId}`);
  },

  addNewUser: data => {
    return api.post('users', data);
  },

  updateUser: (userId, data) => {
    return api.put(`users/${userId}`, data);
  },

  deleteUser: userId => {
    return api.delete(`users/${userId}`);
  },
};

export default UserService;
