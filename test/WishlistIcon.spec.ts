import { shallowMount } from '@vue/test-utils';
import WishlistIcon from '@/components/WhilstIcon.vue';
import expect from 'expect';

describe('Wishlist Icon', () => {
  it('Wishlist Icon rendered correctly with default color', () => {
    const wrapper = shallowMount(WishlistIcon);
    const defaultColor = '#444A5930';

    expect(wrapper.find('polygon').attributes('fill')).toEqual(defaultColor);
  });

  it('Wishlist Icon rendered correctly with active color', () => {
    const wrapper = shallowMount(WishlistIcon, {
      propsData: {
        isActive: true,
      }
    });

    const activeColor = '#fa0';
    expect(wrapper.find('polygon').attributes('fill')).toEqual(activeColor);
  })
})
