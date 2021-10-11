import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import defineUserReducer from './store/reducers/user';

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  changeState,
  user: defineUserReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store