export const listProduct =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "REQUEST" });

      const res = await fetch(
        `/api/products/?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      const data = await res.json();

      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    const res = await fetch(`/api/products/${id}`);

    if (!res.ok) {
      const er = await res.json();
      throw new Error(er.message);
    }

    const data = await res.json();

    setTimeout(() => {
      dispatch({ type: "PRODUCT_SUCCESS", payload: data });
    }, 200);
  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const url = `/api/products/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!res.ok) {
      const er = await res.json();
      throw new Error(er.message);
    }

    await res.json();

    setTimeout(() => {
      dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
    }, 200);
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const url = `/api/products`;

    const res = await fetch(url, {
      method: "POST",
      body: {},
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!res.ok) {
      const er = await res.json();
      throw new Error(er.message);
    }

    const data = await res.json();

    setTimeout(() => {
      dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data });
    }, 200);
  } catch (error) {
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });

    const {
      _id,
      name,
      description,
      countInStock,
      image,
      brand,
      price,
      category,
    } = product;

    const {
      userLogin: { userInfo },
    } = getState();

    const url = `/api/products/${_id}`;

    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        name,
        description,
        brand,
        countInStock,
        image,
        price,
        category,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!res.ok) {
      const er = await res.json();
      throw new Error(er.message);
    }

    const data = await res.json();

    setTimeout(() => {
      dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: data });
    }, 200);
  } catch (error) {
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reviewProduct = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_REVIEW_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const url = `/api/products/${id}/reviews`;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (!res.ok) {
      const er = await res.json();
      throw new Error(er.message);
    }

    await res.json();

    setTimeout(() => {
      dispatch({ type: "PRODUCT_REVIEW_SUCCESS" });
    }, 200);
  } catch (error) {
    dispatch({
      type: "PRODUCT_REVIEW_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const TopProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_TOP_REQUEST" });

    const url = `/api/products/top`;

    const res = await fetch(url);

    if (!res.ok) {
      const er = await res.json();
      throw new Error(er.message);
    }

    const data = await res.json();

    setTimeout(() => {
      dispatch({ type: "PRODUCT_TOP_SUCCESS", payload: data });
    }, 200);
  } catch (error) {
    dispatch({
      type: "PRODUCT_TOP_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
