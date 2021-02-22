import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MiniBag from '@/components/MiniBag.vue';
import Buefy from 'buefy';
import { TBagItem } from '~/store';
import expect from 'expect';

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Buefy)

describe('Card Component', () => {
  let store: any;

  beforeEach(() => {
    const state: {
      bag: Array<TBagItem>;
      cartPrice: number;
    } = {
      bag: [
        {
          img: 'IMAGE_URL',
          title: 'product_title',
          price: 23,
          count: 1,
          uuid: 'UUID'
        }
      ],
      cartPrice: 23,
    }

    store = new Vuex.Store({
      state
    });
  });

  it('mini bag renders exactly', () => {
    const wrapper = shallowMount(MiniBag, {
      store, localVue
    });

    expect(wrapper.find('#total-price').text()).toEqual(`Total Price: € ${store.state.cartPrice}`);
    expect(wrapper.find('#item-price').text()).toEqual(`€ ${store.state.bag[0].price} * ${store.state.bag[0].count}`);
    expect(wrapper.find('#item-title').text()).toEqual(store.state.bag[0].title);
  });
})
