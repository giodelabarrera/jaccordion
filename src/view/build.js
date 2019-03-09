export function addClassRoot(root, classes) {
  root.classList.add(classes.root)
}

// @TODO: test
export function removeClassRoot(root, classes) {
  root.classList.remove(classes.root)
}

export function addClassItem(item, classes) {
  const {header, content} = item
  header.classList.add(classes.header)
  content.classList.add(classes.content)
}

export function removeClassItem(item, classes) {
  const {header, content} = item
  header.classList.remove(classes.header, classes.opened)
  content.classList.remove(classes.content)
}

export function addClasses({root, items, openAt, classes}) {
  addClassRoot(root, classes)
  items.forEach(({id, header, content}) => {
    addClassItem({header, content}, classes)
    if (openAt === id) header.classList.add(classes.opened)
  })
}

export function removeClasses({root, items, classes}) {
  root.classList.remove(classes.root)
  items.forEach(({header, content}) => {
    header.classList.remove(classes.header, classes.opened)
    content.classList.remove(classes.content)
  })
}
