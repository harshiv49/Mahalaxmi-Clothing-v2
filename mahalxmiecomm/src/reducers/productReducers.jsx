export const myActionsProductList = {
  REQUEST: "PRODUCTS_LIST_REQUEST",
  SUCCESS: "PRODUCTS_LIST_SUCCESS",
  FAIL: "PRODUCTS_LIST_FAIL",

  DETAILS_REQUEST: "PRODUCTS_DETAILS_REQUEST",
  DETAILS_SUCCESS: "PRODUCTS_DETAILS_SUCCESS",
  DETAILS_FAIL: "PRODUCTS_DETAILS_FAIL",

  DELETE_REQUEST: "PRODUCTS_DELETE_REQUEST",
  DELETE_SUCCESS: "PRODUCTS_DELETE_SUCCESS",
  DELETE_FAIL: "PRODUCTS_DELETE_FAIL",

  CREATE_REQUEST: "PRODUCTS_CREATE_REQUEST",
  CREATE_SUCCESS: "PRODUCTS_CREATE_SUCCESS",
  CREATE_FAIL: "PRODUCTS_CREATE_FAIL",
  CREATE_RESET: "PRODUCTS_CREATE_RESET",

  UPDATE_REQUEST: "PRODUCTS_UPDATE_REQUEST",
  UPDATE_SUCCESS: "PRODUCTS_UPDATE_SUCCESS",
  UPDATE_FAIL: "PRODUCTS_UPDATE_FAIL",
  UPDATE_RESET: "PRODUCTS_UPDATE_RESET",

  CREATE_REVIEW_REQUEST: "PRODUCTS_CREATE_REVIEW_REQUEST",
  CREATE_REVIEW_SUCCESS: "PRODUCTS_CREATE_REVIEW_SUCCESS",
  CREATE_REVIEW_FAIL: "PRODUCTS_CREATE_REVIEW_FAIL",
  CREATE_REVIEW_RESET: "PRODUCTS_UPDATE_RESET",

  TOP_REQUEST: "PRODUCTS_TOP_REQUEST",
  TOP_SUCCESS: "PRODUCTS_TOP_SUCCESS",
  TOP_FAIL: "PRODUCTS_TOP_FAIL",
};

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsProductList.REQUEST:
      return { loading: true, products: [] };
    case myActionsProductList.SUCCESS:
      return {
        loading: false,
        products: payload.products,
        page: payload.page,
        pages: payload.pages,
      };
    case myActionsProductList.FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsProductList.DETAILS_REQUEST:
      return { loading: true, ...state };
    case myActionsProductList.DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case myActionsProductList.DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsProductList.DELETE_REQUEST:
      return { loading: true, success: false };
    case myActionsProductList.DELETE_SUCCESS:
      return { loading: false, success: true };
    case myActionsProductList.DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsProductList.CREATE_REQUEST:
      return { loading: true, success: false };
    case myActionsProductList.CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case myActionsProductList.CREATE_FAIL:
      return { loading: false, error: payload };
    case myActionsProductList.CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsProductList.UPDATE_REQUEST:
      return { loading: true, success: false };
    case myActionsProductList.UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case myActionsProductList.UPDATE_FAIL:
      return { loading: false, error: payload };
    case myActionsProductList.UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsProductList.CREATE_REVIEW_REQUEST:
      return { loading: true, success: false };
    case myActionsProductList.CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case myActionsProductList.CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };
    case myActionsProductList.CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};


export const productTopRatedReducer = (state = {products:[]}, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsProductList.TOP_REQUEST:
      return { loading: true,products:[]};
    case myActionsProductList.TOP_SUCCESS:
      return { loading: false, products:payload};
    case myActionsProductList.TOP_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
