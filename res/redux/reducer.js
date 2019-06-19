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
        const newState = {...oldState};
        (newState[saveKeyGoalHistory] = newState[saveKeyGoalHistory] || []).push(value);
        saveReduxIntoDb()
        return newState
      }
      break
    case 'deleteRecord':
    {
      const newState = {...oldState}
      let id = value;
      const resultIndex = (newState[saveKeyGoalHistory] || []).findIndex((item) => {
        return item === value
      })
      newState[saveKeyGoalHistory].splice(resultIndex, 1)
      saveReduxIntoDb()
      return newState
    }
      break
    case 'saveReviewList':
    {
      const newState = {...oldState};
      (newState[reviewList] = newState[reviewList] || []).push(value);
      saveReduxIntoDb()
      return newState
      break
    }
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