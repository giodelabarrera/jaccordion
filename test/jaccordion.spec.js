import fetchMock from 'fetch-mock'
import defaults from '../src/defaults'
import Jaccordion from '../src'
import EventBus from '../src/event/event-bus'

const {classes} = defaults

describe('jaccordion', () => {
  let root

  beforeEach(() => {
    root = document.createElement('dl')
  })

  afterEach(() => {
    root.remove()
  })

  describe('entries', () => {
    test('should fail on trying to pass entries option with repeated id', () => {
      const entriesId = [3, 4, 4, 5]
      const entries = entriesId.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const options = {entries}

      expect(() => new Jaccordion(root, options)).toThrowError(
        `entries with id [4] already exist in entries`
      )
    })
  })

  describe('initial', () => {
    let jaccordion

    beforeEach(() => {
      jaccordion = new Jaccordion(root)
    })

    test('should be an instance of Jaccordion', () => {
      expect(jaccordion).toBeInstanceOf(Jaccordion)
    })

    test('should the element be of type HTMLDListElement', () => {
      expect(jaccordion.root).toBeDefined()
      expect(jaccordion.root).toBeInstanceOf(HTMLDListElement)
      expect(jaccordion.root.tagName).toBe('DL')
    })

    test('should have the same settings', () => {
      const {openAt, multiple, entries, ajax, classes} = defaults

      expect(jaccordion._settings.openAt).toBe(openAt)
      expect(jaccordion._settings.multiple).toBe(multiple)
      expect(jaccordion._settings.entries).toEqual(entries)
      expect(jaccordion._settings.ajax.url).toBe(ajax.url)
      const data = {results: [{id: 0, title: 'post1'}, {id: 1, title: 'post2'}]}
      expect(ajax.processResults(data)).toEqual(data)
      expect(jaccordion._settings.classes).toEqual(classes)
    })

    test('should have the same eventBinders', () => {
      expect(jaccordion._eventBinders).toEqual([])
    })

    test('should have the same eventBus', () => {
      expect(jaccordion._eventBus).toBeInstanceOf(EventBus)
    })

    test('should have the same root', () => {
      expect(jaccordion.root).toEqual(root)
    })

    test('should have the same enabled', () => {
      expect(jaccordion.enabled).toBeFalsy()
    })

    test('should have the same items', () => {
      expect(jaccordion.items).toEqual([])
    })
  })

  describe('mount', () => {
    describe('markup', () => {
      let markupIds
      let markupEntries

      beforeEach(() => {
        markupIds = [0, 1, 2]
        markupEntries = markupIds.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
        const sections = markupEntries.reduce((sections, entry) => {
          return (
            sections +
            `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
          )
        }, '')
        root.innerHTML = sections
      })

      test('should mount correctly', () => {
        const jaccordion = new Jaccordion(root)
        jaccordion.mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root.classList.contains(classes.root)).toBeTruthy()
        expect(jaccordion.items).toHaveLength(markupEntries.length)
        jaccordion.items.forEach(({id, header, content}, index) => {
          const entry = markupEntries[index]
          expect(id).toBeDefined()
          expect(header).toBeDefined()
          expect(content).toBeDefined()
          expect(id).toBe(entry.id)
          expect(parseInt(header.dataset.id)).toBe(entry.id)
          expect(header.classList.contains(classes.header)).toBeTruthy()
          expect(content.classList.contains(classes.content)).toBeTruthy()
          expect(header.textContent).toBe(`${entry.header}`)
          expect(content.textContent).toBe(`${entry.content}`)
        })
      })
    })

    describe('entries', () => {
      let entriesId
      let entries

      beforeEach(() => {
        entriesId = [3, 4, 5]
        entries = entriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
      })

      test('should mount correctly with entries option', () => {
        const options = {entries}
        const jaccordion = new Jaccordion(root, options)
        jaccordion.mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root.classList.contains(classes.root)).toBeTruthy()
        expect(jaccordion.items).toHaveLength(entries.length)
        jaccordion.items.forEach(({id, header, content}, index) => {
          const entry = entries[index]
          expect(id).toBeDefined()
          expect(header).toBeDefined()
          expect(content).toBeDefined()
          expect(id).toBe(entry.id)
          expect(parseInt(header.dataset.id)).toBe(entry.id)
          expect(header.classList.contains(classes.header)).toBeTruthy()
          expect(content.classList.contains(classes.content)).toBeTruthy()
          expect(header.textContent).toBe(`${entry.header}`)
          expect(content.textContent).toBe(`${entry.content}`)
        })
      })
    })

    describe('ajax', () => {
      let entriesId
      let entries
      let ajax

      beforeEach(() => {
        entriesId = [111, 112, 113]
        entries = entriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))

        ajax = {
          url: 'http://example.com',
          processResults: data => data
        }

        fetchMock.get('*', entries)
      })

      afterEach(() => {
        fetchMock.reset()
      })

      test('should mount correctly with ajax option', async () => {
        const options = {ajax}
        const jaccordion = new Jaccordion(root, options)
        await jaccordion.mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root.classList.contains(classes.root)).toBeTruthy()
        expect(jaccordion.items).toHaveLength(entries.length)
        jaccordion.items.forEach(({id, header, content}, index) => {
          const entry = entries[index]
          expect(id).toBeDefined()
          expect(header).toBeDefined()
          expect(content).toBeDefined()
          expect(id).toBe(entry.id)
          expect(parseInt(header.dataset.id)).toBe(entry.id)
          expect(header.classList.contains(classes.header)).toBeTruthy()
          expect(content.classList.contains(classes.content)).toBeTruthy()
          expect(header.textContent).toBe(`${entry.header}`)
          expect(content.textContent).toBe(`${entry.content}`)
        })
      })

      test('should fail on trying to pass entries of processed results of ajax with repeated id', async () => {
        entriesId = [111, 112, 112, 113, 113]
        entries = entriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
        fetchMock.reset()
        fetchMock.get('*', entries)

        const options = {ajax}
        const jaccordion = new Jaccordion(root, options)

        await expect(jaccordion.mount()).rejects.toThrow(
          `entries with id [112, 113] already exist in entries`
        )
      })
    })

    describe('markup, entries, ajax', () => {
      let markupIds
      let markupEntries
      let entriesId
      let entries
      let ajaxEntriesId
      let ajaxEntries
      let ajax
      let fullEntries

      beforeEach(() => {
        // markup
        markupIds = [0, 1, 2]
        markupEntries = markupIds.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
        const sections = markupEntries.reduce((sections, entry) => {
          return (
            sections +
            `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
          )
        }, '')
        root.innerHTML = sections

        // entries
        entriesId = [3, 4, 5]
        entries = entriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))

        // ajax
        ajaxEntriesId = [111, 112, 113]
        ajaxEntries = ajaxEntriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
        ajax = {
          url: 'http://example.com',
          processResults: data => data
        }
        fetchMock.get('*', ajaxEntries)

        fullEntries = [...markupEntries, ...entries, ...ajaxEntries]
      })

      afterEach(() => {
        fetchMock.reset()
      })

      test('should mount correctly with markup, entries option and ajax option', async () => {
        const options = {entries, ajax}
        const jaccordion = new Jaccordion(root, options)
        await jaccordion.mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root.classList.contains(classes.root)).toBeTruthy()
        expect(jaccordion.items).toHaveLength(fullEntries.length)
        jaccordion.items.forEach(({id, header, content}, index) => {
          const entry = fullEntries[index]
          expect(id).toBeDefined()
          expect(header).toBeDefined()
          expect(content).toBeDefined()
          expect(id).toBe(entry.id)
          expect(parseInt(header.dataset.id)).toBe(entry.id)
          expect(header.classList.contains(classes.header)).toBeTruthy()
          expect(content.classList.contains(classes.content)).toBeTruthy()
          expect(header.textContent).toBe(`${entry.header}`)
          expect(content.textContent).toBe(`${entry.content}`)
        })
      })

      test('should fail on trying to pass entries where your id is already in items', async () => {
        entriesId = [3, 4, 5, 1, 2]
        entries = entriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
        const options = {entries, ajax}
        const jaccordion = new Jaccordion(root, options)
        await expect(jaccordion.mount()).rejects.toThrow(
          `entries with id [1, 2] already exist in items`
        )
      })

      test('should fail on trying to pass entries of processed results of ajax where your id is already in items', async () => {
        ajaxEntriesId = [111, 1, 112, 113, 4]
        ajaxEntries = ajaxEntriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
        fetchMock.reset()
        fetchMock.get('*', ajaxEntries)

        const options = {entries, ajax}
        const jaccordion = new Jaccordion(root, options)
        await expect(jaccordion.mount()).rejects.toThrow(
          `entries with id [1, 4] already exist in items`
        )
      })
    })

    describe('events', () => {
      let markupIds
      let markupEntries

      beforeEach(() => {
        markupIds = [0, 1, 2]
        markupEntries = markupIds.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))
        const sections = markupEntries.reduce((sections, entry) => {
          return (
            sections +
            `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
          )
        }, '')
        root.innerHTML = sections
      })

      test('should emit event mount.before correctly', () => {
        const spy = jest.fn()
        const jaccordion = new Jaccordion(root)
        jaccordion.on('mount.before', spy)
        jaccordion.mount()

        expect(spy.mock.calls.length).toBe(1)
      })

      test('should emit event mount.after correctly', () => {
        const spy = jest.fn()
        const jaccordion = new Jaccordion(root)
        jaccordion.on('mount.after', spy)
        jaccordion.mount()

        expect(spy.mock.calls.length).toBe(1)
      })
    })

    describe('ajax entries events', () => {
      let entriesId
      let entries
      let ajax

      beforeEach(() => {
        entriesId = [111, 112, 113]
        entries = entriesId.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))

        ajax = {
          url: 'http://example.com',
          processResults: data => data
        }

        fetchMock.get('*', entries)
      })

      afterEach(() => {
        fetchMock.reset()
      })

      test('should mount correctly with ajax option', async () => {
        const options = {ajax}
        const jaccordion = new Jaccordion(root, options)
        await jaccordion.mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root.classList.contains(classes.root)).toBeTruthy()
        expect(jaccordion.items).toHaveLength(entries.length)
        jaccordion.items.forEach(({id, header, content}, index) => {
          const entry = entries[index]
          expect(id).toBeDefined()
          expect(header).toBeDefined()
          expect(content).toBeDefined()
          expect(id).toBe(entry.id)
          expect(parseInt(header.dataset.id)).toBe(entry.id)
          expect(header.classList.contains(classes.header)).toBeTruthy()
          expect(content.classList.contains(classes.content)).toBeTruthy()
          expect(header.textContent).toBe(`${entry.header}`)
          expect(content.textContent).toBe(`${entry.content}`)
        })
      })

      test('should emit event ajaxEntries.before correctly', async () => {
        const spy = jest.fn()
        const options = {ajax}
        const jaccordion = new Jaccordion(root, options)
        jaccordion.on('ajaxEntries.before', spy)
        await jaccordion.mount()

        expect(spy.mock.calls.length).toBe(1)
      })

      test('should emit event ajaxEntries.success correctly', async () => {
        const spy = jest.fn()
        const options = {ajax}
        const jaccordion = new Jaccordion(root, options)
        jaccordion.on('ajaxEntries.success', spy)
        await jaccordion.mount()

        expect(spy.mock.calls.length).toBe(1)
      })
    })
  })

  describe('disable', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should disable correctly', () => {
      const jaccordion = new Jaccordion(root)
      jaccordion.mount()
      jaccordion.disable()

      expect(jaccordion.enabled).toBeFalsy()
    })
  })

  describe('enable', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should enable correctly', () => {
      const jaccordion = new Jaccordion(root)
      jaccordion.mount()
      jaccordion.disable()
      jaccordion.enable()

      expect(jaccordion.enabled).toBeTruthy()
    })
  })

  describe('toggle', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should toggle item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.toggle(1)
      const items = jaccordion.items

      expect(items[0].header.classList.contains(classes.opened)).toBeFalsy()
      expect(items[1].header.classList.contains(classes.opened)).toBeTruthy()
      expect(items[2].header.classList.contains(classes.opened)).toBeFalsy()
    })

    test('should not do anything if accordion is disabled', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.disable()
      jaccordion.toggle(1)
      const items = jaccordion.items

      expect(items[0].header.classList.contains(classes.opened)).toBeTruthy()
      expect(items[1].header.classList.contains(classes.opened)).toBeFalsy()
      expect(items[2].header.classList.contains(classes.opened)).toBeFalsy()
    })
  })

  describe('isOpen', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should check if is open item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      expect(jaccordion.isOpen(0)).toBeTruthy()
    })
  })

  describe('open', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should open item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.open(1)
      const items = jaccordion.items

      expect(items[0].header.classList.contains(classes.opened)).toBeFalsy()
      expect(items[1].header.classList.contains(classes.opened)).toBeTruthy()
      expect(items[2].header.classList.contains(classes.opened)).toBeFalsy()
    })

    test('should open more than one article if multiple option is enabled', () => {
      const options = {multiple: true}
      const jaccordion = new Jaccordion(root, options) // default openAt 0
      jaccordion.mount()
      jaccordion.open(1)
      const items = jaccordion.items

      expect(items[0].header.classList.contains(classes.opened)).toBeTruthy()
      expect(items[1].header.classList.contains(classes.opened)).toBeTruthy()
      expect(items[2].header.classList.contains(classes.opened)).toBeFalsy()
    })

    test('should emit event open.before correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('open.before', spy)
      jaccordion.mount()
      jaccordion.open(1)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })

    test('should emit event open.after correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('open.after', spy)
      jaccordion.mount()
      jaccordion.open(1)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })
  })

  describe('close', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should close item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.close(0)
      const items = jaccordion.items

      expect(items[0].header.classList.contains(classes.opened)).toBeFalsy()
      expect(items[1].header.classList.contains(classes.opened)).toBeFalsy()
      expect(items[2].header.classList.contains(classes.opened)).toBeFalsy()
    })

    test('should emit event close.before correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('close.before', spy)
      jaccordion.mount()
      jaccordion.close(1)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })

    test('should emit event close.after correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('close.after', spy)
      jaccordion.mount()
      jaccordion.close(1)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })
  })

  describe('append', () => {
    let markupIds
    let markupEntries
    let entryId
    let entry

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections

      entryId = 4
      entry = {
        id: entryId,
        header: `Header ${entryId}`,
        content: `Description ${entryId}`
      }
    })

    test('should append item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.append(entry)
      const items = jaccordion.items

      expect(items).toHaveLength(4)
      const {id, header, content} = items[3]
      expect(id).toBeDefined()
      expect(header).toBeDefined()
      expect(content).toBeDefined()
      expect(id).toBe(entry.id)
      expect(parseInt(header.dataset.id)).toBe(entry.id)
      expect(header.classList.contains(classes.header)).toBeTruthy()
      expect(content.classList.contains(classes.content)).toBeTruthy()
      expect(header.textContent).toBe(`${entry.header}`)
      expect(content.textContent).toBe(`${entry.content}`)
    })

    test('should emit event append correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('append', spy)
      jaccordion.mount()
      jaccordion.append(entry)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })
  })

  describe('prepend', () => {
    let markupIds
    let markupEntries
    let entryId
    let entry

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections

      entryId = 4
      entry = {
        id: entryId,
        header: `Header ${entryId}`,
        content: `Description ${entryId}`
      }
    })

    test('should prepend item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.prepend(entry)
      const items = jaccordion.items

      expect(items).toHaveLength(4)
      const {id, header, content} = items[0]
      expect(id).toBeDefined()
      expect(header).toBeDefined()
      expect(content).toBeDefined()
      expect(id).toBe(entry.id)
      expect(parseInt(header.dataset.id)).toBe(entry.id)
      expect(header.classList.contains(classes.header)).toBeTruthy()
      expect(content.classList.contains(classes.content)).toBeTruthy()
      expect(header.textContent).toBe(`${entry.header}`)
      expect(content.textContent).toBe(`${entry.content}`)
    })

    test('should emit event prepend correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('prepend', spy)
      jaccordion.mount()
      jaccordion.prepend(entry)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })
  })

  describe('appendBefore', () => {
    let markupIds
    let markupEntries
    let entryId
    let entry

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections

      entryId = 4
      entry = {
        id: entryId,
        header: `Header ${entryId}`,
        content: `Description ${entryId}`
      }
    })

    test('should appendBefore item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.appendBefore(entry, 2)
      const items = jaccordion.items

      expect(items).toHaveLength(4)
      const {id, header, content} = items[2]
      expect(id).toBeDefined()
      expect(header).toBeDefined()
      expect(content).toBeDefined()
      expect(id).toBe(entry.id)
      expect(parseInt(header.dataset.id)).toBe(entry.id)
      expect(header.classList.contains(classes.header)).toBeTruthy()
      expect(content.classList.contains(classes.content)).toBeTruthy()
      expect(header.textContent).toBe(`${entry.header}`)
      expect(content.textContent).toBe(`${entry.content}`)
    })

    test('should emit event appendBefore correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('appendBefore', spy)
      jaccordion.mount()
      jaccordion.appendBefore(entry, 2)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })
  })

  describe('appendAfter', () => {
    let markupIds
    let markupEntries
    let entryId
    let entry

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections

      entryId = 4
      entry = {
        id: entryId,
        header: `Header ${entryId}`,
        content: `Description ${entryId}`
      }
    })

    test('should appendAfter item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.appendAfter(entry, 1)
      const items = jaccordion.items

      expect(items).toHaveLength(4)
      const {id, header, content} = items[2]
      expect(id).toBeDefined()
      expect(header).toBeDefined()
      expect(content).toBeDefined()
      expect(id).toBe(entry.id)
      expect(parseInt(header.dataset.id)).toBe(entry.id)
      expect(header.classList.contains(classes.header)).toBeTruthy()
      expect(content.classList.contains(classes.content)).toBeTruthy()
      expect(header.textContent).toBe(`${entry.header}`)
      expect(content.textContent).toBe(`${entry.content}`)
    })

    test('should emit event appendAfter correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('appendAfter', spy)
      jaccordion.mount()
      jaccordion.appendAfter(entry, 1)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBeDefined()
    })
  })

  describe('remove', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should remove item correctly', () => {
      const jaccordion = new Jaccordion(root) // default openAt 0
      jaccordion.mount()
      jaccordion.remove(1)
      expect(jaccordion.items).toHaveLength(2)
    })

    test('should emit event remove.before correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('remove.before', spy)
      jaccordion.mount()
      const idToRemove = 1
      jaccordion.remove(idToRemove)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0].id).toBe(idToRemove)
    })

    test('should emit event remove.after correctly', () => {
      const spy = jest.fn(item => {})
      const jaccordion = new Jaccordion(root)
      jaccordion.on('remove.after', spy)
      jaccordion.mount()
      const idToRemove = 1
      jaccordion.remove(idToRemove)

      expect(spy.mock.calls.length).toBe(1)
      expect(spy.mock.calls[0][0]).toBe(idToRemove)
    })
  })

  describe('on', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should subscribe to an event correctly', () => {
      const spy = jest.fn()
      const jaccordion = new Jaccordion(root)
      jaccordion.on('mount.after', spy)
      jaccordion.mount()

      expect(spy.mock.calls.length).toBe(1)
    })
  })

  describe('unmount', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should unmount correctly', () => {
      const jaccordion = new Jaccordion(root)
      jaccordion.mount()
      jaccordion.unmount()

      expect(jaccordion.root.classList.contains(classes.root)).toBeFalsy()
      expect(jaccordion.enabled).toBeFalsy()
      expect(jaccordion.items).toHaveLength(0)
      const children = Array.from(jaccordion.root.children)
      const headers = children.filter(child => child.tagName === 'DT')
      headers.forEach(header => {
        expect(header.classList.contains(classes.header)).toBeFalsy()
        expect(header.classList.contains(classes.opened)).toBeFalsy()
        const content = header.nextElementSibling
        expect(content.classList.contains(classes.content)).toBeFalsy()
      })
      expect(jaccordion._eventBinders).toHaveLength(0)
    })

    test('should be able to mount after unmount', () => {
      const jaccordion = new Jaccordion(root)
      jaccordion.mount()
      jaccordion.unmount()
      jaccordion.mount()

      expect(jaccordion.enabled).toBeTruthy()
      expect(jaccordion.root.classList.contains(classes.root)).toBeTruthy()
      expect(jaccordion.items).toHaveLength(markupEntries.length)
      jaccordion.items.forEach(({id, header, content}, index) => {
        const entry = markupEntries[index]
        expect(id).toBeDefined()
        expect(header).toBeDefined()
        expect(content).toBeDefined()
        expect(id).toBe(entry.id)
        expect(parseInt(header.dataset.id)).toBe(entry.id)
        expect(header.classList.contains(classes.header)).toBeTruthy()
        expect(content.classList.contains(classes.content)).toBeTruthy()
        expect(header.textContent).toBe(`${entry.header}`)
        expect(content.textContent).toBe(`${entry.content}`)
      })
    })
  })

  describe('openAt option', () => {
    let markupIds
    let markupEntries

    beforeEach(() => {
      markupIds = [0, 1, 2]
      markupEntries = markupIds.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      const sections = markupEntries.reduce((sections, entry) => {
        return (
          sections +
          `<dt>${entry.header}</dt>
            <dd>${entry.content}</dd>`
        )
      }, '')
      root.innerHTML = sections
    })

    test('should mount with openAt option correctly', () => {
      const options = {openAt: 1}
      const jaccordion = new Jaccordion(root, options)
      jaccordion.mount()
      const items = jaccordion.items

      expect(items[0].header.classList.contains(classes.opened)).toBeFalsy()
      expect(items[1].header.classList.contains(classes.opened)).toBeTruthy()
      expect(items[2].header.classList.contains(classes.opened)).toBeFalsy()
    })
  })
})
