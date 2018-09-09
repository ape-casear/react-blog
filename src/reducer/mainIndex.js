import { handleActions } from 'redux-actions';


const init = {
            blogList: [],           // 博客列表
            currentList: [],        // 当前页博客列表
            pageNum: 0,             // 博客列表当前页
            totalPages: [],         // 博客总共有多少页

            currentBlog: -1,        // 当前博客 在blogList中的下标      

            projectList: [],        // 项目列表

            commentList: [],        // 一页显示的评论列表
            totalComments: [],      // 所有评论
            comPageNum: 0,          // 评论列表当前页
            comTotalPages: [],      // 评论总共多少页
            offset: 0               // 分页，多页时active页在页表的左偏移
        }

export default  handleActions(
    {
        'GET_BLOG_LIST_MAIN'(state, action){
            return { ...state, ...action.payload }
        },
        'GET_COMMENT_LIST'(state, action){
            return { ...state, ...action.payload }
        },
        'GET_PROJECT_LIST'(state, action){
            return { ...state, ...action.payload }
        }
    },
    init
)