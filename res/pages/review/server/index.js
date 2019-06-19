function postNewReview(data) {
  const url = 'http://localhost:3000/postNewReview'
  return ajax.post(url, data)
}

function getReviewList() {
  const url = 'http://localhost:3000/getReviewList'
  const result = ajax.get(url)
  return result.then((res) => {
    window.appRedux.dispatch({type: 'setReviewList', value: res})
    return res
  })
}
