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