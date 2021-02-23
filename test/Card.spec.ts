import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Card from '@/components/Card.vue';
import Buefy from 'buefy';
import { TBagItem } from '~/store';
import { TProductItem } from '~/types/product.type';
import expect from 'expect';

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Buefy)

const defaultProductInfo = {
  uuid: '',
  title: '',
  description: '',
  discount: 0,
  retail_price: {
    value: 0,
    formatted_value: '$ 0',
  },
  original_retail_price: {
    value: 0,
    formatted_value: '$ 0',
  },
  cover_image_url: ''
};

const exampleProduct: TProductItem = {
  title: 'Test Title',
  description: 'Test Description',
  discount: 0,
  uuid: 'uuid',
  'cover_image_url': 'sample_img_url',
  retail_price: {
    value: 18,
    formatted_value: '$18',
  },
  original_retail_price: {
    value: 20,
    formatted_value: '$20',
  }
};

type TMockState = {
  bag: Array<TBagItem>;
  cartPrice: number;
  wishlist: Array<string>;
}

interface CardVueInstance extends Vue {
  addProductToBag: (product: TProductItem) => {},
  toggleWishlist: (uuid: string) => {}
}

describe('Card Component', () => {
  let store: any;

  beforeEach(() => {
    const state: TMockState = {
      bag: [],
      cartPrice: 0,
      wishlist: [],
    }

    const mutations = {
      addBag(state: TMockState, product:TBagItem) {
        state.bag.push(product);
        state.cartPrice += product.price *  product.count;
      },

      addWishlist(state: TMockState, uuid: string) {
        state.wishlist.push(uuid);
      },

      removeWishlist(state: TMockState, uuid: string) {
        state.wishlist.splice(state.wishlist.indexOf(uuid), 1);
      }
    }

    store = new Vuex.Store({
      state, mutations
    });
  })

  test('renders exactly.', () => {

    const wrapper = shallowMount(Card, {
      store, localVue, propsData: {product: exampleProduct}
    });

    expect(wrapper.find('#card-title').text()).toEqual(exampleProduct.title);
    expect(wrapper.find('#card-description').text()).toEqual(exampleProduct.description);
    expect(wrapper.find('#card-retail_price').text()).toEqual(exampleProduct.retail_price.formatted_value);
  })

  test('renders exactly with default props', () => {
    const wrapper = shallowMount(Card, {
      store, localVue
    });

    expect(wrapper.vm.$props.product).toEqual(defaultProductInfo);
  })

  test('add bag function works correctly with zero discount.', () => {
    const wrapper = shallowMount<CardVueInstance & any>(Card, {
      store, localVue
    });

    wrapper.vm.addProductToBag(exampleProduct);

    expect(store.state.bag.length).toEqual(1);
    expect(store.state.bag[0].price).toEqual(exampleProduct.original_retail_price.value);
  })

  test('add bag function works correctly with non-zero discount.', () => {
    const wrapper = shallowMount<CardVueInstance & any>(Card, {
      store, localVue
    });

    wrapper.vm.addProductToBag({...exampleProduct, discount: 1});

    expect(store.state.bag.length).toEqual(1);
    expect(store.state.bag[0].price).toEqual(exampleProduct.retail_price.value);
  })

  test('toggle wishlist works correctly', () => {
    const wrapper = shallowMount<CardVueInstance & any>(Card, {
      store, localVue
    });

    const SAMPLE_UUID = 'some_sample_uuid_for_test'

    wrapper.vm.toggleWishlist(SAMPLE_UUID);
    expect(store.state.wishlist).toHaveLength(1);

    wrapper.vm.toggleWishlist(SAMPLE_UUID);
    expect(store.state.wishlist).toHaveLength(0);
  })
})
