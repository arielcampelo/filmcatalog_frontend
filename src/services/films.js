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
  }
}
