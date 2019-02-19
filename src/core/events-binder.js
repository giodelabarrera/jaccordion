export default class EventsBinder {
  constructor() {
    this.listeners = {}
  }

  on(event, elem, listener) {
    this.listeners[event] = listener
    elem.addEventListener(event, this.listeners[event])
  }

  off(event, elem) {
    elem.removeEventListener(event, this.listeners[event])
  }
}
