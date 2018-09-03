export default store => next => action => {
    //console.log('testmiddle',action)
    let pre = store.getState();
    console.log(pre)
    let state = next(action)
    let now = store.getState();
    console.log(now)
    return state;
  }