const host = 'http://localhost:3000'
const localUrl = host + '/reviewPart'
const reviewServer = {
  postNewReview: function postNewReview(data) {
    const url = localUrl + '/postReview'
    // 不能为空
    if (Object.keys(data).every((item) => data[item])) {
      return ajax.post(url, data).then((res) => {
        window.appRedux.dispatch({type: 'setReviewList', value: res})
        return res
      })
    } else {

    }
  },
  getReviewList: function getReviewList() {
    const url = localUrl + '/getReviewList'
    const result = ajax.get(url)
    return result.then((res) => {
      window.appRedux.dispatch({type: 'setReviewList', value: res})
      return res
    })
  },
  updateReviewCount: function updateReviewCount(id) {
    const url = localUrl + '/updateReviewCount'
    const result = ajax.put(url, {id})
    return result.then((res) => {
      window.appRedux.dispatch({type: 'setReviewList', value: res})
      return res
    })
  },
  hideReviewItem: function hideReviewItem(id) {
    const url = localUrl + '/hideReviewItem'
    const result = ajax.put(url, {id})
    return result.then((res) => {
      window.appRedux.dispatch({type: 'setReviewList', value: res})
      return res
    })
  }
}