import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MiniBag from '@/components/MiniBag.vue';
import Buefy from 'buefy';
import { handlingPrice } from '~/utils/helper';
import { TBagItem } from '~/store';
import expect from 'expect';

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Buefy)

type TMockState = {
  bag: Array<TBagItem>;
  cartPrice: number;
}

interface BagVueInstance extends Vue {
  removeItemBag: (product: TBagItem) => {}
}

describe('Card Component', () => {
  let store: any;

  beforeEach(() => {
    const state: TMockState = {
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

    const mutations = {
      removeBag(state: TMockState, product: TBagItem) {
        state.bag = state.bag.filter(item => item.uuid !== product.uuid);
        state.cartPrice -= product.price * product.count;
      }
    }

    store = new Vuex.Store({
      state, mutations
    });
  });

  it('mini bag renders exactly', () => {
    const wrapper = shallowMount(MiniBag, {
      store, localVue
    });

    expect(wrapper.find('#total-price').text()).toEqual(`Total Price: € ${handlingPrice(store.state.cartPrice)}`);
    expect(wrapper.find('#item-price').text()).toEqual(`€ ${handlingPrice(store.state.bag[0].price)} * ${store.state.bag[0].count}`);
    expect(wrapper.find('#item-title').text()).toEqual(store.state.bag[0].title);
  });

  it('mini bag works correctly with remove item', () => {
    const wrapper = shallowMount<BagVueInstance>(MiniBag, {
      store, localVue
    })

    wrapper.vm.removeItemBag({
      img: 'IMAGE_URL',
      title: 'product_title',
      price: 23,
      count: 1,
      uuid: 'UUID'
    });

    expect(store.state.cartPrice).toEqual(0);
  })
})
