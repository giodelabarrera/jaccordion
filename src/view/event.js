import EventBinder from '../event/event-binder'

export function bindHandlerClickItem(item, handler) {
  const {header} = item
  const eventBinder = new EventBinder()
  eventBinder.on('click', header, handler)
  return eventBinder
}
