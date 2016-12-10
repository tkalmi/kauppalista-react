import { combineReducers } from 'redux'
import item from './items'

/* Combine all reducers */

const store = combineReducers({
  item
});

export default item
