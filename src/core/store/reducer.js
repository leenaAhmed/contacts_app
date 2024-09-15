const initialState = {
    users: [],
    searchQuery: '',
  };
  
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERS':
        return { ...state, users: action.payload };  
      case 'ADD_USER':
        return { ...state, users: [...state.users, action.payload] };  
      case 'DELETE_USER':
        return { ...state, users: state.users.filter(user => user.login.uuid !== action.payload) };  
      case 'EDIT_USER':
        return {
          ...state,
          users: state.users.map(user =>
            user.login.uuid === action.payload.id ? { ...user, ...action.payload.data } : user
          )
        }; 
      case 'SEARCH_USER':
        return {
            ...state,
            searchQuery: action.payload,
        };
      default:
        return state;
    }
};
  