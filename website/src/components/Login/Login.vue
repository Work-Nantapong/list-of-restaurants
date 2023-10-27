<script>
import axios from 'axios';
import AuthenticationService from "@/services/AuthenticationService";
import router from "@/router";

axios.defaults.headers.post['Content-Type'] = 'application/form-data';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  created() {
    if (this.$cookie.getCookie('token')) {
      this.$router.replace({ path: '/' });
    }
  },
  name: 'Login',
  data: () => ({
    valid: false,
    email: 'develop@example.com',
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
    ],
    password: '1Stlogin',
    hidePassword: true,
    result: null
  }),
  methods: {
    clear() {
      this.email = '';
      this.password = '';
    },
    submit() {
      this.result = null;

      let user = {
        email: this.email,
        password: this.password,
        device_name: 'website'
      };

      AuthenticationService.login(user)
          .then((response) => {
            this.result = response.status;
            this.$cookie.setCookie("token", response.data, {
              expire: '60s',
            })
            this.clear();
            this.$router.replace({ path: '/' });
          })
          .catch(error => {
            console.log(error);
            this.result = error.response.status;
          });
    },

  }
};
</script>
<template>
  <v-container fluid fill-height >
    <v-layout justify-center align-center>
      <v-flex>
        <v-card>
          <v-card-text>
            <h3 class="headline mb-0">Login</h3>
            <v-form v-model="valid">

              <v-text-field class="w-100"
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
              ></v-text-field>

              <v-text-field class="w-100"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  v-model="password"
                  min="8"
                  :type="hidePassword ? 'password' : 'text'"
                  counter
              ></v-text-field>
              <v-alert
                  :value="!!result"
                  :type="result == 200 ? 'success' : 'error'"
                  transition="scale-transition">
                {{ result == 200 ? 'Login Correct!' : 'Login Incorrect!' }}
              </v-alert>
              <br>
              <v-btn @click="clear">clear</v-btn>
              <v-btn @click="submit" :disabled="!valid">submit</v-btn>
            </v-form>

          </v-card-text>
        </v-card>

<!--        <v-card v-if='false'>-->
<!--          <v-card-media src="https://source.unsplash.com/random" height="200px">-->
<!--          </v-card-media>-->
<!--          <v-card-title primary-title>-->
<!--            <div>-->
<!--              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>-->
<!--              <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>-->
<!--            </div>-->
<!--          </v-card-title>-->
<!--          <v-card-actions>-->
<!--            <v-btn flat color="orange">Share</v-btn>-->
<!--            <v-btn flat color="orange">Explore</v-btn>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->

      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.v-alert {
  padding: 0 !important;
  background: white !important;
  justify-content: end !important;
}

.v-alert.bg-success {
  color: green !important;
}

.v-alert.bg-error {
  color: red !important;
}

</style>