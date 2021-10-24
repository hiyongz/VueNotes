import axios from './http'

const cases = {
  getList (params) {
    return axios.get('/testCase/list', params)
  },
  createCaseByText (params) {
    return axios.post('/testCase/text', params)
  },
  createCaseByFile (params) {
    return axios.post('/testCase/file', {
      methods: 'post',
      data: params,
      headers: { 'Content-type': 'multipart/form-data' }
    })
  }
}

export default cases
