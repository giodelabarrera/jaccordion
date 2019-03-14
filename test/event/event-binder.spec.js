import EventBinder from '../../src/event/event-binder'

describe('event binder', () => {
  let eventBinder
  let event
  let element
  let addEventListenerMock
  let removeEventListenerMock
  let handler

  beforeEach(() => {
    eventBinder = new EventBinder()
    event = 'click'
    element = document.createElement('dt')
    addEventListenerMock = jest.fn((event, handler) => undefined)
    removeEventListenerMock = jest.fn((event, handler) => undefined)
    handler = jest.fn(() => {})
  })

  test('should be an instance of EventBinder', () => {
    expect(eventBinder).toBeInstanceOf(EventBinder)
  })

  test('should property listeners be of type object', () => {
    expect(eventBinder.listeners).toBeDefined()
    expect(typeof eventBinder.listeners).toBe('object')
  })

  test('should property listeners have the same value', () => {
    expect(eventBinder.listeners).toEqual({})
  })

  test('should on method add event correctly', () => {
    element.addEventListener = addEventListenerMock
    eventBinder.on(event, element, handler)
    const listeners = {click: handler}

    expect(Object.keys(eventBinder.listeners)).toEqual(['click'])
    expect(eventBinder.listeners).toEqual(listeners)
    expect(addEventListenerMock.mock.calls.length).toBe(1)
    expect(addEventListenerMock.mock.calls[0][0]).toBe(event)
    expect(addEventListenerMock.mock.calls[0][1]).toEqual(handler)
  })

  test('should off method add event correctly', () => {
    eventBinder.on(event, element, handler)
    element.removeEventListener = removeEventListenerMock
    eventBinder.off(event, element)

    expect(Object.keys(eventBinder.listeners)).toEqual([])
    expect(eventBinder.listeners).toEqual({})
    expect(removeEventListenerMock.mock.calls.length).toBe(1)
    expect(removeEventListenerMock.mock.calls[0][0]).toBe(event)
    expect(removeEventListenerMock.mock.calls[0][1]).toEqual(handler)
  })
})
