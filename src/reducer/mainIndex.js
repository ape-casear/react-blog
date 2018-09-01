import { handleActions } from 'redux-actions';


const init = {
            blogList: [],
            commentList: []
        }

export default  handleActions(
    {
        'GET_BLOG_LIST_MAIN'(state, action){
            return { ...state, ...action.payload }
        },
        'GET_COMMENT_LIST'(state, action){
            return { ...state, ...action.payload }
        }
    },
    init
)