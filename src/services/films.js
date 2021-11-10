import { http } from './config'

export default {
  login: (form) => {
    return http.post('login/', form)
  },
  logout: () => {
    return http.post('logout/')
  },
  get_user: () => {
    return http.get('user/')
  },
  listfilms: () => {
    return http.get('filmswithcast/')
  },
  gotopage: (page) => {
    return http.get('filmswithcast/?page=' + page)
  },
  deletefilm: (id) => {
    return http.delete('film/' + id)
  },
  deleteactor: (id) => {
    return http.delete('actor/' + id)
  },
  addfilm: (form) => {
    return http.post('film', form)
  },
  addactor: (form) => {
    return http.post('actor', form)
  },
  getactorsbyfilm: (id) => {
    return http.get('filmactors/' + id)
  },
  getfilm: (id) => {
    return http.get('film/' + id)
  },
  updatefilm: (id, form) => {
    return http.put('film/' + id, form)
  }
}
