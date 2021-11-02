import { http } from './config'

export default {
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
  }
}
