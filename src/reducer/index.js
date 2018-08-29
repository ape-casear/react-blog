import { combineReducers } from 'redux';

import color from './Color';
import layout from './Layout'

const rootReducer = combineReducers({
    color,
    layout
})

export default rootReducer;