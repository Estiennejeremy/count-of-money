<template>
  <div class="md-card">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
        <div class="badge" v-for="keyword in myKeywords" :key="keyword">
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
export default {
    name: 'Keywords',
    data: () => {
        return {
            keywords: ['cryptomoney', 'Bitcoin'],
            myKeywords: [],
            keywordSelected: null
        }
    },
    watch: {
        keywordSelected: function () {
            if (!this.myKeywords.includes(this.keywordSelected))
                this.myKeywords = [...this.myKeywords, this.keywordSelected];
        }
    },
    methods: {
        deleteKeyword: function(id) {
            if (this.myKeywords.length > 1)
                this.myKeywords = [...this.myKeywords].splice(id, 1);

            else
                this.myKeywords = [];
        }
    }
};
</script>

<style>
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