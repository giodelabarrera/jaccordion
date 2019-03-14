/**
 * Class to handle events related to an element
 * @export
 * @class EventBinder
 */
export default class EventBinder {
  /**
   * Creates an instance of EventBinder
   * @memberof EventBinder
   */
  constructor() {
    this.listeners = {}
  }

  /**
   * Adds event listener to an element
   * @param {String} event
   * @param {HTMLElement} elem
   * @param {Function} listener
   * @memberof EventBinder
   */
  on(event, elem, listener) {
    this.listeners[event] = listener
    elem.addEventListener(event, this.listeners[event])
  }

  /**
   * Removes event listener of an element
   * @param {String} event
   * @param {HTMLElement} elem
   * @memberof EventBinder
   */
  off(event, elem) {
    elem.removeEventListener(event, this.listeners[event])
    delete this.listeners[event]
  }
}
