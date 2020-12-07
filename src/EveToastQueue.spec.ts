import { mount, createLocalVue } from '@vue/test-utils'
import EveToastQueue from '@/EveToastQueue.vue'
import Toast from '@/Toast.vue'

import { queueToast } from '@/helper'

import { EveToast } from '@/types'

describe('EveToastQueue', () => {
  it('should render newly added toasts', async () => {
    const wrapper = mount(EveToastQueue, {
      localVue: createLocalVue()
    })
    expect(wrapper.findComponent(Toast).exists()).toBe(false)

    const onOpenMock = jest.fn()
    const newToast: EveToast = {
      id: 'new-toast',
      type: 'success',
      title: 'Please render me!',
      onOpen: onOpenMock
    }
    queueToast(newToast)
    await wrapper.vm.$nextTick()

    expect(onOpenMock).toHaveBeenCalled()
    const lastToastWrapper = wrapper.findAllComponents(Toast).at(-1)
    expect(lastToastWrapper.props().toast).toEqual(newToast)
  })

  it('should be able to close a toast', async () => {
    const wrapper = mount(EveToastQueue, {
      localVue: createLocalVue()
    })
    const onCloseMock = jest.fn()
    const newToast: EveToast = {
      id: 'new toast',
      type: 'success',
      title: 'Please close me!',
      onClose: onCloseMock
    }
    queueToast(newToast)
    await wrapper.vm.$nextTick()
    const lastToastWrapper = wrapper.findAllComponents(Toast).at(-1)
    await lastToastWrapper.vm.$emit('close', newToast)

    expect(lastToastWrapper.exists()).toBe(false)
    expect(onCloseMock).toHaveBeenCalled()
  })
})
