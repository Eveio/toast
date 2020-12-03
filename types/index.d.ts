import { VueConstructor } from 'vue'

declare module 'eve-toast' {
  const EveToastQueue: VueConstructor

  interface EveToast {
    id?: string
    title?: string
    description?: string
    type: 'error' | 'warning' | 'success'
    position?: 'right' | 'center'
    duration?: number
    onClose?: () => void
    onComplete?: () => void
  }

  function queueToast (toast: EveToast): void
}
