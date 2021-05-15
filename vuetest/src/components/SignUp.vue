<template>
    <div class="signup-form">
        <h1>注册</h1>
        <v-text-field v-model="username" label="用户名"></v-text-field>
        <v-text-field v-model="password" label="密码" type="password"></v-text-field>
        <v-text-field v-model="email" label="邮箱"></v-text-field>
        <v-btn rounded color="primary" dark @click="register()">注册</v-btn>
        <v-btn rounded color="primary" dark text @click="SignIn()">去登陆</v-btn>
    </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    SignIn () {
      console.log('登陆')
      this.$router.push({ name: 'SignIn' })
    },
    register () {
      const postData = {
        userName: this.username,
        password: this.password,
        email: this.email
      }
      this.$api.user.signUp(postData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.signup-form {
    width: 500px;
    margin: 0 auto;
    text-align: center;
}

</style>
