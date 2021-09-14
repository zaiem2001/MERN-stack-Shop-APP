export const addToCart = (id, qty) => async (dispatch, getState) => {
  const url = `/api/products/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  dispatch({
    type: "ADD",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_ADDRESS",
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: "SAVE_PAYMENT_METHOD",
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

// SAVE_PAYMENT_METHOD

// SAVE_SHIPPING_ADDRESS
