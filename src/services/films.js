import { http } from './config'

export default {
  listall: () => {
    return http.get('film/1')
  }
}
