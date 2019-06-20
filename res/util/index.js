// 这种根据是否能在页面中获取，来做插入，感觉不太好。但是我实在没有别的手段，来跟踪，标记一个dom。目前只能这样。
/*
root 和父节点需要绑定关系
dom 需要绑定的子节点
id 用来保存节点信息的id

 */

function makeSlot(father, dom, id) {
  let slot = document.querySelector(`#${id}`)
  if (slot) {
    slot.parentNode.removeChild(slot)
  }
  slot = document.createElement('div')
  slot.id = id
  father.appendChild(slot)
  slot.appendChild(dom)
}