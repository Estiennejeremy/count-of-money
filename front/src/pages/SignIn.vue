<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 signup"
      >
        <auth-card authType="signin"></auth-card>
      </div>
    </div>
  </div>
</template>

<script>
import AuthCard from '../components/Auth/AuthCard.vue';

export default {
  name: 'Signin',
  components: {
    AuthCard,
  },
};
</script>

<style scoped>
.signup {
  margin-top: 200px;
  display: flex;
  justify-content: center;
}
</style>
