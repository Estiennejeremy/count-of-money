<template>
  <div class="content">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-25"
    >
      <md-field>
        <label for="sortParam">Sort by</label>
        <md-select v-model="sortParam" name="sortParam" id="sortParam">
          <md-option value="ascent">Oldest</md-option>
          <md-option value="descent">Latest</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="md-layout">
      <div
        v-if="articlesData.length === 0"
        class="md-layout-item md-size-100 text-center"
      >
        <h4>
          Seems like there is nothing to read... Try to add more keywords to
          your preferencies !
        </h4>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-for="article in articlesData"
        :key="article.link"
      >
        <article-card
          :title="article.title"
          :description="article.summary"
          :image="article.image_url"
          :link="article.url"
          :date="article.formattedDate"
        ></article-card>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '../components/Articles/ArticleCard.vue';
import { getArticlesByKeywords } from '../api_wrapper/articles';
import { getUserById } from '../api_wrapper/user';
import { getUserIdByToken } from '../api_wrapper/token';

import Cookies from 'js-cookie';

export default {
  components: { ArticleCard },
  watch: {
    sortParam: function() {
      if (this.sortParam === 'ascent') {
        this.articlesData.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      }
      if (this.sortParam === 'descent') {
        this.articlesData.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }
    },
  },
  methods: {
    formatArticleDate(articleDate) {
      const date = new Date(articleDate);
      return `${date.toISOString().split('T')[0]} at ${date.toLocaleTimeString(
        'fr-FR',
      )}`;
    },
  },
  data() {
    return {
      sortParam: '',
      articlesData: [],
    };
  },

  async mounted() {
    const token = Cookies.get('token');
    if (token) {
      const userId = await getUserIdByToken(token);
      const user = await getUserById(userId);
      if (user.username === 'admin') {
        this.articlesData = await getArticlesByKeywords([], '');
      } else {
        this.articlesData = await getArticlesByKeywords(
          user.keywords_array,
          token,
        );
      }
    } else {
      this.articlesData = await getArticlesByKeywords([], '');
    }
    this.articlesData.forEach(
      element => (element.formattedDate = this.formatArticleDate(element.date)),
    );
  },
};
</script>

<style lang="scss" scoped></style>
