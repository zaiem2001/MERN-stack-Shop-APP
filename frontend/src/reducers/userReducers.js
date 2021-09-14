export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { loading: true };

    case "LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };

    case "LOGIN_FAIL":
      return { loading: false, error: action.payload };

    case "LOGOUT":
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { loading: true };

    case "REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };

    case "REGISTER_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "DETAIL_REQUEST":
      return { ...state, loading: true };

    case "DETAIL_SUCCESS":
      return { loading: false, user: action.payload };

    case "DETAIL_FAIL":
      return { loading: false, error: action.payload };

    case "DETAIL_RESET":
      return { user: {} };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loading: true };

    case "UPDATE_SUCCESS":
      return { loading: false, success: true, user: action.payload };

    case "UPDATE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const usersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "USERS_LIST_REQUEST":
      return { loading: true };

    case "USERS_LIST_SUCCESS":
      return { loading: false, users: action.payload };

    case "USERS_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return { loading: true };

    case "USER_DELETE_SUCCESS":
      return { loading: false, success: true };

    case "USER_DELETE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { loading: true };

    case "USER_UPDATE_SUCCESS":
      return { loading: false, success: true };

    case "USER_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    case "USER_UPDATE_RESET":
      return {
        user: {},
      };

    default:
      return state;
  }
};
