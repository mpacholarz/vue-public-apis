<template>
  <h1 class="page-title">
    Public APIs
    <span v-if="showCounter">
      ({{ getCount }})
    </span>
  </h1>
  <div class="search">
    <label for="search">
      <span>Search</span>
      <input type="text" id="search" v-model="search" :disabled="isPageLoading"/>
    </label>
  </div>
  <div class="categories">
    <label for="category">
      <span>By category</span>
      <select id="category" v-model="category" :disabled="isPageLoading">
        <option :value="DEFAULT_CATEGORY">All</option>
        <option v-for="item in categories" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </label>
  </div>
  <div>
    <p v-if="isPageLoading || isLoading">Loading...</p>
    <div v-else-if="showList">
      <div class="list">
        <VEntry v-for="item in apisList" :key="item.Link" v-bind="item"/>
      </div>
      <VPagination @page="(n) => currentPage = n"
                   :current-page="currentPage"
                   :count="getCount"
                   :per-page="perPage"/>
    </div>
  </div>
  <VListStatus v-if="isLoading === false"
               @clear="clearList"
               @refresh="getApisWithParams"/>
</template>

<script>
import debounce from 'lodash.debounce';
import VEntry from '@/components/VEntry.vue';
import VPagination from '@/components/VPagination.vue';
import VListStatus from '@/components/VListStatus.vue';

export default {
  name: 'VList',
  components: {
    VEntry,
    VPagination,
    VListStatus,
  },
  data() {
    return {
      isPageLoading: true,
      category: '',
      search: '',
      currentPage: 0,
      perPage: 12,
      DEFAULT_CATEGORY: 'all',
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['apis/isLoading'];
    },
    apisList() {
      return this.$store.getters['apis/getList']
        .slice(this.currentPage * this.perPage, this.currentPage * this.perPage + this.perPage);
    },
    getCount() {
      return this.$store.getters['apis/getCount'];
    },
    showCounter() {
      return this.getCount != null && this.getCount >= 0;
    },
    categories() {
      return this.$store.getters['categories/getCategories'];
    },
    isListEmpty() {
      return this.getCount === 0;
    },
    requestFailed() {
      return this.$store.getters['apis/requestFailed'];
    },
    showList() {
      return this.isListEmpty === false && this.requestFailed === false;
    },
  },
  watch: {
    category() {
      this.resetCurrentPage();
      this.getApisWithParams();
    },
    search() {
      this.resetCurrentPage();
      this.debouncedSearch();
    },
  },
  methods: {
    getApisWithParams() {
      const params = {};
      const { category, search } = this;
      if (category !== 'all') {
        params.category = category;
      }
      if (search) {
        params.title = search;
      }
      this.$store.dispatch('apis/getAll', params);
    },
    debouncedSearch: debounce(function () {
      this.getApisWithParams();
    }, 500),
    clearList() {
      this.search = '';
      this.category = this.DEFAULT_CATEGORY;
      this.resetCurrentPage();
      this.$store.dispatch('apis/getAll');
    },
    resetCurrentPage() {
      this.currentPage = 0;
    },
  },
  created() {
    this.category = this.DEFAULT_CATEGORY;

    Promise.all([
      this.$store.dispatch('apis/getAll'),
      this.$store.dispatch('categories/getAll'),
    ]).finally(() => {
      this.isPageLoading = false;
    });
  },
};
</script>
