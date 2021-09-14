export const createNewOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_REQUEST" });

  const url = `/api/orders`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(order),
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

    dispatch({ type: "ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_DETAILS_REQUEST" });

  const url = `/api/orders/${id}`;

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

    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_PAY_REQUEST" });

  const url = `/api/orders/${id}/pay`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(paymentResult),
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

    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_PAY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_DELIVER_REQUEST" });

  const url = `/api/orders/${order._id}/deliver`;

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const resp = await fetch(url, {
      method: "PUT",
      body: {},
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!resp.ok) {
      const er = await resp.json();
      throw new Error(er.message);
    }

    const data = await resp.json();

    dispatch({ type: "ORDER_DELIVER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_DELIVER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch({ type: "USER_ORDER_REQUEST" });

  const url = `/api/orders/myorders`;

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
      dispatch({ type: "USER_ORDER_SUCCESS", payload: data });
    }, 500);
  } catch (error) {
    dispatch({
      type: "USER_ORDER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({ type: "ORDER_LIST_REQUEST" });

  const url = `/api/orders`;

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
      dispatch({ type: "ORDER_LIST_SUCCESS", payload: data });
    }, 500);
  } catch (error) {
    dispatch({
      type: "ORDER_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
