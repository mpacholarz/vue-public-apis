<template>
  <div class="pagination" data-test="pagination">
    <div v-if="showFirst" class="page-fl">
      <a @click.prevent="setCurrentPage(0)"
        href="#" class="page">1</a>
        <span>...</span>
    </div>
    <a v-for="page in visiblePages" :key="page" class="page" href="#"
    @click.prevent="setCurrentPage(page)"
    :class="{ 'current' : currentPage === page }">
      {{ page + 1 }}
    </a>
    <div v-if="showLast" class="page-fl">
      <span>...</span>
      <a @click.prevent="setCurrentPage(pages-1)"
        href="#" class="page">
          {{ pages }}
        </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  count: Number,
  perPage: Number,
  currentPage: Number,
});

const emits = defineEmits({
  page: ((page) => typeof page === 'number'),
});

const pages = computed(() => Math.ceil(props.count / props.perPage));

const minPage = computed(() => Math.max(0, props.currentPage - 1));
const maxPage = computed(() => Math.min(pages.value, props.currentPage + 2));

const visiblePages = computed(() => Array.from({
  length: pages.value,
}, (v, i) => i).slice(minPage.value, maxPage.value));

const showLast = computed(() => visiblePages.value.includes(pages.value - 1) === false);
const showFirst = computed(() => visiblePages.value.includes(0) === false);

function setCurrentPage(page) {
  emits('page', page);
}
</script>
