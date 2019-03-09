import fetchMock from 'fetch-mock'
import defaults from '../src/defaults'
import Jaccordion from '../src'
import EventBus from '../src/event/event-bus'

describe('jaccordion', () => {
  describe('entries', () => {
    let element
    let url
    let processResults

    beforeEach(() => {
      element = document.createElement('dl')
      url = 'http://example.com'
      processResults = data => data
    })

    test('should fail on trying to pass a undefined element', () => {
      expect(() => new Jaccordion()).toThrowError('element is required')
    })

    test('should fail on trying to pass incorrect type in element', () => {
      element = '.accordion'
      expect(() => new Jaccordion(element)).toThrowError(
        'element must be a HTMLDListElement'
      )
    })

    test('should fail on trying to pass a undefined in property url of ajax', () => {
      const ajax = {processResults}
      expect(() => new Jaccordion(element, {ajax})).toThrowError(
        'url is required'
      )
    })

    test('should fail on trying to pass a undefined in property processResults of ajax', () => {
      const ajax = {url}
      expect(() => new Jaccordion(element, {ajax})).toThrowError(
        'processResults is required'
      )
    })

    test('should fail on trying to pass incorrect type in url of ajax', () => {
      url = 123
      const ajax = {url, processResults}
      expect(() => new Jaccordion(element, {ajax})).toThrowError(
        'url must be a string'
      )
    })

    test('should fail on trying to pass incorrect type in processResults of ajax', () => {
      processResults = 123
      const ajax = {url, processResults}
      expect(() => new Jaccordion(element, {ajax})).toThrowError(
        'processResults must be a function'
      )
    })

    test('should fail on trying to pass incorrect entries with repeated id in options', () => {
      const ids = [0, 1, 1, 2]
      const entries = ids.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      expect(() => new Jaccordion(element, {entries})).toThrowError(
        `entries with id [1] already exist in entries`
      )
    })
  })

  describe('initial', () => {
    let root
    let jaccordion

    beforeEach(() => {
      root = document.createElement('dl')
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
    describe('markup without sections when you start', () => {
      let root
      let classes
      let entries
      let items
      let url
      let processResults
      let posts
      let postItems

      beforeEach(() => {
        classes = defaults.classes

        const ids = [0, 1, 2]

        entries = ids.map(id => ({
          id,
          header: `Header ${id}`,
          content: `Description ${id}`
        }))

        root = document.createElement('dl')
        root.classList.add(classes.root)

        const {openAt} = defaults
        items = entries.map(entry => {
          const {id} = entry

          const header = document.createElement('dt')
          header.textContent = entry.header
          header.classList.add(classes.header)
          if (openAt === id) header.classList.add(classes.opened)

          const content = document.createElement('dd')
          content.classList.add(classes.content)
          content.textContent = entry.content

          return {id, header, content}
        })

        url = 'http://example.com'
        processResults = data => data

        posts = [
          {
            id: 11,
            header: 'Post 11',
            content: 'Lorem ipsum'
          },
          {
            id: 12,
            header: 'Post 12',
            content: 'Lorem ipsum'
          },
          {
            id: 13,
            header: 'Post 13',
            content: 'Lorem ipsum'
          }
        ]
        postItems = posts.map(post => {
          const {id} = post

          const header = document.createElement('dt')
          header.textContent = post.header
          header.classList.add(classes.header)
          if (openAt === id) header.classList.add(classes.opened)

          const content = document.createElement('dd')
          content.classList.add(classes.content)
          content.textContent = post.content

          return {id, header, content}
        })
        fetchMock.get('*', posts)
      })

      afterEach(() => {
        // Unmock
        fetchMock.reset()
      })

      test('should mount correctly with empty items', () => {
        const jaccordion = new Jaccordion(root).mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root).toEqual(root)
        expect(jaccordion.items).toEqual([])
      })

      test('should mount correctly with property entries in options', () => {
        const options = {entries}
        const jaccordion = new Jaccordion(root, options).mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root).toEqual(root)
        expect(jaccordion.items).toEqual(items)
        jaccordion.items.forEach((currentItem, currentIndex) => {
          const item = items[currentIndex]
          expect(item.id).toBeDefined()
          expect(item.header).toBeDefined()
          expect(item.content).toBeDefined()
          expect(item.id).toBe(currentItem.id)
          expect(item.header.textContent).toBe(currentItem.header.textContent)
          expect(item.content.textContent).toBe(currentItem.content.textContent)
        })
      })

      test('should mount correctly with property entries in options', () => {
        const options = {entries}
        const jaccordion = new Jaccordion(root, options).mount()

        expect(jaccordion.enabled).toBeTruthy()
        expect(jaccordion.root).toEqual(root)
        expect(jaccordion.items).toEqual(items)
        jaccordion.items.forEach((currentItem, currentIndex) => {
          const item = items[currentIndex]
          expect(item.id).toBeDefined()
          expect(item.header).toBeDefined()
          expect(item.content).toBeDefined()
          expect(item.id).toBe(currentItem.id)
          expect(item.header.textContent).toBe(currentItem.header.textContent)
          expect(item.content.textContent).toBe(currentItem.content.textContent)
        })
      })

      test('should mount correctly with property ajax in options', done => {
        const options = {ajax: {url, processResults}}
        const jaccordion = new Jaccordion(root, options)
        jaccordion.on('mountAjax.after', () => {
          jaccordion.items.forEach((currentItem, currentIndex) => {
            const postItem = postItems[currentIndex]
            expect(postItem.id).toBeDefined()
            expect(postItem.header).toBeDefined()
            expect(postItem.content).toBeDefined()
            expect(postItem.id).toBe(currentItem.id)
            expect(postItem.header.textContent).toBe(
              currentItem.header.textContent
            )
            expect(postItem.content.textContent).toBe(
              currentItem.content.textContent
            )
          })
          done()
        })
        jaccordion.mount()
      })

      // test('should mount correctly with property ajax in options when your entries have repeated id', done => {
      //   fetchMock.reset()
      //   posts = [
      //     ...posts,
      //     {id: 11, header: 'Header 11', content: 'Description 11'}
      //   ]
      //   fetchMock.get('*', posts)

      //   const options = {ajax: {url, processResults}}
      //   const jaccordion = new Jaccordion(root, options)
      // })
    })

    describe('markup with sections when you start', () => {})
  })
})

