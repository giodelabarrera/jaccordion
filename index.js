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
firstAccordion.mount()

const secondAccordion = new Jaccordion('#second-accordion', {
  openAt: 1
})
secondAccordion.mount()

window.firstAccordion = firstAccordion
window.secondAccordion = secondAccordion
