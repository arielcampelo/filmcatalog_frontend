import axios from 'axios'

axios.defaults.headers.common.authorization = 'Bearer ' + localStorage.getItem('token')
export const http = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
})
