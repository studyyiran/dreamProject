const appGlobalStoreKey = 'appGlobalStore'
const saveKeyTitle = 'saveKeyTitle'
const saveKeyGoalHistory = 'saveKeyGoalHistory'

// reducer
const reducer = (oldState, action) => {
  console.log(oldState)
  const {type, value} = action
  switch(type) {
    case 'changeTitle':
      {
        const newState = {...oldState}
        newState[saveKeyTitle] = value
        return newState
      }
      break
    case 'saveHistory':
      {
        console.log('saveHistory')
        const newState = {...oldState}
        const currentSaveValue = newState[saveKeyTitle]
        newState[saveKeyGoalHistory] = newState[saveKeyGoalHistory] || []
        newState[saveKeyGoalHistory].push(currentSaveValue)
          // newState[saveKeyGoalHistory] = (newState[saveKeyGoalHistory] || []).push(currentSaveValue)
        console.log(newState)
        return newState
      }
      break
    default:
      return oldState
  }
}

// start
console.log('start')
init(appGlobalStoreKey)



// dom
const div = document.createElement('div')
document.querySelector('#app').appendChild(div)

const input = document.createElement('input')
const outPut = document.createElement('div')
input.addEventListener('input', (e) => {
  const value = e && e.target && e.target.value
  // input 代表的view  input方法 代表的行为 controller。 数值代表的modal 都应该解耦掉
  window.appRedux.dispatch({type: 'changeTitle', value: recordNewDate(value)})
})

const button = document.createElement('button')
button.innerText = 'click to save'
button.addEventListener('click', () => {
  // getAttribute 和 .vlaue有什么区别。dom节点本质上的obj是如何完成view和modal的关联的。
  // const string = input.value
  // recordNewDate(string)
  window.appRedux.dispatch({type: 'saveHistory'})
  saveDataIntoDb()
})

const ul = document.createElement('ul')
div.appendChild(input)
div.appendChild(outPut)
div.appendChild(button)
div.appendChild(ul)


function init(saveKey) {
  const state = loadFromDb(saveKey)
  window.appRedux = new globalRedux(state, reducer)
}

function update(redux) {
  const state = redux.getState()
  updateInput(state[saveKeyTitle])
  updateView(state[saveKeyTitle])
  renderList(state[saveKeyGoalHistory])
}

function updateInput(titleProps={}) {
  const {goalTitle=""} = titleProps
  input.setAttribute('value', goalTitle)
}

function updateView(titleProps={}) {
  const {goalTitle=""} = titleProps
  outPut.innerText = goalTitle
}

function renderList(goalHistory=[]) {
  ul.innerHTML = '';
  goalHistory.forEach((item) => {
    const {time, goalTitle} = item
    const li = document.createElement('li')
    li.innerHTML = `record time is ${time}, goal is ${goalTitle}.`
    ul.appendChild(li)
  })
}

// 保存title
/*
传入 title
返回 undefined
 */
function recordNewDate (value) {
  return {
    time: Date.now(),
    goalTitle: value
  }
  // saveDataIntoDb(record)
}

// 从db中获取数据
/*
入参
  key？
出参
  data
 */
function loadFromDb(saveKey) {
  let data
  const objData = localStorage.getItem(saveKey)
  try {
    data = JSON.parse(objData)
  } catch(e) {

  }
  return data
}

// 将数据保存
/*
入参
  data

出参
  success
 */
function saveDataIntoDb() {
  console.log('saveDataIntoDb')
  const state = appRedux.getState()
  // const globalData = loadFromDb(appGlobalStoreKey) || {}
  // const saveData = Object.assign(globalData, data)
  localStorage.setItem(appGlobalStoreKey, JSON.stringify(state))
  return 1
}

// subscribe为什么在最后？
appRedux.subscribe(update.bind(this, appRedux))

