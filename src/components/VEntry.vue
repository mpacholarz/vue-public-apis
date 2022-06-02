<template>
  <div class="entry">
    <p class="api-category">{{ Category }}</p>
    <h3 class="api-name">{{ API }}</h3>
    <div class="api-chips chips">
      <VChip :name="'Https'" :value="isHttps"/>
      <VChip :name="'Auth'" :value="isAuth"/>
      <VChip :name="'Cors'" :value="isCors"/>
    </div>
    <p class="api-description">{{ Description }}</p>
    <div class="api-link">
      <a :href="Link" target="_blank">Read more</a>
    </div>
  </div>
</template>

<script>
import VChip from '@/components/VChip.vue';

export default {
  name: 'VEntry',
  components: {
    VChip,
  },
  props: {
    API: String,
    Description: String,
    Link: String,
    Auth: String,
    HTTPS: Boolean,
    Cors: {
      type: String,
      validator(value) {
        return ['yes', 'no', 'unknown'].includes(value);
      },
      default: 'unknown',
    },
    Category: String,
  },
  computed: {
    isHttps() {
      return this.HTTPS;
    },
    isCors() {
      if (this.Cors == null || this.Cors === 'unknown') {
        return null;
      }
      return this.Cors === 'yes';
    },
    isAuth() {
      return Boolean(this.Auth) && this.Auth !== '';
    },
  },
};
</script>
