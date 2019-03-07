export default class EventBinder {
  constructor() {
    this.listeners = {}
  }

  on(event, elem, listener) {
    this.listeners[event] = listener
    elem.addEventListener(event, this.listeners[event])
  }

  off(event, elem) {
    elem.removeEventListener(event, this.listeners[event])
    delete this.listeners[event]
  }
}
