<template>
  <div class="eve-toast-queue">
    <div
      v-for="(toast, toastIndex) in queue"
      :key="`${toast.id}-${toastIndex}`"
      :data-id="toast.id"
      class="eve-toast"
      :class="toast.position"
    >
      <i class="type-indicator" :class="toast.type">
        <svg v-if="toast.type !== 'success'" width="4" height="20" viewBox="0 0 4 20" fill="none">
          <path d="M2 2V12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 18H2.01" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.8913 5.97803L8.9511 16.9182L3.97827 11.9454" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </i>
      <div class="content">
        <div class="title" v-if="toast.title">{{ toast.title }}</div>
        <div v-if="toast.description" class="description">{{ toast.description }}</div>
      </div>
      <i class="close-icon" @click="closeToast(toast)">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M11.25 3.75L3.75 11.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.75 3.75L11.25 11.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { EveToast } from '@/types'
import toastQueue from '@/services/toast-queue'
import { handleQueueToast } from '@/helper'

export default Vue.extend({
  data: () => ({
    queue: toastQueue.queue
  }),

  methods: {
    queueToast (options: EveToast) {
      return toastQueue.queueToast(options)
    },

    closeToast (toast: EveToast) {
      toastQueue.removeToast(toast)
      if (toast?.onClose) {
        toast.onClose()
      }
    }
  },

  created () {
    handleQueueToast(this.queueToast)
  }
})
</script>

<style lang="scss" scoped>
.eve-toast-queue {
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  flex-direction: column-reverse;
  position: fixed;
  padding: 32px;
  width: 100%;
  top: 0;
  z-index: 9999;
  pointer-events: none;

  .eve-toast {
    pointer-events: auto;
    display: inline-flex;
    min-width: 300px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    font-family: inherit;
    text-align: left;
    overflow: hidden;
    margin: 6px;

    &.center {
      align-self: center;
    }

    .type-indicator {
      width: 30px;
      border-radius: 0 20% 20% 0 / 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      &.success {
        background: #17bf63;
      }

      &.error {
        background: #e0245e;
      }

      &.warning {
        background: #ffad1f;
      }
    }

    .content {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 16px;

      .title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        line-height: 1.8;
      }

      .description {
        font-size: 12px;
        font-weight: 400;
        color: #666;
        line-height: 1.5;
      }
    }

    .close-icon {
      padding: 10px;
      height: fit-content;
      cursor: pointer;
      stroke: #bab9bb;

      transition: stroke 0.2s;

      &:hover {
        stroke: #8c8b8d;
      }
    }
  }
}
</style>
