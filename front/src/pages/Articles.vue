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
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-25"
        v-for="article in fakeData"
        :key="article.link"
      >
        <article-card
          :title="article.title"
          :description="article.description"
          :image="article.image"
          :link="article.link"
          :date="article.date"
        ></article-card>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '../components/Articles/ArticleCard.vue';
export default {
  components: { ArticleCard },
  watch: {
    sortParam: function() {
      if (this.sortParam === 'ascent') {
        this.fakeData.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      }
      if (this.sortParam === 'descent') {
        this.fakeData.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }
    },
  },
  data() {
    return {
      sortParam: '',
      fakeData: [
        {
          title: 'The cat is cute',
          description:
            'I love cats very much I want them all I love cats very much I want them all I love cats very much I want them all I love cats very much I want them all I love cats very much I want them all',
          link: 'https://google.com',
          date: '03/02/2020',
          image:
            'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg',
        },
        {
          title: 'The cat is cute AGAIn lol mdr',
          description: 'I love cats very much I want them all AGAIN',
          link: 'https://google.com',
          date: '01/03/2019',
          image:
            'https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg',
        },
        {
          title: 'The cat is cute',
          description: 'I love cats very much I want them all',
          link: 'https://google.com',
          date: '04/02/2020',
        },
        {
          title: 'The cat is cute',
          description: 'I love cats very much I want them all',
          link: 'https://google.com',
          date: '01/09/2020',
          image:
            'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg',
        },
        {
          title: 'The cat is cute',
          description: 'I love cats very much I want them all',
          link: 'https://google.com',
          date: '01/02/2020',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
