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
        // 为什么保护之后 push 还是有风险？
        newState[saveKeyGoalHistory] = (newState[saveKeyGoalHistory] || [])
        newState[saveKeyGoalHistory] = newState[saveKeyGoalHistory].concat([value]);
        saveReduxIntoDb(newState)
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
      newState[saveKeyGoalHistory] = [
        ...newState[saveKeyGoalHistory].slice(0, resultIndex),
        ...newState[saveKeyGoalHistory].slice(resultIndex + 1),
      ]
      saveReduxIntoDb(newState)
      return newState
    }
      break
    case 'setReviewList':
      {
        const newState = {...oldState};
        newState[reviewList] = value || [];
        saveReduxIntoDb(newState)
        return newState
        break
      }
    case 'saveReviewList':
      {
        const newState = {...oldState};
        newState[reviewList] = (newState[reviewList] || []).concat([value]);
        saveReduxIntoDb(newState)
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