<template>
  <section class="section">
    <b-notification v-model="error" aria-close-label="Error notificaion" type="is-danger">
      Backend Endpoint returns error!
    </b-notification>
    <div v-if="loading">
      <b-loading :is-full-page="true" v-model="loading"></b-loading>
    </div>
    <div v-else class="columns is-mobile">
      <div v-for="product in products" :key="product.uuid" class="column is-one-third-widescreen is-half-tablet is-full-mobile" >
        <card  :product="product" />
      </div>
    </div>
    <div>
      <b-pagination
        :total="72"
        v-model="page"
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
import { mapMutations } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Card from '~/components/Card.vue';
import { TProductItem } from '~/types/product.type';
import { BACKEND_URL, COUNT_PER_PAGE } from '~/utils/constant';

type TAsyncDataParam = { $axios: NuxtAxiosInstance };

@Component({components: { Card }})
export default class HomePage extends Vue {
  page: number = 1;
  loading: boolean = false;
  error: boolean = false;

  products: Array<TProductItem> = [];

  async asyncData({$axios}: TAsyncDataParam) {
    $axios.setHeader('Accept-Language', 'it');
    $axios.setHeader('Content-Type', 'application/json');
    $axios.setHeader('x-musement-currency', 'EUR');
    $axios.setHeader('x-musement-version', '3.4.0');

    const products: Array<TProductItem> = await $axios.$get(`${BACKEND_URL}?limit=${COUNT_PER_PAGE}&offset=0`);

    return { products };
  }

  @Watch('page')
  async onPageChanged(value: number, oldValue: string) {
    this.loading = true;
    this.$axios.setHeader('Accept-Language', 'it');
    this.$axios.setHeader('Content-Type', 'application/json');
    this.$axios.setHeader('x-musement-currency', 'EUR');
    this.$axios.setHeader('x-musement-version', '3.4.0');

    const OFFSET = COUNT_PER_PAGE * (value - 1);
    try {
      const products: Array<TProductItem> = await this.$axios.$get(`${BACKEND_URL}?limit=${COUNT_PER_PAGE}&offset=${OFFSET}`);
      this.products = products;
      this.error = false;
    } catch {
      this.products = [];
      this.error = true;
    } finally {
      this.loading = false;
    }


    console.log(this.products);
  }
}
</script>

<style lang="scss" scoped>
.columns {
  flex-wrap: wrap;
}
</style>
