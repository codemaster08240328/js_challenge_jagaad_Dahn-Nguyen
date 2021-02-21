<template>
  <div>
    <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
      <a class="pagination-previous">
        <img src="~assets/arrow-left.svg" />
      </a>
      <a class="pagination-next">
        <img src="~assets/arrow-right.svg" />
      </a>
      <ul class="pagination-list">
        <li v-for="(p, i) in Array(totalPage).fill()" :key="i.toString()">
          <span class="pagination-ellipsis" v-if="i === page + 2 && i < totalPage - 1">&hellip;</span>
          <a
            v-if="(i < page + 2 && i > page - 3) || i > totalPage -2"
            class="pagination-link"
            :class="{'is-current': i + 1 === page}"
            :aria-label="`Goto page ${i + 1}`"
            @click="setPage(i)"
          >
            {{i + 1}}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    },
    setPage: {
      type: Function,
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
