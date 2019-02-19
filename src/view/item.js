export function isOpen(index, items, className) {
  return items[index].header.classList.contains(className)
}

export function closeItems(items, className) {
  items.forEach(({header}) => header.classList.remove(className))
}

export function openItem(index, items, className) {
  closeItems(items, className)
  items[index].header.classList.add(className)
}

export function closeItem(index, items, className) {
  items[index].header.classList.remove(className)
}