// construct
// comprobar entrada element requerida
// comprobar tipo element
// comprobar tipos para options
// comprobar entries con id repetidos

// initial
// comprobar propiedades de inicializacion

// mount
// marcado sin secciones
// comprobar mount
// comprobar mount con entries
// comprobar mount con ajax
// comprobar mount con ajax donde sus id de entries estan repetidos
// comprobar mount con entries y con ajax
// comprobar mount con ajax donde sus id de entries ya esta en items
// marcado con secciones
// comprobar mount
// comprobar mount con entries
// comprobar mount con entries repetidos
// comprobar mount con entries donde sus id ya esta en items
// comprobar mount con ajax
// comprobar mount con ajax donde sus id de entries estan repetidos
// comprobar mount con entries y con ajax
// comprobar mount con ajax donde sus id de entries ya esta en items
// comprobar evento mount.before
// comprobar evento mount.after
// comprobar evento mountAjax.before
// comprobar evento mountAjax.after

// disable
// comprobar disable correcto

// enable
// comprobar disable correcto

// toggle
// comprobar id debe de ser requerido
// comprobar id debe de ser numerico
// comprobar toggle con acordion desabilitado
// comprobar toggle con acordion habilitado
// comprobar toggle para abrir
// comprobar toggle para cerrar

// isOpen
// comprobar id debe de ser requerido
// comprobar id debe de ser numerico

// open
// comprobar id debe de ser requerido
// comprobar id debe de ser numerico
// comprobar evento open.before
// comprobar evento open.after

// close
// comprobar id debe de ser requerido
// comprobar id debe de ser numerico
// comprobar evento close.before
// comprobar evento close.after

// append
// comprobar item debe de ser requerido
// comprobar item tipo
// comprobar evento append

// prepend
// comprobar item debe de ser requerido
// comprobar item tipo
// comprobar evento append

// appendBefore
// comprobar item debe de ser requerido
// comprobar item tipo
// comprobar evento appendBefore

// appendAfter
// comprobar item debe de ser requerido
// comprobar item tipo
// comprobar evento appendAfter

// remove
// comprobar item debe de ser requerido
// comprobar item tipo
// comprobar evento remove.before
// comprobar evento remove.after

// on
// comprobar parametros

// destroy
// comprobar destroy correcto

// _bind
// comprobar _bind correcto

// _unbind
// comprobar _unbind correcto

// opciones
// comprobar acordion con openAt por defecto a 0
// comprobar acordion con openAt modificado
// comprobar acordion multiple false por defecto
// comprobar acordion multiple true
// comprobar acordion con clases por defecto
// comprobar acordion con clase root modificado
// comprobar acordion con clase header modificado
// comprobar acordion con clase opened modificado
// comprobar acordion con clase content modificado
