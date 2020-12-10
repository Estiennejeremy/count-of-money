<template>
  <md-card class="auth">
    <md-card-header data-background-color="blue">
      <h4 v-if="authType === 'signup'" class="title">Create an account</h4>
      <h4 v-if="authType === 'signin'" class="title">Log in</h4>
    </md-card-header>
    <md-card-content>
      <form>
        <div class="md-layout center-content">
          <div
            v-if="authType === 'signup'"
            class="md-layout-item md-small-size-100 md-size-80"
          >
            <md-field>
              <label>Email</label>
              <md-input data-cy="text-email" v-model="user.email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Username</label>
              <md-input data-cy="text-username" v-model="user.username"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Password</label>
              <md-input data-cy="text-mdp" v-model="user.password" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 center-content">
            <md-button
              v-if="authType === 'signup'"
              class="md-raised md-info button-size"
              @click.prevent="signup"
              >Create</md-button
            >
            <md-button
              v-if="authType === 'signin'"
              class="md-raised md-info button-size"
              @click.prevent="signin"
              data-cy="btn-connexion"
              >Log in</md-button
            >
            <span class="form-error">{{ formError }}</span>
            <!-- <span>OR</span> -->
            <md-button
              class="md-raised button-size"
              @click.prevent="githubConnect"
            >
              <i class="fab fa-github github-icon"></i>
              Connect with Github
            </md-button>
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
            <!-- <md-button class="md-raised md-info" @click.prevent="githubConnect"
              >Github connect</md-button
            > -->
          </div>
        </div>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
import {
  createUser,
  logInUser,
  githubOauth,
  githubOauthCallback,
} from '../../api_wrapper/user';
import Cookies from 'js-cookie';
import config from '../../../config.json';
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
      this.$router.push('cryptos');
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
      this.$router.push('cryptos');
    },
    githubConnect() {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${config.github_client_id}`;
    },
  },

  async mounted() {
    const githubCode = this.$route.query.code;
    if (githubCode) {
      const authToken = await githubOauth({
        clientId: config.github_client_id,
        clientSecret: config.github_client_secret,
        code: githubCode,
      });
      const res = await githubOauthCallback(authToken.access_token);
      Cookies.set('token', res.userToken);
      this.$router.push('cryptos');
    }
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

.button-size {
  width: 50%;
}

.link {
  text-align: center;
  cursor: pointer;
  color: #1dc7ea;
  &:hover {
    text-decoration: underline;
  }
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.github-icon {
  padding-right: 10px;
}
</style>
