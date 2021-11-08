import Cookie from 'js-cookie'

export default {
  auth (to, from, next) {
    const token = Cookie.get('jwt')
    // Falta verificar a validade do token
    // Não é recomendado deixar desse jeito
    if (!token) {
      next('/login')
    }
    console.log(token)
    next()
  }
}
