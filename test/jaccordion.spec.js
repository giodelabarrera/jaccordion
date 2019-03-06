import Jaccordion from '../src'

describe('jaccordion', () => {
  let element
  let options

  beforeEach(() => {
    element = document.createElement('dl')
  })

  describe('entries', () => {
    test('should fail on trying to pass a undefined element', () => {
      expect(() => new Jaccordion()).toThrowError('element is required')
    })

    test('should fail on trying to pass incorrect type in property id of item', () => {
      element = '.accordion'
      expect(() => new Jaccordion(element)).toThrowError(
        'element must be a HTMLDListElement'
      )
    })

    test('should fail on trying to pass incorrect type in property openAt of options', () => {
      options = {openAt: '123'}
      expect(() => new Jaccordion(element, options)).toThrowError(
        'openAt must be a number'
      )
    })

    test('should fail on trying to pass incorrect type in property multiple of options', () => {
      options = {multiple: 1}
      expect(() => new Jaccordion(element, options)).toThrowError(
        'multiple must be a boolean'
      )
    })

    test('should fail on trying to pass incorrect type in property entries of options', () => {
      options = {entries: {id: 0, header: 'Header', content: 'Description'}}
      expect(() => new Jaccordion(element, options)).toThrowError(
        'entries must be a array'
      )
    })

    test('should fail on trying to pass a undefined url in ajax of options', () => {
      options = {ajax: {processResults: data => data}}
      expect(() => new Jaccordion(element, options)).toThrowError(
        'url is required'
      )
    })

    test('should fail on trying to pass a undefined processResults in ajax of options', () => {
      options = {ajax: {url: 'http://example.com'}}
      expect(() => new Jaccordion(element, options)).toThrowError(
        'processResults is required'
      )
    })
  })

  describe('initial', () => {})
})
