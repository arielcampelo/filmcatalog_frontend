<template>
<div class='container-fluid'>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <h1>Logout</h1>
          <p>{{this.message}}</p>
          <br>
          <div class="alert alert-warning" role="alert" id="warning" v-show="showalert">{{warning}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Film from '../services/films'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      message: '',
      showalert: false,
      warning: ''
    }
  },
  created () {
    Cookie.remove('jwt')
    this.send_logout()
  },
  methods: {
    send_logout () {
      Film.logout().then(res => {
        this.message = res.data.message
        // Cookie.remove('_myapp_token')
        this.$router.push('/')
        // console.log(res)
      }).catch((error) => {
        this.showalert = true
        this.warning = error
      }).finally(() => {
        //
      })
    }
  }
}
</script>
