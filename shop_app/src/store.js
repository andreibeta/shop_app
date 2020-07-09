import { createStore, combineReducers, applyMiddleware, compose} from 'redux';    
import { productListReducer } from './reducers/productListReducer';
import thunk from 'redux-thunk';


const initialState = {};
const rootReducer = combineReducers({
    productList: productListReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;