<template>
  <section class="section">
    <b-notification
      v-model="error"
      aria-close-label="Error notificaion"
      type="is-danger"
    >
      Backend Endpoint returns error!
    </b-notification>
    <div v-if="loading">
      <b-loading v-model="loading" :is-full-page="true"></b-loading>
    </div>
    <div v-else class="columns is-mobile">
      <div
        v-for="product in products"
        :key="product.uuid"
        class="column is-one-third-widescreen is-half-tablet is-full-mobile"
      >
        <card :product="product" class="card-component" />
      </div>
    </div>
    <div style="margin-top: 25px">
      <b-pagination
        v-model="page"
        :total="72"
        :per-page="6"
        :rounded="true"
        :range-before="1"
        :range-after="1"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        size="is-small"
      >
      </b-pagination>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Card from '~/components/Card.vue';
import { TProductItem } from '~/types/product.type';
import { BACKEND_URL, COUNT_PER_PAGE } from '~/utils/constant';

type TAsyncDataParam = { $axios: NuxtAxiosInstance };

@Component({ components: { Card } })
export default class HomePage extends Vue {
  page: number = 1;
  loading: boolean = false;
  error: boolean = false;

  products: Array<TProductItem> = [];

  async asyncData({ $axios }: TAsyncDataParam) {
    const products: Array<TProductItem> = await $axios.$get(
      `${BACKEND_URL}?limit=${COUNT_PER_PAGE}&offset=0`
    );

    return { products };
  }

  @Watch('page')
  async onPageChanged(value: number) {
    this.loading = true;

    const OFFSET = COUNT_PER_PAGE * (value - 1);
    try {
      const products: Array<TProductItem> = await this.$axios.$get(
        `${BACKEND_URL}?limit=${COUNT_PER_PAGE}&offset=${OFFSET}`
      );
      this.products = products;
      this.error = false;
    } catch {
      this.products = [];
      this.error = true;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
.columns {
  flex-wrap: wrap;
}

// customize Buefy pagination component
.pagination {
  display: flex;
  justify-content: center !important;

  &-previous {
    order: 1 !important;
    padding-left: 0.25em !important;
    padding-right: 0.25em !important;
  }

  &-next {
    order: 3 !important;
    padding-left: 0.25em !important;
    padding-right: 0.25em !important;
  }

  &-list {
    order: 2 !important;
    flex-grow: 0 !important;
  }
}
</style>
