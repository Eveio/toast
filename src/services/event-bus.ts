import Vue from 'vue'

import { EventName } from '@/types'

export class EventBus {
  bus: Vue

  constructor () {
    this.bus = new Vue()
  }

  emit (eventName: EventName, ...eventParameters: any): void {
    this.bus.$emit(eventName, ...eventParameters)
  }

  on (eventName: EventName, eventHandler: Function): void {
    this.bus.$on(eventName, eventHandler)
  }

  once (eventName: EventName, eventHandler: Function): void {
    this.bus.$once(eventName, eventHandler)
  }
}

export default new EventBus()
