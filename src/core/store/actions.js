export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users
  });
  
  export const addUser = (user) => ({
    type: 'ADD_USER',
    payload: user
  });
  
  export const deleteUser = (id) => ({
    type: 'DELETE_USER',
    payload: id
  });
  
  export const editUser = (id, data) => ({
    type: 'EDIT_USER',
    payload: { id, data }
  });

  export const searchUser = (query) => ({
    type: 'SEARCH_USER',
    payload: query,
  });