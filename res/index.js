// 变量
let current = 1

// start
initRedux(appGlobalStoreKey)

function initRedux(saveKey) {
  const state = loadFromDb(saveKey)
  window.appRedux = new globalRedux(state, reducer)
}

// set root dom
const root = document.createElement('div')
document.querySelector('#app').appendChild(root)


// subscribe为什么在最后？
appRedux.subscribe(update.bind(this, appRedux))

function update(redux) {
  console.log(current)
  const state = redux.getState()
  makeSlot('main', pagesMainRender({
    onChange: (value) => {
      current = value
      console.log(current)
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


