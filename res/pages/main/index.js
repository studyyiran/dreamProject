function pagesMainRender({onChange}) {
  const main = document.createElement('div')
  const id = 'pagesMainRender'
  main.id = id
  main.innerHTML = `<ul>
      <li><button data-type="today">今天</button></li>
      <li><button data-type="history">历史</button></li>
      <li><button data-type="review">复习</button></li>
  </ul>`

  const todayButton = main.querySelector('[data-type="today"]')
  const historyButton = main.querySelector(`[data-type='history']`)
  const reviewButton = main.querySelector(`[data-type='review']`)
  todayButton.addEventListener('click', () => {
    onChange && onChange(0)
  })
  historyButton.addEventListener('click', () => {
    onChange && onChange(1)
  })
  reviewButton.addEventListener('click', () => {
    onChange && onChange(2)
  })
  return main
}