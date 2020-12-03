<template>
  <md-card class="card">
    <md-card-header data-background-color="orange">
      <h4 class="title">Delete cryptocurrency</h4>
      <p class="category">
        Users won't be able to add it in their preferencies
      </p>
    </md-card-header>
    <md-card-content>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-75"
      >
        <md-field>
          <label for="sortParam">Name</label>
          <md-select
            v-model="cryptoId"
            name="cryptoCurrency"
            id="cryptoCurrency"
          >
            <md-option
              v-for="crypto in cryptoArray"
              :key="crypto.id"
              :value="crypto.id"
              >{{ crypto.name }}</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-size-100 text-right">
        <md-button class="md-raised md-warning" @click.prevent="deleteCrypto()"
          >Delete</md-button
        >
      </div>
      <div class="md-layout-item md-size-100 text-right">
        <span class="form-error">{{ formError }}</span>
        <span class="form-success">{{ formSuccess }}</span>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { getAllCryptos, deleteCryptoById } from '../../api_wrapper/crypto';

export default {
  name: 'delete-crypto-card',
  data() {
    return {
      formError: '',
      formSuccess: '',
      cryptoId: '',
      cryptoArray: [],
    };
  },
  methods: {
    isFormValid() {
      return !!this.cryptoId;
    },
    async deleteCrypto() {
      this.formError = '';
      this.formSuccess = '';
      if (!this.isFormValid()) {
        this.formError = 'You must select a cryptocurrency';
        return;
      }
      const res = await deleteCryptoById(this.cryptoId);
      if (res.error) this.formError = 'An error occured';
      else this.formSuccess = 'Cryptocurrency successfully deleted';
      this.cryptoArray = await getAllCryptos();
    },
  },
  async mounted() {
    this.cryptoArray = await getAllCryptos();
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
