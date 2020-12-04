import { mount } from '@vue/test-utils'
import EveToastQueue from '@/EveToastQueue.vue'

import { queueToast } from '@/helper'

import { EveToast } from '@/types'

describe('EveToastQueue', () => {
  it('should render a newly added toast', async () => {
    const wrapper = mount(EveToastQueue)
    expect(wrapper.findAll('div.eve-toast').exists()).toBe(false)

    const onOpenMock = jest.fn()
    const newToast: EveToast = {
      type: 'success',
      title: 'Please render me!',
      onOpen: onOpenMock
    }
    queueToast(newToast)
    await wrapper.vm.$nextTick()

    expect(onOpenMock).toHaveBeenCalled()
    const lastToastWrapper = wrapper.findAll('div.eve-toast').at(-1)
    expect(lastToastWrapper.find('div.title').text()).toBe(newToast.title)
  })

  it('should be able to close a toast', async () => {
    const wrapper = mount(EveToastQueue)
    const onCloseMock = jest.fn()
    const newToast: EveToast = {
      type: 'success',
      title: 'Please close me!',
      onClose: onCloseMock
    }
    queueToast(newToast)
    await wrapper.vm.$nextTick()
    const lastToastWrapper = wrapper.findAll('div.eve-toast').at(-1)
    const lastToastId = lastToastWrapper.element.dataset.id
    const lastToastClickBtnWrapper = lastToastWrapper.find('i.close-icon')
    await lastToastClickBtnWrapper.trigger('click')

    expect(wrapper.findAll(`div[data-id="${lastToastId}"]`).exists()).toBe(false)
    expect(onCloseMock).toHaveBeenCalled()
  })
})
