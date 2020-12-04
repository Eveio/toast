export interface EveToast {
  id?: string
  title?: string
  description?: string
  type: 'error' | 'warning' | 'success'
  position?: 'right' | 'center'
  duration?: number
  onOpen?: (toast: EveToast) => void
  onClose?: (toast: EveToast) => void
}

export type EventName = 'TOAST:QUEUE'
