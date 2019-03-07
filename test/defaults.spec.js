import defaults from '../src/defaults'

describe('defaults', () => {
  let options
  beforeEach(() => {
    options = {
      openAt: 0,
      multiple: false,
      entries: [],
      ajax: {
        url: '',
        processResults(data) {
          return data
        }
      },
      classes: {
        root: 'jaccordion',
        header: 'jaccordion__header',
        opened: 'jaccordion__header--opened',
        content: 'jaccordion__content'
      }
    }
  })
  test('should be the default configuration', () => {
    const {openAt, multiple, entries, ajax, classes} = defaults

    expect(options.openAt).toBe(openAt)
    expect(options.multiple).toBe(multiple)
    expect(options.entries).toEqual(entries)
    expect(options.ajax.url).toBe(ajax.url)
    const data = {results: [{id: 0, title: 'post1'}, {id: 1, title: 'post2'}]}
    expect(ajax.processResults(data)).toEqual(data)
    expect(options.classes).toEqual(classes)
  })
})
