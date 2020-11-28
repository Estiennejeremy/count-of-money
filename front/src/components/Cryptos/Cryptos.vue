<template>
  <div class="md-card" :key="user.crypto_array.length">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <div class="md-card-header">
      My cryptos :
    </div>
    <div class="md-card-content">
      <md-field>
        <label>Add Crypto</label>
        <md-select v-model="cryptoSelected">
          <md-option v-for="(item, i) in cryptos" :key="i" :value="i">{{
            item
          }}</md-option>
        </md-select>
      </md-field>
      <div class="wrap">
        <div class="badge" v-for="crypto in user.crypto_array" :key="crypto">
          {{ cryptos[crypto] }}
          <md-button class="md-icon-button md-simple" v-on:click="deleteCrypto(crypto)">
            <md-icon class="fa fa-times-circle"></md-icon>
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user_profile_store from "../../store/user_profile";

export default {
  name: "Cryptos",
  data: () => {
    return {
      cryptos: ["Bitcoin", "Ethereum", "..."],
      cryptoSelected: null,
      user: {crypto_array: []},
    };
  },
  async beforeMount() {
    this.user = (await user_profile_store.getUser(1)).user;
  },
  watch: {
    cryptoSelected: async function () {
      if (!this.user.crypto_array.includes(this.cryptoSelected) && this.cryptoSelected !== null)
      {
        this.user.cryptos = [...this.user.crypto_array, this.cryptoSelected];
        this.user.keywords = this.user.keywords_array;

        this.user = (await user_profile_store.editUser(this.user)).user;
      }

      this.cryptoSelected = null;
    },
  },
  methods: {
    deleteCrypto: async function (id) {
      let arr = [];

      this.user.crypto_array.forEach(e => {
        if (e !== id)
          arr.push(e);
      });

      this.user.cryptos = arr;
      this.user.keywords = this.user.keywords_array;
        
      this.user = (await user_profile_store.editUser(this.user)).user;
    },
  },
};
</script>

<style scoped>
.wrap {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(105px, auto));

  height: 200px;

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