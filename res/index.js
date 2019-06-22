// 变量
let current = 2

// start
initRedux(localStorageKey)

function initRedux(saveKey) {
  const state = loadFromDb(saveKey)
  const {reviewList, ...other} = state
  window.appRedux = Redux.createStore(reducer, other)
}

// set root dom
let root = document.createElement('div')
document.querySelector('#app').appendChild(root)


// subscribe为什么在最后？
appRedux.subscribe(rootWrapper())

function rootWrapper() {
  return function () {
    console.log('rootWrapper')
    // 每次都重新渲染，解决一切烦恼。为了保存状态，请给他id，还需要暂时把oldRoot缓存下来
    let oldRoot = root
    root = document.createElement('div')
    update(appRedux)
    const app = document.querySelector('#app')
    app.removeChild(oldRoot)
    app.appendChild(root)
  }
}

function update(redux) {

  const state = redux.getState()
  let page
  page = pagesMainRender({
    onChange: (value) => {
      current = value
      window.appRedux.update()
    }
  })
  root.appendChild(page)

  page = renderPageToday({
    history: state[saveKeyGoalHistory]
  })
  root.appendChild(makeHidden(page, current === 0))


  page = renderHistory({
    history: state[saveKeyGoalHistory]
  })
  root.appendChild(makeHidden(page, current === 1))

  // 怎么设置一个好的props


  page = pagesReviewRender({
    reviewList: state[reviewList]
  })
  root.appendChild(makeHidden(page, current === 2))

}

  function makeHidden(dom, bool=true) {
  if (bool) {
    dom.setAttribute('style', 'display: auto')
  } else {
    dom.setAttribute('style', 'display: none')
  }
  return dom
}
