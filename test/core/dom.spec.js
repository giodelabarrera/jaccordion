import {getElementBySelector} from '../../src/core/dom'

describe('dom', () => {
  describe('getElementBySelector', () => {
    describe('entries', () => {
      test('should fail on trying to pass a undefined selector', () => {
        expect(() => {
          getElementBySelector()
        }).toThrowError('selector is required')
      })

      test('should fail on trying to pass a HTMLElement in selector', () => {
        const selector = document.createElement('dl')
        expect(() => {
          getElementBySelector(selector)
        }).toThrowError('selector must be of type string')
      })

      test('should fail on trying to pass a array in selector', () => {
        const selector = ['dl']
        expect(() => {
          getElementBySelector(selector)
        }).toThrowError('selector must be of type string')
      })

      test('should fail on trying to pass a object in selector', () => {
        const selector = {selector: 'dl'}
        expect(() => {
          getElementBySelector(selector)
        }).toThrowError('selector must be of type string')
      })
    })

    describe('functionality', () => {
      beforeEach(() => {
        const template = `
          <dl class="first">
            <dt>Header 1</dt>
            <dd>Content 1</dd>
          </dl>
          <dl class="second">
            <dt>Header 1</dt>
            <dd>Content 1</dd>
          </dl>
        `
        document.body.innerHTML = template
      })

      afterEach(() => {
        while (document.body.firstChild) {
          document.body.removeChild(document.body.firstChild)
        }
      })

      test('should return null when the element was not found', () => {
        const selector = 'dl.accordion'
        expect(getElementBySelector(selector)).toBeNull()
      })

      test('should return the first element when there is more than one', () => {
        const selector = 'dl'
        const element = getElementBySelector(selector)

        expect(element).toBeDefined()
        expect(element).toBeInstanceOf(HTMLDListElement)
        expect(element.classList.contains('first')).toBeTruthy()
      })

      test('should correctly return the element', () => {
        const selector = 'dl.first'
        const element = getElementBySelector(selector)

        expect(element).toBeDefined()
        expect(element).toBeInstanceOf(HTMLDListElement)
        expect(element.classList.contains('first')).toBeTruthy()
      })
    })
  })
})
