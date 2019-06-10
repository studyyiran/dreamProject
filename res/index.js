const saveKey = 'most-important-things'

const input = document.querySelector('input')
const outPut = document.createElement('div')
input.after(outPut)
input.addEventListener('input', (e) => {
  const vlaue = e && e.target && e.target.value
  outPut.innerText = vlaue
})


const button = document.querySelector('button')
button.addEventListener('click', () => {
  // getAttribute 和 .vlaue有什么区别。dom节点本质上的obj是如何完成view和modal的关联的。
  const string = input.value
  save(saveKey, string)
})

function init() {
  // const state = loadFromDb(saveKey)
  // const reducer = () => {
  //   console.log(arguments)
  // }
  // const redux = new globalRedux(state, reducer)
  // redux.subscribe(update)
  // 这块其实应该接一首redux

}

function update() {

}

function recordNewDate (value) {
  const record = {
    time: Date.now(),
    value: value
  }
}

function save(key, value) {

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
function saveDataIntoDb(saveKey, data) {
  localStorage.setItem(saveKey, JSON.stringify(data))
  return 1
}

// start
init()
// loadAndInit()
