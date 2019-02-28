/* eslint-disable no-console */
import {warning} from '../../src/utils/log'

describe('log', () => {
  describe('warning', () => {
    let preSpy

    beforeEach(() => {
      preSpy = console.error
    })

    it('should have the same message', () => {
      const spy = jest.fn()
      console.error = spy
      try {
        warning('Jaccordion warn')
        expect(spy.mock.calls[0][0]).toBe('Jaccordion warn')
      } finally {
        spy.mockClear()
      }
    })

    afterEach(() => {
      console.error = preSpy
    })
  })
})
