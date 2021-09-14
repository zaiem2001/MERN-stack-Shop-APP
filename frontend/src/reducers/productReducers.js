export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "REQUEST":
      return { loading: true, products: [] };

    case "SUCCESS":
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };

    case "FAIL":
      return { loading: false, error: action.payload, products: [] };

    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_REQUEST":
      return { loading: true };

    case "PRODUCT_SUCCESS":
      return { loading: false, product: action.payload };

    case "PRODUCT_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return { loading: true };

    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, success: true };

    case "PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { loading: true };

    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };

    case "PRODUCT_CREATE_FAIL":
      return { loading: false, error: action.payload };

    case "PRODUCT_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_UPDATE_REQUEST":
      return { loading: true };

    case "PRODUCT_UPDATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };

    case "PRODUCT_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    case "PRODUCT_UPDATE_RESET":
      return { product: {} };

    default:
      return state;
  }
};

export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_REVIEW_REQUEST":
      return { loading: true };

    case "PRODUCT_REVIEW_SUCCESS":
      return { loading: false, success: true };

    case "PRODUCT_REVIEW_FAIL":
      return { loading: false, error: action.payload };

    case "PRODUCT_REVIEW_RESET":
      return {};

    default:
      return state;
  }
};

export const productTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_TOP_REQUEST":
      return { loading: true, products: [] };

    case "PRODUCT_TOP_SUCCESS":
      return { loading: false, products: action.payload };

    case "PRODUCT_TOP_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
