import axios from 'axios'
axios.defaults.baseURL = 'https://www.course-api.com/jobs/api/v1'

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem('user')

  if (user) {
    const { token } = JSON.parse(localStorage.getItem('user'))
    req.headers.authorization = `Bearer ${token}`
    return req
  }
  return req
})
