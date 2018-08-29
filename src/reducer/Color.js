import { handleActions } from 'redux-actions';

const initColor = { color: 'blue' }

export default  handleActions(
    {
        'switch red'(state, action){
            console.log(state)
            return { ...state, ...action.payload }
        },
        'switch blue'(state, action){
            return {  ...state, color: 'blue' }
        },
    },
    initColor
)