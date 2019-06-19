function componentDidMount() {
  getReviewList().then((res) => {
    console.log(res)
  })
}

function pagesReviewRender() {
  //
  console.log('run pagesReviewRender')
  componentDidMount()
  const reviewDom = document.createElement('div')
  const innerFormDom = formDom()
  let modal = new componentModal({children: innerFormDom})
  const buttomDom = renderButton(modal)
  reviewDom.appendChild(buttomDom)
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

function formDom () {
  const form = document.createElement('form')
  // form.setAttribute('method', 'post')
  // form.setAttribute('action', '')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const json = {}
    arr.forEach(({id}) => json[id] = form && form[id] && form[id].value)
    postNewReview(json)
  })

  const arr = [
    {
      name: '内容',
      id: 'reviewContent'
    },
    {
      name: '半衰期',
      id: 'reviewLifeTime'
    },
    {
      name: '持续进攻次数',
      id: 'reviewAttackTime'
    }
  ]
  arr.forEach((item) => {
    newInput(item)
  })
  function newInput(item) {
    const {id, name} = item
    const container = document.createElement('div')
    const label = document.createElement('label')
    label.setAttribute('for', id)
    label.innerText = name
    const input = document.createElement('input')
    input.id = id
    input.name = id
    container.appendChild(label)
    container.appendChild(input)
    form.appendChild(container)
  }
  const button = document.createElement('button')
  button.innerText = '提交'
  // 这行的作用是什么？
  button.setAttribute('type', 'submit')
  form.appendChild(button)
  return form
}