<template>
  <md-card class="card">
    <md-card-header data-background-color="orange">
      <h4 class="title">Delete RSS feed</h4>
      <p class="category">
        No new articles from this feed will be added
      </p>
    </md-card-header>
    <md-card-content>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-75"
      >
        <md-field>
          <label for="sortParam">Name</label>
          <md-select v-model="feedId" name="feed" id="feed">
            <md-option
              v-for="feed in feedArray"
              :key="feed.id"
              :value="feed.id"
              >{{ getFeedKeyword(feed.keywords[0]) }}</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-size-100 text-right">
        <md-button class="md-raised md-warning" @click.prevent="deleteFeed()"
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
import { getAllFeeds, deleteFeedById } from '../../api_wrapper/feed';
import { getAllKeywords } from '../../api_wrapper/keyword';

export default {
  name: 'delete-rss-card',
  data() {
    return {
      formError: '',
      formSuccess: '',
      feedId: '',
      feedArray: [],
      keywordsArray: [],
    };
  },
  methods: {
    isFormValid() {
      return !!this.feedId;
    },
    async deleteFeed() {
      this.formError = '';
      this.formSuccess = '';
      if (!this.isFormValid()) {
        this.formError = 'You must select a RSS feed';
        return;
      }
      const res = await deleteFeedById(this.feedId);
      if (res.error) this.formError = 'An error occured';
      else this.formSuccess = 'RSS feed successfully deleted';
      this.feedArray = await getAllFeeds();
    },
    getFeedKeyword(keywordId) {
      return this.keywordsArray.find(element => element.id === keywordId).name;
    },
  },
  async mounted() {
    this.feedArray = await getAllFeeds();
    this.keywordsArray = await getAllKeywords();
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
