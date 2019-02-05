
function initAccordion(element, options = {}) {

  let currentItems = [];

  function createItem(title, description) {
    return {
      title, description
    }
  }
  
  function createAccordion(children) {
    const titles = children.filter(child => child.nodeName === 'DT');
  
    const items = titles.map(title => {
      const description = title.nextElementSibling;
      return createItem(title, description)
    })
  
    return items;
  }

  function getItems() {
    return currentItems;
  }

  function dispatch(element, options) {
    const children = Array.from(element.children);

    currentItems = createAccordion(children);
  }

  dispatch(element, options);

  return {
    getItems
  }
}

const list = document.querySelector('dl');
const accordion = initAccordion(list);

withStyles({ background: 'black' })(initAccordion(list));