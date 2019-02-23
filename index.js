import '@babel/polyfill'
import Jaccordion from './src'

const accordion = new Jaccordion('#second-accordion', {
  openAt: 3,
  ajax: {
    url: 'https://api.github.com/search/repositories?q=react',
    processResults({items}) {
      return items.map(item => ({
        id: item.id,
        header: item.full_name,
        content: item.description
      }))
    }
  }
})
accordion.mount()
window.accordion = accordion
