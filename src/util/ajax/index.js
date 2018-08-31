

const  createAjaxAction = (handle, start, end) => (url, method, Data, cb) =>(dispatch)=>{
    start&&dispatch(start)
    handle(url, method, Data).then(res=>{
        end&&dispatch(end)
        cb&&cb(res)
    }).catch(err=>{
        console.error(err)
    })
}

export {
    createAjaxAction
}