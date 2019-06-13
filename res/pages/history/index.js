function renderHistory({history}) {
  const info = historyToResult(history) || {}
  const {todayInfo, yesterdayInfo, historyArr} = info
  const ul = document.createElement('ul')
  historyArr.forEach((arr) => {
    if (arr && arr.length) {
      const li = document.createElement('li')
      ul.appendChild(li)
      const h1 = document.createElement('h1')
      h1.innerHTML = `date is ${moment(arr[0].time).format('YYYY-MM-DD')}`
      li.appendChild(h1)
      arr.forEach((item) => {
        const {time, goalTitle} = item
        const pDom = document.createElement('p')
        const dateDom = document.createElement('span')
        if (time) {
          dateDom.innerHTML = `${moment(time).format('HH:mm:ss')}：`
        } else {
          dateDom.innerHTML = `no time：`
        }
        const goalDom = document.createElement('span')
        if (goalTitle) {
          goalDom.innerHTML = `${goalTitle}.`
        } else {
          goalDom.innerHTML = `no goal`
        }
        pDom.appendChild(dateDom)
        pDom.appendChild(goalDom)
        li.appendChild(pDom)
      })
    }
  })
  return ul
}