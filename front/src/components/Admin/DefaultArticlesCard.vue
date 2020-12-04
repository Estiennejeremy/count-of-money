<template>
  <md-card class="card">
    <md-card-header data-background-color="purple">
      <slot name="title"> </slot>
      <slot name="subtitle"> </slot>
    </md-card-header>
    <md-card-content>
      <form>
        <div class="md-layout-item md-small-size-100 md-size-75">
          <md-field>
            <label>Number of articles</label>
            <md-input v-model="nbArticles"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-raised md-primary" @click.prevent="sendEdit"
            >Edit</md-button
          >
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <span class="form-error">{{ formError }}</span>
          <span class="form-success">{{ formSuccess }}</span>
        </div>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
import { getAllKeywords } from '../../api_wrapper/keyword';
import { getUserById, editUser } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';

export default {
  name: 'default-articles-card',
  data: () => {
    return {
      userId: '',
      nbArticles: 0,
      formError: '',
      formSuccess: '',
    };
  },
  async beforeMount() {
    const token = Cookies.get('token');
    const userId = await getUserIdByToken(token);
    const user = await getUserById(userId);
    this.nbArticles = user.keywords_array[0];
    this.userId = user.id;
  },

  methods: {
    async sendEdit() {
      this.formError = '';
      this.formSuccess = '';
      const userRes = (
        await editUser({ id: this.userId, keywords: [this.nbArticles] })
      ).user;
      if (userRes.error) {
        this.formError = 'An error occured';
        return;
      }
      this.formSuccess = 'Default number of articles updated';
      this.nbArticles = user.keywords_array[0];
    },
  },
};
</script>

<style scoped>
.form-error {
  color: #e53935;
}
.form-success {
  color: green;
}
</style>
