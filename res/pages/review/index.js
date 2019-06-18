function pagesReviewRender() {
  const reviewDom = document.createElement('div')
  let modal = new componentModal({children:formDom()})
  reviewDom.appendChild(renderButton(modal))
  return reviewDom
}

function renderButton (modal) {
  let visible = false
  const button = document.createElement('button')
  button.innerText = '新建任务'
  button.addEventListener('click', () => {
    visible = !visible
    modal.setVisible(visible)
  })
  return button
}

function renderPop(visible) {
  // if (visible) {
  //   console.log('get mouseover')
  // } else {
  //   modal && modal.distroy()
  // }
}

function formDom () {
  const form = document.createElement('form')
  const container = document.createElement('span')
  const label = document.createElement('label')
  const input = document.createElement('input')
  container.appendChild(label)
  container.appendChild(input)
  form.appendChild(container)
  return form
}