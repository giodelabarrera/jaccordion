export function bindClickItem(item, eventBinder, handler) {
  const {header} = item
  eventBinder.on('click', header, handler)
}

export function unbindClickItem(item, eventBinder) {
  const {header} = item
  eventBinder.off('click', header)
}
