import {PRODUCT_REVIEW_SUBMIT_REQUEST,PRODUCT_REVIEW_SUBMIT_FAILED,PRODUCT_REVIEW_SUBMIT_SUCCESS,PRODUCT_REVIEW_SUBMIT_RESET} from '../constants/productConstants';


const reducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_REVIEW_SUBMIT_REQUEST:
        return { loading: true };
      case PRODUCT_REVIEW_SUBMIT_SUCCESS:
        return { loading: false, review: action.payload, success: true };
      case PRODUCT_REVIEW_SUBMIT_FAILED:
        return { loading: false, errror: action.payload };
      case PRODUCT_REVIEW_SUBMIT_RESET:
        return {};
      default:
        return state;
    }
  }

  export default reducer;