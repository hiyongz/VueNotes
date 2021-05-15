import axios from 'axios'
var instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: 'http://stuq.ceshiren.com:8089/'
})

instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.common.token = localStorage.getItem('token')
  }
  return config
})

// this.$api.user.signIn(postData.then(res=>{
//     console.log(res)
//     localStorage.setItem('token', res.data.data.token)
//     localStorage.setItem('username', this.username)
//     this.$router.push( {name: 'Jenkins'})
// })

export default instance
