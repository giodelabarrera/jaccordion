import {isTagName, removeChildren} from '../../src/utils/dom'

describe('dom', () => {
  describe('isTagName', () => {
    describe('with tag name parameter', () => {
      test('should return an instance of Function', () => {
        const isDLTagName = isTagName('dl')
        expect(isDLTagName).toBeDefined()
        expect(isDLTagName).toBeInstanceOf(Function)
      })
    })

    describe('with tag name and element parameters', () => {
      test('should not have the same tag name', () => {
        const isULTagName = isTagName('ul')
        const dlElem = document.createElement('dl')
        expect(isULTagName(dlElem)).toBeFalsy()
      })

      test('should have the same tag name', () => {
        const isDLTagName = isTagName('dl')
        const dlElem = document.createElement('dl')
        expect(isDLTagName(dlElem)).toBeTruthy()
      })
    })
  })

  describe('removeChildren', () => {
    test('should remove correctly the children', () => {
      const dlElem = document.createElement('dl')
      dlElem.innerHTML = `
        <dt>Header 1</dt>
        <dd>Content 1</dd>
        <dt>Header 2</dt>
        <dd>Content 2</dd>
      `
      expect(dlElem.children).toHaveLength(4)
      removeChildren(dlElem)
      expect(dlElem.children).toHaveLength(0)
    })
  })
})
