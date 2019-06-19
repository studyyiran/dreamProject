function componentModal (props={}) {
  const {children = ''} = props
  const modal = document.createElement('div')
  modal.appendChild(children)
  modal.setAttribute('class', 'components-modal')
  const body = document.querySelector('body')
  body.appendChild(modal)
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