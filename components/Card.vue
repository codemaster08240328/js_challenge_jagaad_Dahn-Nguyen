<template>
  <div class="column">
    <div class="card">
      <div class="card-content">
        <div class="content has-text-centered">
          <img :src="product.cover_image_url" :alt="product.title" />
          <p id="card-title" class="card-header-title">
            {{ product.title }}
          </p>
          <p id="card-description">
            {{ product.description }}
          </p>
          <div class="columns is-mobile">
            <div class="column auto"></div>
            <div
              v-if="product.discount > 0"
              id="card-net_price"
              class="column stroke-text is-one-third-mobile"
            >
              {{ product.original_retail_price.formatted_value }}
            </div>
            <div id="card-retail_price" class="column is-one-third-mobile">
              {{ product.retail_price.formatted_value }}
            </div>
            <div class="column auto"></div>
          </div>
        </div>
        <div
          v-if="componentMounted"
          id="wishlist-wrapper"
          class="add-whilst-wrapper"
          @click="toggleWishlist(product.uuid)"
        >
          <whilst-icon :is-active="productsInWishlist.includes(product.uuid)" />
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button
            v-if="productsInBags.includes(product.uuid)"
            class="button is-rounded is-fullwidth"
            type="is-light"
          >
            IN CART
          </b-button>
          <b-button
            v-else
            id="add-cart-button"
            class="button is-rounded is-fullwidth"
            @click="addProductToBag(product)"
          >
            Add to cart
          </b-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import WhilstIcon from '~/components/WhilstIcon.vue';
import { TProductItem } from '~/types/product.type';

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
  cover_image_url: '',
};

@Component({ components: { WhilstIcon } })
export default class CardComponent extends Vue {
  @Prop({
    default() {
      return defaultProductInfo;
    },
  })
  product: TProductItem | undefined;

  componentMounted = false; // true once component rendered. used to avoid ssr for specific component like img.

  mounted() {
    this.componentMounted = true;
  }

  get productsInWishlist() {
    return this.$store.state.wishlist;
  }

  get productsInBags() {
    return this.$store.state.bag.map((item: { uuid: string }) => item.uuid);
  }

  toggleWishlist(uuid: string) {
    if (this.productsInWishlist.includes(uuid)) {
      this.$store.commit('removeWishlist', uuid);
    } else {
      this.$store.commit('addWishlist', uuid);
    }
  }

  addProductToBag(product: TProductItem) {
    if (product.discount > 0) {
      this.$store.commit('addBag', {
        uuid: product.uuid,
        price: product.retail_price.value,
        title: product.title,
        img: product.cover_image_url,
        count: 1,
      });
    } else {
      this.$store.commit('addBag', {
        uuid: product.uuid,
        price: product.original_retail_price.value,
        title: product.title,
        img: product.cover_image_url,
        count: 1,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.stroke-text {
  text-decoration: line-through;
}

.add-whilst-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #00000050;
  background: white;

  &:hover {
    cursor: pointer;
  }
}
</style>
