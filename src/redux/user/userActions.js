import userTypes from './userTypes';

export const createUser = (data) => ({
  type: userTypes.CREATE_USER,
  payload: data,
});

export const fetchUserData = (data) => ({
  type: userTypes.FETCH_USER_DATA,
  payload: data,
});

export const addUserTodo = (data) => ({
  type: userTypes.ADD_USER_TODO,
  payload: data,
});
export const editUserTodo = (data) => ({
  type: userTypes.EDIT_USER_TODO,
  payload: data,
});

export const deleteUserTodo = (data) => ({
  type: userTypes.DELETE_USER_TODO,
  payload: data,
});
