export default store => next => action => {
    //console.log('testmiddle',action)
    let pre = store.getState();
    console.log('i am 2 pre')
    let state = next(action)
    console.log('i am 2 now')
    let now = store.getState();
    //console.log(now)
    return state;
  }