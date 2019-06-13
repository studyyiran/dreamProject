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
  const state = redux.getState()
  const currentTitle = ''
  // 怎么设置一个好的props
  const pageToday = renderPageToday({
    history: state[saveKeyGoalHistory]
  })
  const pageHistory = renderHistory({
      history: state[saveKeyGoalHistory]
  })
  makeSlot('history', pageHistory)
  root.appendChild(pageHistory)
}

function makeSlot(id, dom) {
  let slot = document.querySelector(`#${id}`)
  if (slot) {
    slot.innerHTML = ''
  } else {
    slot = document.createElement('div')
    slot.id = id
  }
  slot.appendChild(dom)
}


