import '@babel/polyfill'
import Jaccordion from './src'

// const accordion = new Jaccordion('#second-accordion', {
//   openAt: 3,
//   ajax: {
//     url: 'https://api.github.com/search/repositories?q=react',
//     processResults({items}) {
//       return items.map(item => ({
//         id: item.id,
//         header: item.full_name,
//         content: item.description
//       }))
//     }
//   }
// })
// accordion.mount()
// window.accordion = accordion

const accordion = new Jaccordion('#accordion', {
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
  ],
  ajax: {
    url: 'https://api.github.com/search/repositories?q=react',
    processResults({items}) {
      return items
        .map(item => ({
          id: item.id,
          header: item.full_name,
          content: item.description
        }))
        .slice(0, 1)
    }
  }
})
accordion.mount()
window.accordion = accordion

// const secondAccordion = new Jaccordion('#second-accordion', {
//   openAt: 1
// })
// secondAccordion.mount()

// window.firstAccordion = firstAccordion
// window.secondAccordion = secondAccordion
