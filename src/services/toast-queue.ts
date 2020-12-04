import { EveToast } from '@/types'

class ToastQueue {
  queue: EveToast[]

  constructor () {
    this.queue = []
  }

  queueToast (options: EveToast): EveToast {
    const toast = {
      id: String(Date.now()),
      ...options
    }
    this.queue.push(toast)

    if (toast.duration) {
      this.removeToastAfterDuration(toast)
    }

    return toast
  }

  removeToast (toast: EveToast): EveToast | null {
    const index = this.queue.findIndex(({ id }) => toast.id === id)

    return index > -1 ? this.queue.splice(index, 1)[0] : null
  }

  removeToastAfterDuration (toast: EveToast): void {
    setTimeout(() => {
      const toastRemoved = this.removeToast(toast)
      if (toastRemoved?.onClose) {
        toastRemoved.onClose(toast)
      }
    }, toast.duration)
  }
}

export default new ToastQueue()
