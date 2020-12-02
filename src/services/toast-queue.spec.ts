import toastQueue from '@/services/toast-queue'
import { EveToast } from '@/types'

describe('Toast Queue service', () => {
  const simpleToast: EveToast = {
    id: 'my-simple-toast',
    type: 'success',
    title: 'Queue me!'
  }

  const toastWithDuration: EveToast = {
    id: 'my-toast-with-duration',
    type: 'warning',
    title: 'Remove me after duration!',
    duration: 3000
  }

  it('should queue toast', () => {
    toastQueue.queueToast(simpleToast)
    expect(
      toastQueue.queue.findIndex(({ id }) => id === simpleToast.id)
    ).toBeGreaterThan(-1)
  })

  it('should remove toast', () => {
    toastQueue.removeToast(simpleToast)
    expect(toastQueue.queue.findIndex(({ id }) => id === simpleToast.id)).toBe(
      -1
    )
  })

  it('should remove toast after duration automatically if a `duration` is specified when queuing', () => {
    toastQueue.removeToast(toastWithDuration)
    setTimeout(() => {
      expect(
        toastQueue.queue.findIndex(({ id }) => id === toastWithDuration.id)
      ).toBe(-1)
    }, toastWithDuration.duration)
  })
})
