// 为什么要new一个组件，这有什么隐喻？
// 他返回的是一个对象。而dom已经上去了。
function componentModal (props={}) {
  const {children = ''} = props
  const modal = document.createElement('div')
  modal.appendChild(children)
  modal.setAttribute('class', 'components-modal')
  root.appendChild(modal)
  this.modal = modal
}

componentModal.prototype.distroy = function () {
  if (this.modal && this.modal.parentNode) {
    this.modal.parentNode.removeChild(this.modal)
  }

}

componentModal.prototype.setVisible = function (visibility) {
  if (this.modal) {
    let value = visibility ? 'visible' : 'hidden'
    this.modal.setAttribute('style', `visibility: ${value}`)
  }
}