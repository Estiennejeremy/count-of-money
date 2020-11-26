<template>
  <md-card class="card">
    <md-card-media md-ratio="16:9">
      <div>
        <img :src="image" />
      </div>
    </md-card-media>

    <md-card-content>
      <p class="date">{{ date }}</p>
      <p class="title">{{ title }}</p>
      <p class="description">
        {{ description }}
      </p>
      <a :href="link" target="_blank">En savoir plus</a>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'articles-card',
  props: {
    title: {
      type: String,
      default: 'No title',
    },
    description: {
      type: String,
      default: 'No description',
    },
    date: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default:
        'https://unitedcenturion.com/wp-content/themes/consultix/images/no-image-found-360x250.png',
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: unset;
}
img {
  border-radius: 2px;
  width: 400px;
}
.title-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.date {
  color: grey;
  font-size: 10px;
}
.title {
  height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 25px;
}
.img-container {
  display: flex;
  align-items: center;
}
.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
