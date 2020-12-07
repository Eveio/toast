<template>
  <div class="eve-toast-queue">
    <div class="bottom-left">
      <Toast v-for="toast in toastsSortedByPosition[EveToastPosition.BottomLeft]" :key="toast.id" :toast="toast" @close="closeToast" />
    </div>
    <div class="bottom-center">
      <Toast v-for="toast in toastsSortedByPosition[EveToastPosition.BottomCenter]" :key="toast.id" :toast="toast" @close="closeToast" />
    </div>
    <div class="bottom-right">
      <Toast v-for="toast in toastsSortedByPosition[EveToastPosition.BottomRight]" :key="toast.id" :toast="toast" @close="closeToast" />
    </div>
    <div class="top-left">
      <Toast v-for="toast in toastsSortedByPosition[EveToastPosition.TopLeft]" :key="toast.id" :toast="toast" @close="closeToast" />
    </div>
    <div class="top-center">
      <Toast v-for="toast in toastsSortedByPosition[EveToastPosition.TopCenter]" :key="toast.id" :toast="toast" @close="closeToast" />
    </div>
    <div class="top-right">
      <Toast v-for="toast in toastsSortedByPosition[EveToastPosition.TopRight]" :key="toast.id" :toast="toast" @close="closeToast" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Toast from '@/Toast.vue'
import { EveToast, EveToastPosition } from '@/types'
import toastQueue from '@/services/toast-queue'
import { handleQueueToast } from '@/helper'

type ToastsSortedByPosition = {
  [p in EveToastPosition]: EveToast[]
}

export default Vue.extend({
  data: () => ({
    queue: toastQueue.queue
  }),

  components: {
    Toast
  },

  computed: {
    EveToastPosition (): typeof EveToastPosition {
      return EveToastPosition
    },

    toastsSortedByPosition (): ToastsSortedByPosition {
      const toasts: ToastsSortedByPosition = {
        [EveToastPosition.TopLeft]: [],
        [EveToastPosition.TopCenter]: [],
        [EveToastPosition.TopRight]: [],
        [EveToastPosition.BottomLeft]: [],
        [EveToastPosition.BottomCenter]: [],
        [EveToastPosition.BottomRight]: []
      }
      this.queue.forEach((toast: EveToast) => {
        toasts[toast.position || EveToastPosition.TopRight].push(toast)
      })
      return toasts
    }
  },

  methods: {
    queueToast (options: EveToast): void {
      const toastQueued = toastQueue.queueToast(options)
      if (toastQueued.onOpen) {
        toastQueued.onOpen(toastQueued)
      }
    },

    closeToast (toast: EveToast): void {
      toastQueue.removeToast(toast)
      if (toast.onClose) {
        toast.onClose(toast)
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
  @mixin list {
    box-sizing: border-box;
    display: flex;
    position: fixed;
    padding: 2em;
    width: 100vw;
    left: 0;
    z-index: 9999;
    pointer-events: none;
  }

  > div[class^="top"] {
    @include list;
    flex-direction: column-reverse;
    top: 0;
  }

  > div[class^="bottom"] {
    @include list;
    flex-direction: column;
    bottom: 0;
  }

  > div[class$="left"] {
    .eve-toast {
      align-self: flex-start;
    }
  }

  > div[class$="center"] {
    .eve-toast {
      align-self: center;
    }
  }

  > div[class$="right"] {
    .eve-toast {
      align-self: flex-end;
    }
  }
}
</style>
