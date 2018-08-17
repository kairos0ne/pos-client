<template>
    <el-row>
  <el-row>
      <el-col :span="24">
        <div class="grid-content">
        </div>
      </el-col>
    </el-row>
    <el-col :span="9" :offset="7">
      <div class="reg-block">
        <!--Form Start-->
        <el-form ref="form" :model="authDetails" label-width="160px" :rules="rules">
            <!--Email-->
            <el-form-item label="Email" prop="email">
              <el-input  v-model="authDetails.email" type="email"></el-input>
            </el-form-item>
            <!--Password-->
            <el-form-item label="Password" prop="password">
              <el-input v-model="authDetails.password" type="password"></el-input>
            </el-form-item>
            <!--Submit Button-->
            <el-button type="primary" @click="authenticate()">Login</el-button>
            <router-link to="/"><el-button type="secondary">Register</el-button></router-link>
        </el-form>
        <!--Form End-->
      </div>
    </el-col>
</el-row>
</template>
<script>
import {HTTP} from '../http-common.js'

export default {
  data () {
    return {
      authDetails: {
        email: '',
        password: ''
      },
      token: '',
      rules: {
        email: [
          { required: true, message: 'Please give a valid email address', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          { min: 5, max: 16, message: 'Length should be 5 to 16 characters', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
  },
  computed: {
    authtoken () {
      return this.$store.getters.getAuthToken
    }
  },
  created () {
  },
  methods: {
    authenticate () {
      HTTP.post('login.json', this.authDetails)
        .then(response => {
          let token = response.data.user.token
          let user = response.data.user.email
          let orgId = response.data.user.organisation_id
          sessionStorage.setItem('User', user)
          sessionStorage.setItem('Organisation ID', orgId)
          sessionStorage.setItem('Authorisation', token)
          this.$store.dispatch('setAuthToken', token)
          this.token = token
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.$router.push('/')
    }
  }
}
</script>
