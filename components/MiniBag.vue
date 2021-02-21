<template>
  <div>
    <div
      v-for="(cart, index) in carts"
      :key="cart.uuid"
      class="bag-item-wrapper"
      :class="{'even-row': index % 2}"
    >
      <img :src="`${cart.img}?q=60&fit=crop&w=60&h=60`" alt="">
      <div style="margin: 0 5px;">
        <p><b>{{cart.title}}</b></p>
        <p>€ {{cart.price}} * {{cart.count}} </p>
      </div>
      <div
        @click="removeItemBag(cart)"
      >
        <b-icon
          icon="close"
          size="is-small"
        />
      </div>
    </div>

    <div class="total-price-wrapper">
      Total Price: € {{cartPrice}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CardComponent extends Vue {
  get carts() {
    return this.$store.state.bag;
  }

  get cartPrice() {
    return this.$store.state.cartPrice;
  }

  removeItemBag(product: any) {
    console.log('clicked!!')
    this.$store.commit('removeBag', product)
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
}

.even-row {
  background-color: #00000010;
}

.total-price-wrapper {
  border-width: 1px 0 0 0;
  border-color:  #00000020;
  border-style: solid;
  padding: 10px;
}
</style>
