import '@babel/polyfill'
import Jaccordion from './src'
// import {createItemByEntry} from './src/core/item'

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

const accordion = new Jaccordion(document.getElementById('accordion'), {
  entries: [
    {
      id: 3,
      header: 'Section 4',
      content: 'Description 4'
    },
    {
      id: 4,
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
  },
  openAt: 10270250
})
accordion.mount()
window.accordion = accordion

// window.entry = createItemByEntry({
//   header: 'New section 1',
//   content: 'With new description 1'
// })
// window.entryTwo = createItemByEntry({
//   header: 'New section 2',
//   content: 'With new description 2'
// })

// const secondAccordion = new Jaccordion('#second-accordion', {
//   openAt: 1
// })
// secondAccordion.mount()

// window.firstAccordion = firstAccordion
// window.secondAccordion = secondAccordion
