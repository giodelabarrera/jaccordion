
class Accordion {
  constructor(element, options = {}) {

    const titles = element.querySelectorAll('dt');
    titles.forEach(title => {
      title.addEventListener('click', event => {
        const description = event.target.nextElementSibling
        description.style.height = 'auto';
        description.style.display = 'block';
      });
    })

    const descriptions = element.querySelectorAll('dd');
    descriptions.forEach(description => {
      description.style.height = '0px';
      description.style.display = 'none';
    })

  }
}

export default Accordion;
