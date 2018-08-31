import { handleActions } from 'redux-actions';


const init = {
            blogList: []
        }

export default  handleActions(
    {
        'GET_BLOG_LIST_MAIN'(state, action){
            return { ...state, ...action.payload }
        },
    
    },
    init
)