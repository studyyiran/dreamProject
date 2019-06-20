// 变量
let current = 2

// start
initRedux(localStorageKey)

function initRedux(saveKey) {
  const state = loadFromDb(saveKey)
  window.appRedux = Redux.createStore(reducer, state)
}

// set root dom
const root = document.createElement('div')
document.querySelector('#app').appendChild(root)


// subscribe为什么在最后？
appRedux.subscribe(update.bind(this, appRedux))

function update(redux) {
  const state = redux.getState()
  makeSlot(root, pagesMainRender({
    onChange: (value) => {
      current = value
      window.appRedux.update()
    }
  }), 'main')

  makeSlot(root, makeHidden(renderPageToday({
    history: state[saveKeyGoalHistory]
  }), current === 0), 'today')


  makeSlot(root, makeHidden(renderHistory({
    history: state[saveKeyGoalHistory]
  }), current === 1), 'history')
  // 怎么设置一个好的props


  makeSlot(root, makeHidden(pagesReviewRender({
    history: state[reviewList]
  }), current === 2), 'review')
}

function makeHidden(dom, bool=true) {
  if (bool) {
    dom.setAttribute('style', 'display: auto')
  } else {
    dom.setAttribute('style', 'display: none')
  }
  return dom
}
