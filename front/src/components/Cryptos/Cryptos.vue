<template>
  <div class="md-card">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="md-card-content">
      <h3>My cryptos</h3>
      <md-field>
        <label>Add Crypto</label>
        <md-select v-model="cryptoSelected">
          <md-option v-for="(item, i) in cryptos" :key="i" :value="i">{{
            item
          }}</md-option>
        </md-select>
      </md-field>
      <div class="wrap">
        <div class="badge" v-for="crypto in myCryptos" :key="crypto">
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
export default {
  name: "Cryptos",
  data: () => {
      return {
          cryptos: ['Bitcoin', 'Ethereum', '...'],
          myCryptos: [],
          cryptoSelected: null 
      };
  },
  watch: {
      cryptoSelected: function() {
          if (!this.myCryptos.includes(this.cryptoSelected))
            this.myCryptos = [...this.myCryptos, this.cryptoSelected];
      }
  },
  methods: {
      deleteCrypto: function(id)
        {
            if (this.myCryptos.length > 1)
                this.myCryptos = [...this.myCryptos].splice(id, 1);
            
            else
                this.myCryptos = [];
        },
  }
};
</script>

<style scoped>
.badge {
    height: 20px;
    background-color: #EEEEEE;
}

.wrap {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(100px, auto));

  height: 200px;

  overflow: auto;
}

.wrap>* {
  background-color: inherit;
  height: 30px;
  width: auto;

  border: 1px solid #9E9E9E;
  border-radius: 15px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 10px;
}
</style>