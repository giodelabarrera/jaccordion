export default class EventBus {
  constructor() {
    this.events = {}
  }

  on(event, handler) {
    if (this.events.hasOwnProperty(event) === false) {
      this.events[event] = []
    }

    this.events[event] = [...this.events[event], handler]
    const index = this.events[event].length - 1

    return {
      remove() {
        delete this.events[event][index]
      }
    }
  }

  emit(event, context) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event].forEach(handler => handler(context || {}))
    }
  }
}
