import {removeChildren} from '../utils/dom'

/**
 * Add class to root element
 * @export
 * @param {HTMLDListElement} root
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function addClassRoot(root, classes) {
  root.classList.add(classes.root)
}

/**
 * Remove class of root element
 * @export
 * @param {HTMLDListElement} root
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function removeClassRoot(root, classes) {
  root.classList.remove(classes.root)
}

/**
 * Add class to item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function addClassItem(item, classes) {
  const {header, content} = item
  header.classList.add(classes.header)
  content.classList.add(classes.content)
}

/**
 * Remove class of item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function removeClassItem(item, classes) {
  const {header, content} = item
  header.classList.remove(classes.header, classes.opened)
  content.classList.remove(classes.content)
}

/**
 * Add item to root element
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {HTMLDListElement} root
 */
export function addItem(item, root) {
  root.appendChild(item.header)
  root.appendChild(item.content)
}

/**
 * Add items to root element
 * @export
 * @param {Object[]} items
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @param {HTMLDListElement} root
 */
export function addItems(items, root) {
  items.forEach(item => addItem(item, root))
}

/**
 * Remove all items of root element
 * @export
 * @param {HTMLDListElement} root
 */
export function removeItems(root) {
  removeChildren(root)
}

/**
 * Close items adding opened class
 * @export
 * @param {Object[]} items
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function closeItems(items, classes) {
  const {opened} = classes
  items.forEach(({header}) => header.classList.remove(opened))
}

/**
 * Indicates if item is opened
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function isOpen(item, classes) {
  const {opened} = classes
  return item.header.classList.contains(opened)
}

/**
 * Open item adding opened class
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function openItem(item, classes) {
  const {opened} = classes
  item.header.classList.add(opened)
}

/**
 * Close item removing opened class
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 */
export function closeItem(item, classes) {
  const {opened} = classes
  item.header.classList.remove(opened)
}

/**
 * Append item to root
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {HTMLDListElement} root
 */
export function appendItem(item, root) {
  addItem(item, root)
}

/**
 * Prepend item to root
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {HTMLDListElement} root
 */
export function prependItem(item, root) {
  const firstHeader = root.children[0]
  if (firstHeader) {
    root.insertBefore(item.header, firstHeader)
    root.insertBefore(item.content, firstHeader)
  } else {
    addItem(item, root)
  }
}

/**
 * Remove item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 */
export function removeItem(item) {
  const {header, content} = item
  header.remove()
  content.remove()
}

/**
 * Append item to root before of an item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object} referenceItem
 * @param {Number} referenceItem.id - Identifier of the referenceItem
 * @param {HTMLElement} referenceItem.header - HTMLElement with the tag name DT
 * @param {HTMLElement} referenceItem.content - HTMLElement with the tag name DD
 * @param {HTMLDListElement} root
 */
export function appendBeforeItem(item, referenceItem, root) {
  root.insertBefore(item.header, referenceItem.header)
  root.insertBefore(item.content, referenceItem.header)
}

/**
 * Append item to root after of an item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {Object} referenceItem
 * @param {Number} referenceItem.id - Identifier of the referenceItem
 * @param {HTMLElement} referenceItem.header - HTMLElement with the tag name DT
 * @param {HTMLElement} referenceItem.content - HTMLElement with the tag name DD
 * @param {HTMLDListElement} root
 */
export function appendAfterItem(item, referenceItem, root) {
  const nextHeader = referenceItem.content.nextElementSibling
  if (nextHeader) {
    root.insertBefore(item.header, nextHeader)
    root.insertBefore(item.content, nextHeader)
  } else {
    appendItem(item, root)
  }
}

/**
 * Add event click listener to item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {EventBinder} eventBinder - Binder of events
 * @param {Function} handler - Listener function
 */
export function bindClickItem(item, eventBinder, handler) {
  const {header} = item
  eventBinder.on('click', header, handler)
}

/**
 * Remove event click listener of item
 * @export
 * @param {Object} item
 * @param {Number} item.id - Identifier of the item
 * @param {HTMLElement} item.header - HTMLElement with the tag name DT
 * @param {HTMLElement} item.content - HTMLElement with the tag name DD
 * @param {EventBinder} eventBinder - Binder of events
 */
export function unbindClickItem(item, eventBinder) {
  const {header} = item
  eventBinder.off('click', header)
}
