/**
 * Class to communicate events between elements
 * @export
 * @class EventBus
 */
export default class EventBus {
  /**
   * Creates an instance of EventBus
   * @memberof EventBus
   */
  constructor() {
    this.events = {}
  }

  /**
   * Subscribe a handler to an event
   * @param {String} event
   * @param {Function} handler
   * @returns {Object} Object with function to remove subscription of the event
   * @memberof EventBus
   */
  on(event, handler) {
    if (this.events.hasOwnProperty(event) === false) {
      this.events[event] = []
    }

    this.events[event] = [...this.events[event], handler]
    const index = this.events[event].length - 1

    return {
      remove: () => {
        this.events[event] = this.events[event].filter(
          (handlers, currentIndex) => currentIndex !== index
        )
      }
    }
  }

  /**
   * Emit the event
   * @param {String} event
   * @param {*} [context={}] - The value you will receive the handler function subscribed
   * @memberof EventBus
   */
  emit(event, context = {}) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event].forEach(handler => handler(context))
    }
  }
}
