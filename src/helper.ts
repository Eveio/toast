import eventBus from '@/services/event-bus'
import { EveToast } from "@/types"

export const queueToast = (toast: EveToast): void => eventBus.emit('TOAST:QUEUE', toast)

export const handleQueueToast = (handler: (toast: EveToast) => any): void => eventBus.on('TOAST:QUEUE', handler)
