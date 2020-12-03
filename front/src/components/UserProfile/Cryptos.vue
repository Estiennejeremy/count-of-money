<template>
  <md-card class="card">
    <md-card-header data-background-color="purple">
      <slot name="title"> </slot>
      <slot name="subtitle"> </slot>
    </md-card-header>
    <md-card-content>
      <div class="md-layout-item md-small-size-100 md-size-75">
        <md-field>
          <label for="sortParam">Name</label>
          <md-select
            v-model="cryptoSelected"
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
      <div class="wrap">
        <div class="badge" v-for="crypto in user.crypto_array" :key="crypto">
          {{ getCryptoNameById(crypto) }}
          <md-button
            class="md-icon-button md-simple"
            v-on:click="deleteCrypto(crypto)"
          >
            <i class="fas fa-times-circle"></i>
          </md-button>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { getAllCryptos } from '../../api_wrapper/crypto';
import { getUserById, editUser } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';

export default {
  name: 'Cryptos',
  data: () => {
    return {
      cryptoArray: [],
      cryptoSelected: null,
      user: { crypto_array: [] },
    };
  },
  async mounted() {
    this.cryptoArray = await getAllCryptos();
    const token = Cookies.get('token');
    const userId = await getUserIdByToken(token);
    const user = await getUserById(userId);
    this.user = { crypto_array: user.crypto_array, id: user.id };
  },

  watch: {
    cryptoSelected: async function() {
      if (
        !this.user.crypto_array.includes(this.cryptoSelected) &&
        this.cryptoSelected
      ) {
        this.user.cryptos = [...this.user.crypto_array, this.cryptoSelected];
        const userRes = (await editUser(this.user)).user;
        this.user.crypto_array = userRes.crypto_array;
      }
      this.cryptoSelected = null;
    },
  },
  methods: {
    getCryptoNameById(id) {
      return this.cryptoArray.find(element => element.id === id).name;
    },
    deleteCrypto: async function(id) {
      let arr = [];

      this.user.crypto_array.forEach(e => {
        if (e !== id) arr.push(e);
      });
      this.user.cryptos = arr;
      const userRes = (await editUser(this.user)).user;
      this.user.crypto_array = userRes.crypto_array;
    },
  },
};
</script>

<style scoped>
.wrap {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(105px, auto));

  height: 100px;

  overflow: auto;
}

.wrap > * {
  background-color: inherit;
  height: 30px;

  width: auto;

  border: 1px solid #9e9e9e;
  border-radius: 15px;

  /* display: flex;
  justify-content: space-around;
  align-items: center; */

  display: grid;
  grid-template-columns: minmax(80px, auto) 35px;
  align-items: center;
  gap: 5px;

  text-align: center;
}
</style>
