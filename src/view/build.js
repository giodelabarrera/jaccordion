export function addClasses({root, items, openAt, classes}) {
  root.classList.add(classes.root)
  items.forEach(({header, content}, currentIndex) => {
    header.classList.add(classes.header)
    if (openAt === currentIndex) {
      header.classList.add(classes.opened)
    }
    content.classList.add(classes.content)
  })
}

export function removeClasses({root, items, classes}) {
  root.classList.remove(classes.root)
  items.forEach(({header, content}) => {
    header.classList.remove(classes.header, classes.opened)
    content.classList.remove(classes.content)
  })
}
