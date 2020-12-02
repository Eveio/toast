import { mount } from '@vue/test-utils'
import EveToastQueue from '@/EveToastQueue.vue'

import { queueToast } from '@/helper'

import { EveToast } from '@/types'

describe('EveToastQueue', () => {
  const wrapper = mount(EveToastQueue)
  const newToast: EveToast = {
    type: 'success',
    title: 'Please render me!'
  }

  it('should render a newly added toast', async () => {
    // empty toast queue before
    expect(wrapper.findAll('div.eve-toast').exists()).toBe(false)

    queueToast(newToast)
    await wrapper.vm.$nextTick()

    const lastToastWrapper = wrapper.findAll('div.eve-toast').at(-1)
    // now the new toast renders
    expect(lastToastWrapper.find('div.title').text()).toBe(newToast.title)
  })

  it('should be able to close a toast', async () => {
    const lastToastWrapper = wrapper.findAll('div.eve-toast').at(-1)
    expect(lastToastWrapper.exists()).toBe(true)

    const lastToastId = lastToastWrapper.element.dataset.id

    const lastToastClickBtnWrapper = lastToastWrapper.find('i.close-icon')
    await lastToastClickBtnWrapper.trigger('click')

    setTimeout(() => {
      expect(wrapper.findAll(`div[data-id="${lastToastId}"]`).exists()).toBe(
        false
      )
    }, 0)
  })
})
