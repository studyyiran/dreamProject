function renderHistory({history}) {
  const ul = document.createElement('ul')
  history.forEach((item) => {
    const {time, goalTitle} = item
    const li = document.createElement('li')
    li.innerHTML = `record time is ${moment(time).format('YYYY-MM-DD')}, goal is ${goalTitle}.`
    ul.appendChild(li)
  })
  return ul
}