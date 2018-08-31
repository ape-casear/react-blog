import { handleActions } from 'redux-actions';


const init = {
            side_bar_content: []
        }

export default  handleActions(
    {
        'GET_SIDE_BAR_CONTENT'(state, action){
            return { ...state, ...action.payload }
        },
    
    },
    init
)