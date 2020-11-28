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
          <md-select v-model="keywordSelected" name="keyword" id="keyword">
            <md-option
              v-for="keyword in keywordArray"
              :key="keyword.id"
              :value="keyword.id"
              >{{ keyword.name }}</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="wrap">
        <div class="badge" v-for="keyword in user.keyword_array" :key="keyword">
          {{ getKeywordNameById(keyword) }}
          <md-button
            class="md-icon-button md-simple"
            v-on:click="deleteKeyword(keyword)"
          >
            <i class="fas fa-times-circle"></i>
          </md-button>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { getAllKeywords } from '../../api_wrapper/keyword';
import { getUserById, editUser } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';

export default {
  name: 'Keywords',
  data: () => {
    return {
      keywordArray: [],
      keywordSelected: null,
      user: { keyword_array: [] },
    };
  },
  async mounted() {
    this.keywordArray = await getAllKeywords();
    const token = Cookies.get('token');
    const userId = await getUserIdByToken(token);
    const user = await getUserById(userId);
    this.user = { keyword_array: user.keywords_array, id: user.id };
  },

  watch: {
    keywordSelected: async function() {
      if (
        !this.user.keyword_array.includes(this.keywordSelected) &&
        this.keywordSelected
      ) {
        this.user.keywords = [...this.user.keyword_array, this.keywordSelected];
        const userRes = (await editUser(this.user)).user;
        this.user.keyword_array = userRes.keywords_array;
      }
      this.keywordSelected = null;
    },
  },
  methods: {
    getKeywordNameById(id) {
      return this.keywordArray.find(element => element.id === id).name;
    },
    deleteKeyword: async function(id) {
      let arr = [];

      this.user.keyword_array.forEach(e => {
        if (e !== id) arr.push(e);
      });
      this.user.keywords = arr;
      const userRes = (await editUser(this.user)).user;
      this.user.keyword_array = userRes.keywords_array;
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
