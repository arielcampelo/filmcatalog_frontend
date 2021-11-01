import { http } from './config'

export default {
  listfilms: () => {
    return http.get('filmswithcast')
  },
  gotopage: (page) => {
    return http.get('filmswithcast/?page=' + page)
  },
  deletefilm: (id) => {
    return http.delete('film/' + id)
  }
}
