import axios from 'axios'; 

const isLocalServer = false;

let SERVER_URL = '';

if (isLocalServer) {
  SERVER_URL = 'http://localhost:9000/';
} else {
  SERVER_URL = 'https://favnoteback.herokuapp.com/';
}

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_REQUEST';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_REQUEST';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_REQUEST';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

const now = new Date();
const createDate = `
${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}.${
  now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
}.${now.getFullYear()} - ${now.getHours()}:${
  now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
}
`;

export const addNewUser = (username, password) => dispatch => {
  dispatch({ type: ADD_USER_REQUEST });

  return axios
    .post(`${SERVER_URL}api/user/register`, {
      username,
      password,
    })
    .then(payload => {
      dispatch({ type: ADD_USER_SUCCESS, payload });
    })
    .catch(() => {
      dispatch({ type: ADD_USER_FAILURE });
    });
};

export const authenticate = (username, password) => dispatch => {
  dispatch({ type: AUTH_REQUEST });
  return axios

    .post(`${SERVER_URL}api/user/login`, {
      username,
      password,
    })
    .then(payload => {
      dispatch({ type: AUTH_SUCCESS, payload });
    })
    .catch(() => {
      dispatch({ type: AUTH_FAILURE });
    });
};

export const fetchItems = itemType => (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST });

  return axios
    .get(`${SERVER_URL}api/notes/type`, {
      params: {
        type: itemType,
        userID: getState().userID,
      },
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data,
          itemType,
        },
      });
    })
    .catch(() => {
      dispatch({ type: FETCH_FAILURE });
    });
};

export const addItem = (itemType, itemContent) => (dispatch, getState) => {
  dispatch({ type: ADD_ITEM_REQUEST });

  return axios
    .post(`${SERVER_URL}api/note`, {
      userID: getState().userID,
      type: itemType,
      ...itemContent,
      created: createDate,
    })
    .then(({ data }) => {
      dispatch({ type: ADD_ITEM_SUCCESS, payload: { itemType, data } });
    })
    .catch(() => {
      dispatch({ type: ADD_ITEM_FAILURE });
    });
};

export const removeItem = (itemType, id) => dispatch => {
  dispatch({ type: REMOVE_ITEM_REQUEST });
  axios
    .delete(`${SERVER_URL}api/note/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_ITEM_SUCCESS,
        payload: {
          itemType,
          id,
        },
      });
    })
    .catch(() => {
      dispatch({ type: REMOVE_ITEM_FAILURE });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_REQUEST });
  axios
    .post(`${SERVER_URL}api/user/logout`)
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({ type: LOGOUT_FAILURE });
    });
};
