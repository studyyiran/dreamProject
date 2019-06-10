function test(string, func) {
  console.log(string + 'result is ')
  func()
}

function expect(value2) {
  return {
    toBe: (value) => {
      console.log(value2 === value)
      return value2 === value
    }
  }
}

test('loadFromDb saveDataIntoDb', () => {
  const key = 'test'
  const data = {a: 1}
  localStorage.removeItem(key)
  expect(loadFromDb(key)).toBe(null);
  expect(saveDataIntoDb(key, data)).toBe(1);
  expect(JSON.stringify(loadFromDb(key))).toBe(JSON.stringify(data));
});

test('redux', () => {
  console.log('start')
  const reducer = () => {
    console.log(arguments)
  }
  const redux = new globalRedux({}, reducer)
  redux.subscribe(() => {
    console.log(globalRedux.getState())
  })
  redux.dispatch({type: 'hehe', value: 1})
});