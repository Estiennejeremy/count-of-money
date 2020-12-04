<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <edit-profile />
      </div>
    </div>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <cryptos>
          <template v-slot:title>
            <h4 class="title">My cryptocurrencies</h4>
          </template>
          <template v-slot:subtitle>
            <p class="subtitle">
              They will be displayed on the Cryptos page
            </p>
          </template>
        </cryptos>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <keywords>
          <template v-slot:title>
            <h4 class="title">My keywords</h4>
          </template>
          <template v-slot:subtitle>
            <p class="subtitle">
              Articles linked to these keywords will be displayed on the Press
              page
            </p>
          </template>
        </keywords>
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
