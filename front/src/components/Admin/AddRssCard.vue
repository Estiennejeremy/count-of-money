<template>
  <md-card class="card">
    <md-card-header data-background-color="blue">
      <h4 class="title">Add RSS feed</h4>
      <p class="category">It will add articles to the press page</p>
    </md-card-header>
    <md-card-content>
      <form>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>URL</label>
              <md-input v-model="rss.url" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Name</label>
              <md-input v-model="rss.name" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Title field match</label>
              <md-input v-model="rss.titleCorresp" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Url field match</label>
              <md-input v-model="rss.urlCorresp" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Summary field match</label>
              <md-input v-model="rss.summaryCorresp" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Date field match</label>
              <md-input v-model="rss.dateCorresp" type="text"></md-input>
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
        </div>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
import { createCrypto } from '../../api_wrapper/crypto';

export default {
  name: 'add-rss-card',
  data() {
    return {
      formError: '',
      formSuccess: '',
      rss: {
        url: '',
        name: '',
        titleCorresp: '',
        urlCorresp: '',
        summaryCorresp: '',
        dateCorresp: '',
      },
    };
  },
  methods: {
    isFormValid() {
      return !!(
        this.rss.url &&
        this.rss.name &&
        this.rss.titleCorresp &&
        this.rss.urlCorresp &&
        this.rss.summaryCorresp &&
        this.rss.dateCorresp
      );
    },
    async addCrypto() {
      this.formError = '';
      this.formSuccess = '';
      if (!this.isFormValid()) {
        this.formError = 'You must fill all fields';
        return;
      }
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
