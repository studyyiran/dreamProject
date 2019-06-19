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
  makeSlot('main', pagesMainRender({
    onChange: (value) => {
      current = value
      window.appRedux.update()
    }
  }))

  makeSlot('today', makeHidden(renderPageToday({
    history: state[saveKeyGoalHistory]
  }), current === 0))


  makeSlot('history', makeHidden(renderHistory({
    history: state[saveKeyGoalHistory]
  }), current === 1))
  // 怎么设置一个好的props


  makeSlot('review', makeHidden(pagesReviewRender({
    history: state[reviewList]
  }), current === 2))
}

function makeHidden(dom, bool=true) {
  if (bool) {
    dom.setAttribute('style', 'display: auto')
  } else {
    dom.setAttribute('style', 'display: none')
  }
  return dom
}

function makeSlot(id, dom, bool=true) {
  let slot = document.querySelector(`#${id}`)
  if (slot) {
    slot.innerHTML = ''
  } else {
    slot = document.createElement('div')
    slot.id = id
    root.appendChild(slot)
  }

  slot.appendChild(dom)
}


