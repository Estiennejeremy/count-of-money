<template>
  <md-card class="auth">
    <md-card-header data-background-color="blue">
      <h4 v-if="authType === 'signup'" class="title">Create an account</h4>
      <h4 v-if="authType === 'signin'" class="title">Log in</h4>
    </md-card-header>
    <md-card-content>
      <form>
        <div class="md-layout">
          <div
            v-if="authType === 'signup'"
            class="md-layout-item md-small-size-100 md-size-80"
          >
            <md-field>
              <label>Email</label>
              <md-input v-model="user.email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Username</label>
              <md-input v-model="user.username"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Password</label>
              <md-input v-model="user.password" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 button-container">
            <span v-if="authType === 'signup'">
              Already have an account ?
              <p @click.prevent="redirectSigninSignup" class="link">
                Sign in here
              </p>
            </span>
            <span v-if="authType === 'signin'">
              Don't have an account ?
              <p @click.prevent="redirectSigninSignup" class="link">
                Sign up here
              </p>
            </span>
            <span class="form-error">{{ formError }}</span>
            <md-button
              v-if="authType === 'signup'"
              class="md-raised md-info"
              @click.prevent="signup"
              >Create</md-button
            >
            <md-button
              v-if="authType === 'signin'"
              class="md-raised md-info"
              @click.prevent="signin"
              >Log in</md-button
            >
          </div>
        </div>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
import { createUser, logInUser } from '../../api_wrapper/user';
import Cookies from 'js-cookie';

export default {
  name: 'auth-card',
  props: {
    authType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
      },
      formError: '',
    };
  },
  methods: {
    isFormValid() {
      if (this.authType === 'signup')
        return this.user.email && this.user.username && this.user.password;
      if (this.authType === 'signin')
        return this.user.username && this.user.password;
    },
    isEmailValid() {
      return this.user.email.match(
        /([a-zA-Z0-9\.\-\_]*)@[a-zA-Z0-9\.\-]*\.[a-zA-Z]{1,3}/g,
      );
    },
    checkForm() {
      this.formError = '';
      if (!this.isFormValid()) {
        this.formError = 'All fields must be completed';
        return;
      }
      if (this.authType === 'signup') {
        if (!this.isEmailValid()) {
          this.formError = 'Incorrect email format';
          return;
        }
      }
    },
    redirectSigninSignup() {
      if (this.authType === 'signup') this.$router.push('signin');
      else this.$router.push('signup');
    },
    async signin() {
      this.checkForm();
      const token = await logInUser(this.user);
      if (token.error) {
        this.formError = token.error;
        return;
      }
      Cookies.set('token', token.userToken);
      this.$router.push('dashboard');
    },
    async signup() {
      this.checkForm();
      const res = await createUser(this.user);
      if (res.error) {
        this.formError = res.error;
        return;
      }
      const token = await logInUser(this.user);
      if (token.error) {
        this.formError = token.error;
        return;
      }
      Cookies.set('token', token.userToken);
      this.$router.push('dashboard');
    },
  },
};
</script>

<style scoped lang="scss">
.auth {
  width: 40%;
  @media (max-width: 768px) {
    width: 90%;
  }
}

.form-error {
  color: #e53935;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  cursor: pointer;
  color: #1dc7ea;
  &:hover {
    text-decoration: underline;
  }
}
</style>
