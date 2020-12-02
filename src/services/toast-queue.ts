import { EveToast } from '@/types'

class ToastQueue {
  queue: EveToast[]

  constructor () {
    this.queue = []
  }

  queueToast (options: EveToast): void {
    const toast = {
      id: String(Date.now()),
      ...options
    }
    this.queue.push(toast)

    if (toast.duration) {
      this.removeToastAfterDuration(toast)
    }
  }

  removeToast (toast: EveToast): void {
    const index = this.queue.findIndex(({ id }) => toast.id === id)

    if (index > -1) {
      this.queue.splice(index, 1)
    }
  }

  removeToastAfterDuration (toast: EveToast): void {
    setTimeout(() => {
      this.removeToast(toast)

      if (toast?.onComplete) {
        toast.onComplete()
      } else if (toast?.onClose) {
        toast.onClose()
      }
    }, toast.duration)
  }
}

export default new ToastQueue()
