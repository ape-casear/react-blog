import { handleActions } from 'redux-actions';


const init = {
            blogList: [],           // 博客列表
            pageNum: 0,             // 博客列表页码
            totalPages: 1,          // 博客总共有多少页
            commentList: [],        // 一页显示的评论列表
            totalComments: [],      // 所有评论
            comPageNum: 0,          // 评论列表页码
            comTotalPages: 1,       // 评论总共多少页
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