import eventBus from '@/services/event-bus'
import { EventName } from '@/types'

describe('Event bus service', () => {
  it('should emit event', () => {
    eventBus.bus.$emit = jest.fn()

    const eventName: EventName = 'TOAST:QUEUE'
    const argument = 'my-random-argument'
    eventBus.emit(eventName, argument)
    expect(eventBus.bus.$emit).toHaveBeenCalledWith(eventName, argument)
  })

  it('should handle event', () => {
    eventBus.bus.$on = jest.fn()

    const eventName: EventName = 'TOAST:QUEUE'
    const handler = (): null => null
    eventBus.on(eventName, handler)
    expect(eventBus.bus.$on).toHaveBeenCalledWith(eventName, handler)
  })
})
