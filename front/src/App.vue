<template>
  <router-view></router-view>
</template>

<script>
import { startArticlesCronJob } from './api_wrapper/articles';

export default {
  async mounted() {
    await startArticlesCronJob();
  },
};
</script>
