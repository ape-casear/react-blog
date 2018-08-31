import { handleActions } from 'redux-actions';

function init1(){
    
    return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        goTop: false,
    }
}
const init  = init1()
export default  handleActions(
    {
        'windowSize'(state, action){
            return { ...state, ...action.payload }
        },
        'TOGGLE_GO_TOP'(state, action){
            return { ...state, ...action.payload }
        },
    },
    init
)