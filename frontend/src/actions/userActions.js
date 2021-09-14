export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  const url = "/api/users/login";

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    const data = await resp.json();

    dispatch({ type: "LOGIN_SUCCESS", payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });

  const url = "/api/users";

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    const data = await resp.json();

    dispatch({ type: "REGISTER_SUCCESS", payload: data });

    dispatch({ type: "LOGIN_SUCCESS", payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: "LOGOUT" });
  dispatch({ type: "USER_ORDER_RESET" });
  dispatch({ type: "DETAIL_RESET" });
  // localStorage.removeItem("cartItems");
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: "DETAIL_REQUEST" });

  const url = `/api/users/${id}`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    const data = await resp.json();

    setTimeout(() => {
      dispatch({ type: "DETAIL_SUCCESS", payload: data });
    }, 500);
  } catch (error) {
    dispatch({
      type: "DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: "UPDATE_REQUEST" });

  const url = `/api/users/profile`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    const data = await resp.json();

    setTimeout(() => {
      dispatch({ type: "UPDATE_SUCCESS", payload: data });
    }, 500);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: "UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }, 500);
  }
};

export const getUsersList = () => async (dispatch, getState) => {
  dispatch({ type: "USERS_LIST_REQUEST" });

  const url = `/api/users`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    const data = await resp.json();

    setTimeout(() => {
      dispatch({ type: "USERS_LIST_SUCCESS", payload: data });
    }, 500);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: "USERS_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }, 500);
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: "USER_DELETE_REQUEST" });

  const url = `/api/users/${id}`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    // const data = await resp.json();

    setTimeout(() => {
      dispatch({ type: "USER_DELETE_SUCCESS" });
    }, 400);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: "USER_DELETE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }, 300);
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: "USER_UPDATE_REQUEST" });

  const url = `/api/users/${user._id}`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    const data = await resp.json();

    setTimeout(() => {
      dispatch({ type: "USER_UPDATE_SUCCESS" });
    }, 400);

    dispatch({ type: "DETAIL_SUCCESS", payload: data });
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }, 300);
  }
};
