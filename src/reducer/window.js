import { handleActions } from 'redux-actions';

function init1(){
    
    return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
    }
}
const init  = init1()
export default  handleActions(
    {
        'windowSize'(state, action){
            console.log(state)
            return { ...state, ...action.payload }
        },
    },
    init
)