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
function saveReduxIntoDb() {
  const state = appRedux.getState()
  // const globalData = loadFromDb(appGlobalStoreKey) || {}
  // const saveData = Object.assign(globalData, data)
  localStorage.setItem(appGlobalStoreKey, JSON.stringify(state))
  return 1
}