<template>
  <div class="md-card">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="md-card-content">
      <h3>My Keywords :</h3>
      <md-field>
        <label>Add Keyword</label>
        <md-select v-model="keywordSelected">
          <md-option v-for="(item, i) in keywords" :key="i" :value="i">{{
            item
          }}</md-option>
        </md-select>
      </md-field>
      <div class="wrap">
        <div v-for="keyword in user.keywords_array" :key="keyword">
          {{ keywords[keyword] }}
          <md-button class="md-icon-button md-simple" v-on:click="deleteKeyword(keyword)">
            <md-icon class="fa fa-times-circle"></md-icon>
          </md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user_profile_store from '../../store/user_profile';
export default {
  name: "Keywords",
  data: () => {
    return {
      keywords: ["cryptomoney", "Bitcoin"],
      keywordSelected: null,
      user: { keywords_array: [] },
    };
  },
  async beforeMount() {
    let res = await user_profile_store.getUser(1);
    
    if (res.error === undefined)
      this.user = res.user; 
  },
  watch: {
    keywordSelected: async function () {
      if (!this.user.keywords_array.includes(this.keywordSelected) && this.keywordSelected !== null) {
        this.user.keywords_array = [...this.user.keywords_array, this.keywordSelected];
        
        this.user.keywords = this.user.keywords_array;
        this.user.cryptos = this.user.crypto_array;

        let res = await user_profile_store.editUser(this.user);

        if (res.error === undefined)
          this.user = res.user;
      }

      this.keywordSelected = null;
    },
  },
  methods: {
    deleteKeyword: async function (id) {
      let arr = [];

      this.user.keywords_array.forEach((e) => {
        if (e !== id) 
          arr.push(e);
      });

      this.user.keywords_array = arr;
      this.user.keywords = arr;

      this.user = await user_profile_store.editUser(this.user);

      if (!this.user.error)
        this.user = this.user.user;
    },
  },
};
</script>

<style>
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