export interface EveToast {
  id?: string
  title?: string
  description?: string
  type: 'error' | 'warning' | 'success'
  position?: 'right' | 'center'
  duration?: number
  onClose?: () => void
  onComplete?: () => void
}

export type EventName = 'TOAST:QUEUE'
