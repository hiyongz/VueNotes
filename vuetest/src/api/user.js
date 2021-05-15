import axios from './http.js'

const user = {
  signIn (params) {
    return axios.post('/user/login', params)
  },
  signUp (params) {
    return axios.post('/user/register', params)
  }
}
export default user
