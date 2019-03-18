import {document} from 'global'
import {storiesOf} from '@storybook/html'
import Jaccordion from '@giodelabarrera/jaccordion'
import '@giodelabarrera/jaccordion/dist/css/jaccordion.css'
import './stories.css'

import markup from './content/markup.html'
import defaultNotes from './content/default/notes.md'
import entriesNotes from './content/entries/notes.md'
import ajaxEntriesNotes from './content/ajax-entries/notes.md'
import openAtNotes from './content/open-at/notes.md'
import multipleOpenNotes from './content/multiple-open/notes.md'
import enableDisableForm from './content/enable-disable/form.html'
import enableDisableNotes from './content/enable-disable/notes.md'
import toggleActions from './content/toggle/actions.html'
import toggleNotes from './content/toggle/notes.md'
import insertForm from './content/insert/form.html'
import insertNotes from './content/insert/notes.md'

const stories = storiesOf('Jaccordion', module)

// stories.add('default', () => {
//   const element = createMarkupElement()
//   const options = {
//     ajax: {
//       url: 'https://api.github.com/repos/storybooks/storybook',
//       processResults: ({id, full_name: header, description: content}) => [
//         {
//           id,
//           header,
//           content
//         }
//       ]
//     }
//   }
//   const jaccordion = new Jaccordion(element, options)
//   ;(async () => {
//     await jaccordion.mount()
//   })()
//   return jaccordion.root
// })

stories.add(
  'default',
  () => {
    const container = document.createElement('div')
    container.innerHTML = markup

    const jaccordion = new Jaccordion(container.querySelector('dl'))
    jaccordion.mount()

    return container
  },
  {notes: defaultNotes}
)

stories.add(
  'entries',
  () => {
    const container = document.createElement('div')
    container.innerHTML = '<dl></dl>'

    const options = {
      entries: [
        {id: 0, header: 'Entry 1', content: 'Entry 1 Content...'},
        {id: 1, header: 'Entry 2', content: 'Entry 2 Content...'},
        {id: 2, header: 'Entry 3', content: 'Entry 3 Content...'}
      ]
    }
    const jaccordion = new Jaccordion(container.querySelector('dl'), options)
    jaccordion.mount()

    return container
  },
  {
    notes: entriesNotes
  }
)

stories.add(
  'ajax entries',
  () => {
    const container = document.createElement('div')
    container.innerHTML = '<dl></dl>'

    const options = {
      ajax: {
        url:
          'https://api.github.com/search/repositories?q=javascript+language:javascript&sort=stars&order=desc',
        processResults: ({items}) => {
          return items.map(({id, full_name: header, description: content}) => ({
            id,
            header,
            content
          }))
        }
      }
    }
    const jaccordion = new Jaccordion(container.querySelector('dl'), options)
    ;(async () => {
      await jaccordion.mount()
    })()

    return container
  },
  {
    notes: ajaxEntriesNotes
  }
)

stories.add(
  'open at',
  () => {
    const container = document.createElement('div')
    container.innerHTML = markup

    const options = {openAt: 1}
    const jaccordion = new Jaccordion(container.querySelector('dl'), options)
    jaccordion.mount()

    return container
  },
  {
    notes: openAtNotes
  }
)

stories.add(
  'multiple open',
  () => {
    const container = document.createElement('div')
    container.innerHTML = markup

    const options = {multiple: true}
    const jaccordion = new Jaccordion(container.querySelector('dl'), options)
    jaccordion.mount()

    return container
  },
  {
    notes: multipleOpenNotes
  }
)

stories.add(
  'enable/disable',
  () => {
    const container = document.createElement('div')
    container.innerHTML = markup + enableDisableForm

    const jaccordion = new Jaccordion(container.querySelector('dl'))
    jaccordion.mount()
    jaccordion.disable()

    const input = container.querySelector('input')
    input.addEventListener('change', function() {
      if (this.checked === true) jaccordion.enable()
      else jaccordion.disable()
    })

    return container
  },
  {
    notes: enableDisableNotes
  }
)

stories.add(
  'toggle',
  () => {
    const container = document.createElement('div')
    container.innerHTML = markup + toggleActions

    const jaccordion = new Jaccordion(container.querySelector('dl'))
    jaccordion.mount()

    const actions = container.querySelector('.actions')
    const children = Array.from(actions.children)
    children.forEach((child, index) =>
      child.addEventListener('click', () => jaccordion.toggle(index))
    )

    return container
  },
  {
    notes: toggleNotes
  }
)

stories.add(
  'insert',
  () => {
    const container = document.createElement('div')
    container.innerHTML = markup + insertForm

    const jaccordion = new Jaccordion(container.querySelector('dl'))
    jaccordion.mount()

    const form = container.querySelector('form')
    const idElem = form.children[0]
    const headerElem = form.children[1]
    const contentElem = form.children[2]
    const actionElem = form.children[3]
    const referenceIdElem = form.children[4]

    actionElem.addEventListener('change', function() {
      const allows = ['append-before', 'append-after']
      if (allows.includes(this.value)) {
        referenceIdElem.style.display = 'inline-block'
      } else {
        referenceIdElem.style.display = 'none'
      }
    })

    form.addEventListener('submit', function(e) {
      e.preventDefault()
      const id = parseInt(idElem.value)
      const header = headerElem.value
      const content = contentElem.value
      const referenceId = parseInt(referenceIdElem.value)
      const entry = {id, header, content}
      switch (actionElem.value) {
        case 'append':
          jaccordion.append(entry)
          break
        case 'prepend':
          jaccordion.prepend(entry)
          break
        case 'append-before':
          jaccordion.appendBefore(entry, referenceId)
          break
        case 'append-after':
          jaccordion.appendAfter(entry, referenceId)
          break
      }
    })

    return container
  },
  {
    notes: insertNotes
  }
)

// remove
// on
// styles
