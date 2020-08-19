/* eslint-disable no-underscore-dangle */
import {
  ADD_ITEM_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  AUTH_SUCCESS,
  FETCH_SUCCESS,
  ADD_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from 'actions';

export const initialState = {
  userID: window.localStorage.getItem('userID') || '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.itemType]: [...action.payload.data],
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        username: action.username,
        password: action.password,
        userRegistered: true,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.data],
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.data._id,
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(item => item._id !== action.payload.id),
        ],
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userID: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
