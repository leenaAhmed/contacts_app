import { ADD_USER, EDIT_USER, DELETE_USER, SEARCH_USER } from './actions';

const initialState = {
  users: [],
  searchQuery: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case SEARCH_USER:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
