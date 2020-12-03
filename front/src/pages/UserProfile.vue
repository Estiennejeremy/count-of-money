<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <edit-profile />
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <Cryptos />
      </div>
      <div class="md-layout-item">
        <Keywords />
      </div>
    </div>
  </div>
</template>

<script>
import Keywords from '../components/UserProfile/Keywords';
import Cryptos from '../components/UserProfile/Cryptos';
import EditProfile from '../components/UserProfile/EditProfile';

export default {
  name: 'UserProfile',
  components: { EditProfile, Cryptos, Keywords },
  data: () => {
    return {
      formData: { username: '', email: '', password: '' },
    };
  },
};
</script>

<style lang="scss" scoped>
.cube {
  border: 1px solid #bdbdbd;
  border-radius: 10px;

  height: 300px;
  margin: 15px 5px 0px 5px;
}
</style>
