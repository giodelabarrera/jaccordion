import Jaccordion from './src'

const firstAccordion = new Jaccordion('#first-accordion', {
  entries: [
    {
      id: 4,
      header: 'Section 4',
      content: 'Description 4'
    },
    {
      id: 5,
      header: 'Section 5',
      content: 'Description 5'
    }
  ]
})
firstAccordion
  .on('open.after', item => {
    if (item.id === 4) item.content.innerHTML = '<h1>Section with id 4</h1>'
  })
  .mount()

const secondAccordion = new Jaccordion('#second-accordion', {
  openAt: 1
})
secondAccordion.mount()

window.firstAccordion = firstAccordion
window.secondAccordion = secondAccordion
