export type TBagItem = {
  img: string;
  title: string;
  count: number;
  uuid: string;
  price: number;
}

type TState = {
  bag: Array<TBagItem>;
  wishlist: Array<string>;
  cartPrice: number;
}

export const state = () => ({
  bag: [],
  cartPrice: 0,
  wishlist: [],
})

export const mutations = {
  addBag(state: TState, product:TBagItem) {
    state.bag.push(product);
    state.cartPrice += product.price *  product.count;
  },

  removeBag(state: TState, product: TBagItem) {
    state.bag = state.bag.filter(item => item.uuid !== product.uuid);
    state.cartPrice -= product.price * product.count;
  },

  addWishlist(state: TState, uuid: string) {
    state.wishlist.push(uuid);
  },

  removeWishlist(state: TState, uuid: string) {
    state.wishlist.splice(state.wishlist.indexOf(uuid), 1);
  }
}
