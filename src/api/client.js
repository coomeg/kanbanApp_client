import axios from 'axios'

export default axios.create({
  withCredentials: true,
  xsrfHeaderName: 'X-CSRF-Token',
})
