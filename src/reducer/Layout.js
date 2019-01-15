import { handleActions } from 'redux-actions';

function init1(){
    // console.log('window:', window.innerWidth)
    return {
        sidebar: window.innerWidth,
        load: false,
    }
}
const init  = init1()
export default  handleActions(
    {
        'switch sideOutIn'(state, action){
            // console.log(state)
            return { ...state, ...action.payload }
        },
        'LOAD'(state, action){
            return { ...state, ...action.payload }
        }
    },
    init
)