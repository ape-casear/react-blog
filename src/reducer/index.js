import { combineReducers } from 'redux';

import color from './Color';
import layout from './Layout';
import window from './window';
import mainIndex from './mainIndex';
import sideBar from './sideBar';

const rootReducer = combineReducers({
    color,
    layout,
    window,
    sideBar,
    mainIndex
})

export default rootReducer;