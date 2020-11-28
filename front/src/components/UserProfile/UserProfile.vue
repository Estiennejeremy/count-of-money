<template>
  <div class="md-card" :key='user.id'>
    <div class="md-card-content">
      <h3>User Profile</h3>
      <form novalidate @submit.prevent="sendEdit">
        <md-field>
          <label>Username</label>
          <md-input v-model="user.username"></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="user.email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input type="password" v-model="user.password"></md-input>
        </md-field>
        <div class="right">
          <md-button class="md-raised md-primary" type="submit">Edit Profile</md-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import user_profile_store from '../../store/user_profile';

export default {
  name: "UP",
  data: () => {
    return {
      user: {id: 0, username: "", email: "", password: ''},
    };
  },
  async beforeMount() {
    this.user = (await user_profile_store.getUser(1)).user;
    this.user.password = ''
    console.log(this.user);
  },
  methods: {
    sendEdit: async function () {
      if (this.user.password === '')
        this.user.password = this.user.password_hash;

      let res = (await user_profile_store.editUser(this.user)).user;
      if (this.user.error === null)
        this.user = res;
    },
  },
};
</script>

<style scoped>
.right {
  width: 100%;

  display: flex;
  justify-content: flex-end;
}

#user_profile {
  width: 80%;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
}
</style>