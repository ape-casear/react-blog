function stopEvent(e){
    if(!e)return;
    e.stopPropagation&&e.stopPropagation();
    e.nativeEvent&&e.nativeEvent.stopImmediatePropagation&&e.nativeEvent.stopImmediatePropagation();
    e.preventDefault&&e.preventDefault();
}

export {
    stopEvent
}