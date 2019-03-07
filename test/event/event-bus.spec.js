import EventBus from '../../src/event/event-bus'

describe('event bus', () => {
  let eventBus
  let event
  let handler

  beforeEach(() => {
    eventBus = new EventBus()
    event = 'mount.after'
    handler = jest.fn(() => {})
  })

  test('should be an instance of EventBus', () => {
    expect(eventBus).toBeInstanceOf(EventBus)
  })

  test('should property events be of type object', () => {
    expect(eventBus.events).toBeDefined()
    expect(typeof eventBus.events).toBe('object')
  })

  test('should property events have the same value', () => {
    expect(eventBus.events).toEqual({})
  })

  test('should on method save events correctly', () => {
    const action = eventBus.on(event, handler)
    const events = {[event]: [handler]}
    expect(Object.keys(eventBus.events)).toEqual([event])
    expect(eventBus.events).toEqual(events)

    action.remove()
    expect(Object.keys(eventBus.events)).toEqual([event])
    expect(eventBus.events).toEqual({[event]: []})
  })

  test('should on method save events with more than one handler correctly', () => {
    eventBus.on(event, handler)
    const secondHandler = jest.fn(() => {})
    eventBus.on(event, secondHandler)

    const events = {[event]: [handler, secondHandler]}
    expect(Object.keys(eventBus.events)).toEqual([event])
    expect(eventBus.events).toEqual(events)
  })

  test('should emit correctly without context', () => {
    eventBus.on(event, handler)
    eventBus.emit(event)

    expect(handler.mock.calls.length).toBe(1)
    expect(handler.mock.calls[0][0]).toEqual({})
  })

  test('should emit correctly with context', () => {
    eventBus.on(event, handler)

    const context = {mounted: true}
    eventBus.emit(event, context)

    expect(handler.mock.calls.length).toBe(1)
    expect(handler.mock.calls[0][0]).toEqual(context)
  })

  test('should no emit when event does not exist', () => {
    eventBus.on(event, handler)

    event = 'super-mount'
    eventBus.emit(event)

    expect(handler).not.toHaveBeenCalled()
  })
})
