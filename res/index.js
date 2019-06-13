const appGlobalStoreKey = 'appGlobalStore'
const saveKeyTitle = 'saveKeyTitle'
const saveKeyGoalHistory = 'saveKeyGoalHistory'

// reducer
const reducer = (oldState, action) => {
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
        const newState = {...oldState}
        const currentSaveValue = recordNewDate(document.querySelector('input').value)
        console.log(currentSaveValue)
        // const currentSaveValue = newState[saveKeyTitle]
        newState[saveKeyGoalHistory] = newState[saveKeyGoalHistory] || []
        newState[saveKeyGoalHistory].push(currentSaveValue)
          // newState[saveKeyGoalHistory] = (newState[saveKeyGoalHistory] || []).push(currentSaveValue)
        return newState
      }
      break
    default:
      return oldState
  }
}

// start
getDataIntoStore(appGlobalStoreKey)



// dom
const root = document.createElement('div')
document.querySelector('#app').appendChild(root)

const ul = document.createElement('ul')
root.appendChild(ul)

function getDataIntoStore(saveKey) {
  const state = loadFromDb(saveKey)
  window.appRedux = new globalRedux(state, reducer)
}

function renderPage1({defaultInput, history={}}) {
  console.log(history)
  const info = historyToResult(history) || {}
  const {todayInfo, yesterdayInfo, historyArr} = info
  const idSelector = '#page1'
  let page1 = document.querySelector(idSelector)
  // 这个页面如何继续解耦 分治 模块化 组件化 是个比较头疼的问题。灰常头疼。
  defaultInput = (todayInfo && todayInfo.arr && todayInfo.arr[0] && todayInfo.arr[0].goalTitle) || '还没决定呢！'
  if (!page1) {
    page1 = document.createElement('div')
    page1.setAttribute('id', 'page1')
    page1.innerHTML = `<p>
        <span>今天的日期</span>
        <span>${todayInfo && todayInfo.arr && todayInfo.arr[0] && moment(todayInfo.arr[0].time).format('YYYY-MM-DD')}</span>
    </p><p>
        <span>今天</span>
        <span>${todayInfo && todayInfo.arr && todayInfo.arr[0] && todayInfo.arr[0].goalTitle}</span>
    </p>
    <p>
        <span>昨天</span>
        <span>${yesterdayInfo && yesterdayInfo.arr && yesterdayInfo.arr[0] && yesterdayInfo.arr[0].goalTitle}</span>
    </p>
    <p>
        <span>输入</span>
        <input />
    </p>
    <p>
        <span>浏览</span>
        <span></span>
    </p>
    <button>确认输入了呢！</button>`
    root.appendChild(page1)

    const input = document.querySelector(idSelector + ' input')
    input.setAttribute('value', defaultInput)
    input.addEventListener('input', (e) => {
      const value = e && e.target && e.target.value
      // input 代表的view  input方法 代表的行为 controller。 数值代表的modal 都应该解耦掉
      // window.appRedux.dispatch({type: 'changeTitle', value: recordNewDate(value)})
      outPut.innerText = input.value
    })

    const outPut = document.querySelector(idSelector + ' > *:nth-child(5) > span:last-child')
    outPut.innerText = input.value

    const button = document.querySelector(idSelector + ' button')
    button.addEventListener('click', () => {
      // getAttribute 和 .vlaue有什么区别。dom节点本质上的obj是如何完成view和modal的关联的。
      // const string = input.value
      // recordNewDate(string)
      window.appRedux.dispatch({type: 'saveHistory'})
      saveDataIntoDb()
    })
  }
  return page1
}

function update(redux) {
  const state = redux.getState()
  const currentTitle = ''
  // 怎么设置一个好的props
  const page1 = renderPage1({
    history: state[saveKeyGoalHistory]
  })
  renderList(state[saveKeyGoalHistory])
}

function renderList(goalHistory=[]) {
  ul.innerHTML = '';
  goalHistory.forEach((item) => {
    const {time, goalTitle} = item
    const li = document.createElement('li')
    li.innerHTML = `record time is ${moment(time).format('YYYY-MM-DD')}, goal is ${goalTitle}.`
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
  const state = appRedux.getState()
  // const globalData = loadFromDb(appGlobalStoreKey) || {}
  // const saveData = Object.assign(globalData, data)
  localStorage.setItem(appGlobalStoreKey, JSON.stringify(state))
  return 1
}

/*
history操作函数
 入参 history
 type

 出参
 date？
 */

function historyToResult(list) {
  const todayTime = moment()
  let lastDay
  let dateArr = [];
  (list || []).forEach((item) => {
    const {time} = item
    const result = dateArr.find((dateCollectionArr) => {
      return dateCollectionArr && dateCollectionArr[0] && dateCollectionArr[0].time && moment(dateCollectionArr[0].time).isSame(time, 'day')
    })
    item.viewTime = moment(item.time).format('YYYY-MM-DD')
    if (result) {
      result.push(item)
    } else {
      dateArr.push([item])
    }
  })
  const sortByTime = (a, b) => {
    return b.time - a.time
  }
  // 排序
  dateArr.map((arr) => {
    const newArr = arr.sort(sortByTime)
    return newArr
  })
  dateArr.sort((a, b) => sortByTime(a[0], b[0]))
  // setToday
  const todayInfo = {
    date: moment(),
    arr: dateArr.find((item) => moment(item[0].time).isSame(moment(), 'day')),
  }
  const yesterdayInfo = {
    date: moment(),
    arr: dateArr.find((item) => moment(item[0].time).isSame(moment().subtract(1, 'days'), 'day')),
  }
  return {
    todayInfo, yesterdayInfo, historyArr: dateArr
  }
}
// subscribe为什么在最后？
appRedux.subscribe(update.bind(this, appRedux))

