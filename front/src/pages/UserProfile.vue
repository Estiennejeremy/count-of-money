<template>
  <div class="content">
    <div class="md-layout">
        <div class="md-layout-item">
          <UP/>
        </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <Cryptos/>
      </div>
      <div class="md-layout-item">
        <Keywords/>
      </div>
    </div>
  </div>
</template>

<script>
import Keywords from '../components/Keywords/Keywords';
import Cryptos from '../components/Cryptos/Cryptos';
import UP from '../components/UserProfile/UserProfile';

export default {
    name: 'UserProfile',
    components: {UP, Cryptos, Keywords},
    data: () => {
        return {
            formData: {username: '', email: '', password: ''}
        }
    }
};
</script>

<style lang="scss" scoped>

.cube {
    border: 1px solid #BDBDBD;
    border-radius: 10px;

    height: 300px;
    margin: 15px 5px 0px 5px;
}

</style>
