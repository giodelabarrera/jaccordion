import {isTagName} from '../utils/dom'

/**
 * Create a item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @returns {Object} Item
 */
export function createItem(item) {
  const {id, header, content} = item
  header.dataset.id = id
  return {id, header, content}
}

/**
 * Remove a item
 * @export
 * @param {Number} id - Identifier of the item
 * @param {Object[]} items - Items to search id
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Array} Items without the item found by id
 */
export function removeItem(id, items) {
  return items.filter(item => item.id !== id)
}

/**
 * Returns item found by id
 * @export
 * @param {Number} id - Identifier of the item
 * @param {Object[]} items - Items to search id
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Object|undefined} Item found
 */
export function findItemById(id, items) {
  return items.find(item => item.id === id)
}

/**
 * Add an item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object[]} items - Items to add item
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Array} Items with the new item added
 */
export function addItem(item, items) {
  return [...items, item]
}

/**
 * Append an item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object[]} items - Items to append the item
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Array} Items with the new item appended
 */
export function appendItem(item, items) {
  return addItem(item, items)
}

/**
 * Prepend an item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object[]} items - Items to prepend the item
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Array} Items with the new item prepended
 */
export function prependItem(item, items) {
  return [item, ...items]
}

/**
 * Append an item before of an item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Number} referenceId - identifier to reference the item
 * @param {Object[]} items - Items to append the item
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Array} Items with the new item appended
 */
export function appendBeforeItem(item, referenceId, items) {
  const index = items.findIndex(item => item.id === referenceId)
  return [...items.slice(0, index), item, ...items.slice(index)]
}

/**
 * Append an item after of an item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Number} referenceId - identifier to reference the item
 * @param {Object[]} items - Items to append the item
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Array} Items with the new item appended
 */
export function appendAfterItem(item, referenceId, items) {
  const index = items.findIndex(item => item.id === referenceId)
  return [...items.slice(0, index + 1), item, ...items.slice(index + 1)]
}

/**
 * Create items from the DT and DD elements of a DL element
 * @export
 * @param {HTMLDListElement} dlElem - Root element
 * @returns {Array} Items created
 */
export function createItemsByRoot(dlElem) {
  const children = Array.from(dlElem.children)
  const headers = children.filter(isTagName('dt'))
  return headers.map((header, index) => {
    const content = header.nextElementSibling
    return createItem({id: index, header, content})
  })
}

/**
 * Create an item by entry
 * @export
 * @param {Object} entry - Entry object
 * @param {Number} entry.id - Identifier to the item
 * @param {String} entry.header - String to the header item
 * @param {String} entry.content - String to the content item
 * @returns
 */
export function createItemByEntry(entry) {
  const {id} = entry
  const header = document.createElement('dt')
  header.innerHTML = entry.header
  const content = document.createElement('dd')
  content.innerHTML = entry.content
  return createItem({id, header, content})
}

/**
 * Create items by entries
 * @export
 * @param {Object[]} entries - Entries to create the items
 * @param {Number} entries[].id - Identifier to the item
 * @param {String} entries[].header - String to the header item
 * @param {String} entries[].content - String to the content item
 * @returns {Array} Entries
 */
export function createItemsByEntries(entries) {
  return entries.map(createItemByEntry)
}

/**
 * Indicates if an id exists in id of items
 * @export
 * @param {Number} id - Identifier of the item
 * @param {Object[]} items - Items to search the item
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @returns {Boolean}
 */
export function existsIdInItems(id, items) {
  return items.map(({id}) => id).includes(id)
}
