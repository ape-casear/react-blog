export default store => next => action => {
    //console.log('testmiddle',action)
    let pre = store.getState();
    let state = next(action)
    let now = store.getState();
    console.log(`pre`,pre)
    console.log(`action`,action)
    console.log(`now`,now)
    return state;
  }