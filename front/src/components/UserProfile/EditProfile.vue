<template>
  <md-card class="card">
    <md-card-header data-background-color="blue">
      <h4 class="title">Modify profile informations</h4>
    </md-card-header>
    <md-card-content>
      <form>
        <div class="md-layout-item md-small-size-100 md-size-75">
          <md-field>
            <label for="currency">Default currency</label>
            <md-select v-model="user.currency" name="currency" id="currency">
              <md-option value="USD">USD</md-option>
              <md-option value="EUR">EUR</md-option>
              <md-option value="GPB">GBP</md-option>
              <md-option value="JPY">JPY</md-option>
              <md-option value="AUD">AUD</md-option>
              <md-option value="CAD">CAD</md-option>
              <md-option value="CHF">CHF</md-option>
              <md-option value="CNH">CNH</md-option>
              <md-option value="SEK">SEK</md-option>
              <md-option value="NZD">NZD</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-75">
          <md-field>
            <label>Username</label>
            <md-input data-cy="profile-username" v-model="user.username"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-75">
          <md-field>
            <label>Email</label>
            <md-input data-cy="profile-email" v-model="user.email"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-75">
          <md-field>
            <label>Password</label>
            <md-input type="password" v-model="user.password"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <md-button data-cy="btn-edit-profile" class="md-raised md-primary" @click.prevent="sendEdit"
            >Edit Profile</md-button
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
import { getUserById, editUser } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';

export default {
  name: 'edit-profile',
  data() {
    return {
      formSuccess: '',
      formError: '',
      user: {
        username: '',
        email: '',
        password: '',
        currency: '',
      },
    };
  },
  async beforeMount() {
    const token = Cookies.get('token');
    const userId = await getUserIdByToken(token);
    const user = await getUserById(userId);
    this.user = {
      username: user.username,
      email: user.email,
      id: user.id,
      currency: user.default_currency,
    };
  },
  methods: {
    async sendEdit() {
      this.formSuccess = '';
      this.formError = '';
      const resUser = await editUser(this.user);
      if (resUser.error) this.formError = 'An error occured';
      else this.formSuccess = 'Profile successfully updated';
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
