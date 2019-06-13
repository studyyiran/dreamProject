function renderPageToday({defaultInput, history={}}) {
  const info = historyToResult(history) || {}
  const {todayInfo, yesterdayInfo, historyArr} = info
  const id = 'page1'
  let page1 = document.createElement('div')
  // 这个页面如何继续解耦 分治 模块化 组件化 是个比较头疼的问题。灰常头疼。
  defaultInput = (todayInfo && todayInfo.arr && todayInfo.arr[0] && todayInfo.arr[0].goalTitle) || '还没决定呢！'
  page1.id = id
  page1.setAttribute('id', 'page1')
  page1.innerHTML = `<p>
        <span>今天的日期：</span>
        <span>${todayInfo && todayInfo.arr && todayInfo.arr[0] && moment(todayInfo.arr[0].time).format('YYYY-MM-DD')}</span>
    </p>
    <p>
        <span>距离最新更新过去了：</span>
        <span>${moment.duration(moment().subtract(moment(todayInfo.arr[0].time))).asMinutes()}</span>
    </p>
    <p>
        <span>今天：</span>
        <span>${todayInfo && todayInfo.arr && todayInfo.arr[0] && todayInfo.arr[0].goalTitle}</span>
    </p>
    <p>
        <span>昨天：</span>
        <span>${yesterdayInfo && yesterdayInfo.arr && yesterdayInfo.arr[0] && yesterdayInfo.arr[0].goalTitle}</span>
    </p>
    <p>
        <span>输入：</span>
        <input />
    </p>
    <p>
        <span>浏览：</span>
        <span></span>
    </p>
    <button>确认输入了呢！</button>`

  const input = page1.querySelector('input')
  input.setAttribute('value', defaultInput)
  input.addEventListener('input', (e) => {
    const value = e && e.target && e.target.value
    // input 代表的view  input方法 代表的行为 controller。 数值代表的modal 都应该解耦掉
    // window.appRedux.dispatch({type: 'changeTitle', value: recordNewDate(value)})
    outPut.innerText = input.value
  })

  const outPut = page1.querySelector('*:nth-child(6) > span:last-child')
  outPut.innerText = input.value

  const button = page1.querySelector('button')
  button.addEventListener('click', () => {
    // getAttribute 和 .vlaue有什么区别。dom节点本质上的obj是如何完成view和modal的关联的。
    // const string = input.value
    // recordNewDate(string)
    window.appRedux.dispatch({type: 'saveHistory'})
  })
  console.log(page1)
  return page1
}