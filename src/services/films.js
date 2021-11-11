import { http } from './config'

export default {
  login: async (form) => {
    return http.post('login/', form)
  },
  logout: async () => {
    return http.post('logout/')
  },
  get_user: async () => {
    return http.get('user/')
  },
  add_user: async (form) => {
    return http.post('register', form)
  },
  listfilms: async () => {
    return http.get('filmswithcast/')
  },
  gotopage: async (page) => {
    return http.get('filmswithcast/?page=' + page)
  },
  deletefilm: async (id) => {
    return http.delete('film/' + id)
  },
  deleteactor: async (id) => {
    return http.delete('actor/' + id)
  },
  addfilm: async (form) => {
    return http.post('film', form)
  },
  addactor: async (form) => {
    return http.post('actor', form)
  },
  getactorsbyfilm: async (id) => {
    return http.get('filmactors/' + id)
  },
  getfilm: async (id) => {
    return http.get('film/' + id)
  },
  updatefilm: async (id, form) => {
    return http.put('film/' + id, form)
  }
}
