import userTypes from './userTypes';
const INITIAL_VALUE = {
  userData: {},
  blogLoading: true,
};
const userReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case userTypes.CREATE_USER:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
