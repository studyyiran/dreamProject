function postNewReview(data) {
  const url = 'http://localhost:3000/testPost'
  return ajax.post(url, data)
}

function getReviewList() {
  const url = 'http://localhost:3000/testRouter?hehe=123'
  const result = ajax.get(url)
  result.then((res) => {
    window.appRedux.dispatch({type: 'saveReviewList', value: res})
  })
}
