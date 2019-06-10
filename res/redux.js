function globalRedux(initState, reducer) {
  globalRedux.state = initState
  globalRedux.reducer = reducer
  // globalRedux.update()
}

globalRedux.prototype.subscribe = (func) => {
  // not arr for now
  globalRedux.updateCallBack = func
}

globalRedux.prototype.getState = () => {
  return globalRedux.state
}

globalRedux.prototype.update = () => {
  if (globalRedux.updateCallBack) {
    globalRedux.updateCallBack()
  }
}

globalRedux.prototype.dispatch = (action) => {
  const newState = globalRedux.reducer(globalRedux.state, action)
  globalRedux.state = newState
  globalRedux.upload()
}

