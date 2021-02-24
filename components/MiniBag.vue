<template>
  <div>
    <div
      v-for="(cart, index) in carts"
      :key="cart.uuid"
      class="bag-item-wrapper"
      :class="{ 'even-row': index % 2 }"
    >
      <img :src="`${cart.img}?q=60&fit=crop&w=60&h=60`" alt="" />
      <div class="bag-item-content">
        <div class="bag-item-texts">
          <div class="bag-item-title">
            <b id="item-title">{{ cart.title }}</b>
          </div>
          <p id="item-price">
            {{ `${curSign} ${handlingPrice(cart.price)} * ${cart.count}` }}
          </p>
        </div>
        <div @click="removeItemBag(cart)">
          <b-icon icon="close" size="is-small" type="is-danger" />
        </div>
      </div>
    </div>

    <div id="total-price" class="total-price-wrapper">
      {{ `Total Price: ${curSign} ${handlingPrice(cartPrice)}` }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { handlingPrice } from '~/utils/helper';
import { CUR_TYPE, CUR_SIGN } from '~/utils/constant';

@Component
export default class CardComponent extends Vue {
  get carts() {
    return this.$store.state.bag;
  }

  get cartPrice() {
    return this.$store.state.cartPrice;
  }

  get curSign() {
    return CUR_SIGN[CUR_TYPE];
  }

  removeItemBag(product: any) {
    this.$store.commit('removeBag', product);
  }

  handlingPrice(price: number) {
    return handlingPrice(price);
  }
}
</script>

<style lang="scss" scoped>
.bag-item-wrapper {
  display: flex;

  align-items: center;
  padding: 3px 5px;

  img {
    width: 60px;
    height: 60px;
  }

  p {
    font-size: 14px;
    line-height: 16px;
  }

  .bag-item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;

    .bag-item-texts {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 5px 5px;

      .bag-item-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}

.even-row {
  background-color: #00000010;
}

.total-price-wrapper {
  border-width: 1px 0 0 0;
  border-color: #00000020;
  border-style: solid;
  padding: 10px;
}
</style>
