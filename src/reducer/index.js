import { combineReducers } from 'redux';

import color from './Color';
import layout from './Layout'
import window from './window'

const rootReducer = combineReducers({
    color,
    layout,
    window
})

export default rootReducer;