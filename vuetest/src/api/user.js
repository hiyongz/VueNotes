import axios from './http.js'

const user = {
  signIn (params) {
    console.log('123')
    console.log(params)
    return axios.post('/user/login', params)
  },
  signUp (params) {
    return axios.post('/user/register', params)
  }
}
export default user
