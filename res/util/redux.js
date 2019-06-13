function globalRedux(initState, reducer) {
  this.state = initState || {}
  this.reducer = reducer
  // globalRedux.update()
}

globalRedux.prototype.subscribe = function (func) {
  // not arr for now
  this.updateCallBack = func
  this.update()
}

globalRedux.prototype.getState = function () {
  return this.state
}

globalRedux.prototype.update = function () {
  if (this.updateCallBack) {
    this.updateCallBack()
  }
}

globalRedux.prototype.dispatch = function (action) {
  const newState = this.reducer(this.state, action)
  this.state = newState
  this.update()
}

