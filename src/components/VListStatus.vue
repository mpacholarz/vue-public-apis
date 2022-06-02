<template>
  <div>
    <p v-if="isListEmpty">No matching records found,
      <a href="#" @click.prevent="$emit('clear')">clear and try again</a>
    </p>
    <p v-if="requestFailed">Something went wrong,
      <a href="#" @click.prevent="$emit('refresh')">try again</a>
    </p>
  </div>
</template>

<script setup>
import { defineEmits, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

defineEmits(['clear', 'refresh']);

const getCount = computed(() => store.getters['apis/getCount']);
const isListEmpty = computed(() => getCount.value === 0);
const requestFailed = computed(() => store.getters['apis/requestFailed']);
</script>
