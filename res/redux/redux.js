const Redux = function () {}


Redux.prototype.init = function (reducer, initState) {
  this.state = initState || {}
  this.reducer = reducer
  // globalRedux.update()
}

Redux.prototype.subscribe = function (func) {
  // not arr for now
  this.updateCallBack = func
  this.update()
}

Redux.prototype.getState = function () {
  return this.state
}

Redux.prototype.update = function () {
  if (this.updateCallBack) {
    this.updateCallBack()
  }
}

Redux.prototype.dispatch = function (action) {
  const newState = this.reducer(this.state, action)
  this.state = newState
  this.update()
}

Redux.createStore = function () {
  return new Redux.prototype.init(...arguments)
}

Redux.prototype.init.prototype = Redux.prototype
