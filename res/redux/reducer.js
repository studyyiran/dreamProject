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