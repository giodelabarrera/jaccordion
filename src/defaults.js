export default {
  /**
   * Identifier of the item that appears open by default
   * @type {Number}
   */
  openAt: 0,

  /**
   * Determines if there may be more than one item open
   * @type {Boolean}
   */
  multiple: false,

  /**
   * Entries to make items
   * @type {Object[]}
   */
  entries: [],

  /**
   * Object for make items by request
   * @type {Object[]}
   */
  ajax: {
    url: '',
    processResults(data) {
      return data
    }
  },

  /**
   * Object with classes for styles
   * @type {Object}
   */
  classes: {
    root: 'jaccordion',
    header: 'jaccordion__header',
    opened: 'jaccordion__header--opened',
    content: 'jaccordion__content'
  }
}
