import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Card from '@/components/Card.vue';
import Buefy from 'buefy';
import { TProductItem } from '~/types/product.type';

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Buefy)

describe('Card Component', () => {
  let store: any;

  beforeEach(() => {
    const state = {
      bag: [],
      cartPrice: 0,
      wishlist: [],
    }

    store = new Vuex.Store({
      state
    });
  })

  test('renders exactly.', () => {
    const props: TProductItem = {
      title: 'Test Title',
      description: 'Test Description',
      discount: 0,
      uuid: 'uuid',
      'cover_image_url': 'sample_img_url',
      retail_price: {
        value: 20,
        formatted_value: '$20',
      },
      original_retail_price: {
        value: 20,
        formatted_value: '$20',
      }
    };
    const wrapper = shallowMount(Card, {
      store, localVue, propsData: {product: props}
    });
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find('#card-title').text()).toEqual(props.title);
    expect(wrapper.find('#card-description').text()).toEqual(props.description);
    expect(wrapper.find('#card-retail_price').text()).toEqual(props.retail_price.formatted_value);
  })
})
