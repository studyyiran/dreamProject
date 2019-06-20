let haveInit = false

function componentDidMount() {
  if (!haveInit) {
    haveInit = true
    reviewServer.getReviewList()
  }
}

function pagesReviewRender(props) {
  componentDidMount()
  const reviewDom = document.createElement('div')
  const innerFormDom = formDom()
  let modal = new componentModal({children: innerFormDom})
  // TODO 难以搞定
  // const buttomDom = cacheDomWithId(renderButton(modal), 'pagesReviewPostReviewForm')
  const buttomDom = renderButton(modal)
  reviewDom.appendChild(buttomDom)
  reviewDom.appendChild(renderLine(reviewDom, props.reviewList))
  return reviewDom
}

function renderLine(root, list) {
  const lineContainer = document.createElement('div')
  lineContainer.innerHTML = `<table border="1">
        <thead>
            <tr>
                <th>创建时间</th>
                <th>内容</th>
                <th>生命周期</th>
                <th>复习周期</th>
                <th>完成+1</th>
                <th>删除</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`
  const tbody = lineContainer.querySelector('tbody')
  list.forEach((item) => {
    const {_id, reviewContent, totalReviewNeedTime, needReviewCount, haveReviewCount, createTime} = item
    const tr = document.createElement('tr')
    const deadLineDate = moment().add(totalReviewNeedTime, 'd')
    tr.innerHTML = `
        <th>${moment(Number(createTime)).format('MM-DD hh:mm:ss  ')}</th>
        <th>${reviewContent}</th>
        <th>${moment(Number(createTime)).to(deadLineDate)}</th>
        <th>${haveReviewCount}/${needReviewCount}</th>
        <th><button date-type="finish">完成+1</button></th>
        <th><button date-type="delete">删除</button></th>`
    const buttonFinish = tr.querySelector('[date-type=finish]')
    buttonFinish.addEventListener('click', () => {
      reviewServer.updateReviewCount(_id)
    })
    const buttonDelete = tr.querySelector('[date-type=delete]')
    buttonDelete.addEventListener('click', () => {
      reviewServer.hideReviewItem(_id)
    })
    tbody.appendChild(tr)
  })
  return lineContainer
  //  我不明白这个有啥用？
  // return makeSlot(root, lineContainer, 'pagesReviewIndexList')
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
    reviewServer.postNewReview(json)
  })

  const arr = [
    {
      name: '内容',
      id: 'reviewContent'
    },
    {
      name: '半衰期',
      id: 'totalReviewNeedTime'
    },
    {
      name: '持续进攻次数',
      id: 'needReviewCount'
    }
  ]
  arr.forEach((item) => {
    newInput(item)
  })
  function newInput(item) {
    console.log('new input')
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