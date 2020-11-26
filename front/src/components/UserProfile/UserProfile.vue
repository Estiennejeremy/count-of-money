<template>
  <div class="md-card">
    <div class="md-card-content">
      <h3>User Profile</h3>
      <form novalidate @submit.prevent="sendEdit">
        <md-field>
          <label>Username</label>
          <md-input v-model="formData.username"></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="formData.email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input type="password" v-model="formData.password"></md-input>
        </md-field>
        <div class="right">
          <md-button class="md-raised md-primary" type="submit">Edit Profile</md-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UP",
  data: () => {
    return {
      formData: { username: "", email: "", password: "" },
    };
  },
  methods: {
    sendEdit: function () {
      console.log("ici", this.formData);
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