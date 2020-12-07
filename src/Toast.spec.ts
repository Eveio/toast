import { mount } from '@vue/test-utils'
import Toast from '@/Toast.vue'

describe('Toast', () => {
  it('should emit `close` when clicking on close button', async () => {
    const sampleToast = {
      id: 'sample-toast',
      type: 'success',
      title: 'Sample toast!'
    }
    const wrapper = mount(Toast, {
      propsData: {
        toast: sampleToast
      }
    })
    await wrapper.find('[data-testid="close-button"]').trigger('click')
    expect(wrapper.emitted().close?.[0]).toEqual([sampleToast])
  })
})
