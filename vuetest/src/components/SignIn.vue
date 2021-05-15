<template>
    <div class="login-form">
        <h1>登陆</h1>
        <v-text-field v-model="username" label="用户名"></v-text-field>
        <v-text-field v-model="password" label="密码" type="password"></v-text-field>
        <v-btn rounded color="primary" dark @click="login()">登陆</v-btn>
        <v-btn rounded color="primary" dark text @click="SignUp()">注册</v-btn>
    </div>
</template>

<script>
export default {
  methods: {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    SignUp () {
      console.log('注册')
      this.$router.push({ name: 'SignUp' })
    },
    login () {
      const postData = {
        userName: this.username,
        password: this.password
      }
      this.$api.user.signIn(postData).then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('username', this.username)
        // 跳转到主页
        this.$router.push({ name: 'Case' })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-form {
    width: 500px;
    margin: 0 auto;
    text-align: center;
}

</style>
