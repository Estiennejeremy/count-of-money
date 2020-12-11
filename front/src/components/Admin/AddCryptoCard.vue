<template>
  <md-card class="card">
    <md-card-header data-background-color="blue">
      <h4 class="title">Add cryptocurrency</h4>
      <p class="category">Users will be able to add it in their preferencies</p>
    </md-card-header>
    <md-card-content>
      <form>
        <div class="md-layout-item md-small-size-100 md-size-75">
          <md-field>
            <label>Cryptocurrency code</label>
            <md-input v-model="cryptoCode" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-raised md-info" @click.prevent="addCrypto()"
            >Add</md-button
          >
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <span class="form-error">{{ formError }}</span>
          <span class="form-success">{{ formSuccess }}</span>
        </div>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
import { createCrypto } from '../../api_wrapper/crypto';
import Cookies from 'js-cookie';

export default {
  name: 'add-crypto-card',
  data() {
    return {
      formError: '',
      formSuccess: '',
      cryptoCode: '',
    };
  },
  methods: {
    isFormValid() {
      return !!this.cryptoCode;
    },
    async addCrypto() {
      this.formError = '';
      this.formSuccess = '';
      if (!this.isFormValid()) {
        this.formError = 'You must give a cryptocurrency code';
        return;
      }
      const token = Cookies.get('token');
      const cryptoRes = await createCrypto(
        {
          symbol: this.cryptoCode,
          currency: 'EUR',
        },
        token,
      );
      if (cryptoRes.error)
        this.formError = 'This cryptocurrency does not exist';
      else this.formSuccess = 'Crypto currency added successfully !';
    },
  },
};
</script>

<style lang="scss" scoped>
.form-error {
  color: #e53935;
}
.form-success {
  color: green;
}
</style>
