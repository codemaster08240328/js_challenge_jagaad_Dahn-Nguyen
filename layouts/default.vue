<template>
  <div>
    <nav
      class="navbar header has-shadow jagaad-navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand jagaad-navbar-brand">
        <a class="navbar-item jagaad-navbar-item" href="/">
          <img src="~assets/jagaad.png" alt="Jagaad" height="28" />
          <span style="margin-left: 10px; font-size: 16px; color: white">
            JAGAAD
          </span>
        </a>
      </div>
      <div class="jagaad-navbar-action">
        <div>
          <span style="margin-right: 3px; font-size: 14px; color: white">
            {{ `${curSign} ${handlingPrice(cartTotalPrice)}` }}
          </span>
          <img src="~/assets/bag.svg" alt="bag" @click="show = !show" />
          <span id="bag-counter" class="span-count">{{
            productsInBags.length
          }}</span>
        </div>
        <div>
          <img src="~/assets/wishlist.svg" alt="bag" />
          <span id="wishlist-counter" class="span-count">{{
            productsInWishlist.length
          }}</span>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-10">
        <nuxt />
      </div>
    </section>

    <minibag v-if="show" class="minibag-wrapper" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Minibag from '~/components/MiniBag.vue';
import { handlingPrice } from '~/utils/helper';
import { CUR_TYPE, CUR_SIGN } from '~/utils/constant';

@Component({ components: { Minibag } })
export default class Layout extends Vue {
  show: boolean = false;

  get productsInWishlist() {
    return this.$store.state.wishlist;
  }

  get productsInBags() {
    return this.$store.state.bag;
  }

  get cartTotalPrice() {
    return this.$store.state.cartPrice;
  }

  get curSign() {
    return CUR_SIGN[CUR_TYPE];
  }

  handlingPrice(price: number) {
    return handlingPrice(price);
  }
}
</script>

<style lang="scss">
.jagaad {
  &-navbar {
    background-color: #249fe3;
    justify-content: space-between;
    display: flex !important;
  }

  &-navbar-item {
    &:hover {
      background-color: #0b91da !important;
    }
  }

  &-navbar-action {
    display: flex;
    width: 150px;
    margin-right: 20px;
    justify-content: space-around;
    align-items: center;

    div {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}

.span-count {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: white;
  border: solid 1px white;
  background: cornflowerblue;
  position: absolute;
  top: 2px;
  right: -18px;
  font-size: 11px;
}

.minibag-wrapper {
  position: absolute;
  top: 55px;
  width: 300px;
  right: 20px;
  background: white;
  box-shadow: 0 0 3px black;
  z-index: 10;
}
</style>
