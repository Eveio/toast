import { VueConstructor } from 'vue'

declare module 'eve-toast' {
  const EveToastQueue: VueConstructor

  enum EveToastPosition {
    TopLeft = 'TOP_LEFT',
    TopCenter = 'TOP_CENTER',
    TopRight = 'TOP_RIGHT',
    BottomLeft = 'BOTTOM_LEFT',
    BottomCenter = 'BOTTOM_CENTER',
    BottomRight = 'BOTTOM_RIGHT',
  }

  interface EveToast {
    id?: string
    title?: string
    description?: string
    type: 'error' | 'warning' | 'success'
    position?: EveToastPosition
    duration?: number
    onOpen?: (toast: EveToast) => void
    onClose?: (toast: EveToast) => void
  }

  function queueToast (toast: EveToast): void
}
