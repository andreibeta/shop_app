import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAILED, PRODUCT_LIST_SUCCESS,SORT_COLLECTION_ALPHABETICAL_ASC,
   SORT_COLLECTION_PRICE_ASC,SORT_COLLECTION_PRICE_DESC,SORT_COLLECTION_ALPHABETICAL_DESC} from '../constants/productConstants';

const reducer = (state = {products:[]},action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products: action.payload};
        case SORT_COLLECTION_ALPHABETICAL_ASC:
                return {loading:false,products: action.payload.sort(function(a, b) {
                  var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                })
            }
        case SORT_COLLECTION_ALPHABETICAL_DESC:
                return {loading:false,products: action.payload.sort(function(a, b) {
                  var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                  if (nameA > nameB) {
                    return -1;
                  }
                  if (nameA < nameB) {
                    return 1;
                  }
                  return 0;
                })
            }
        case SORT_COLLECTION_PRICE_ASC:
            return {loading:false,products: action.payload.sort(function(a, b) {
                var priceA = a.price, priceB = b.price;
                if (priceA < priceB) {
                  return -1;
                }
                if (priceA > priceB) {
                  return 1;
                }
                return 0;
              })
          }
          case SORT_COLLECTION_PRICE_DESC:
            return {loading:false,products: action.payload.sort(function(a, b) {
                var priceA = a.price, priceB = b.price;
                if (priceA > priceB) {
                  return -1;
                }
                if (priceA < priceB) {
                  return 1;
                }
                return 0;
              })
          }
        case PRODUCT_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;