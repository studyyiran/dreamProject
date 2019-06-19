const ajax = {}
ajax.post = function (url, data) {
  ajax.fetch({
    url,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
  })
}

ajax.fetch = function (config) {
  console.log('ajax')
  console.log(config)
  const {url, ...otherConfig} = config
  fetch(url, otherConfig).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.error(e)
  })
}