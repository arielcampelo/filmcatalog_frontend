<template>
<div class='container-fluid'>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
          <p>{{this.message}}</p>
          <br>
          <div class="alert alert-warning" role="alert" id="warning" v-show="showalert">{{warning}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Film from '../services/films'

export default {
  name: 'Logout',
  data () {
    return {
      message: '',
      showalert: false,
      warning: ''
    }
  },
  created () {
    localStorage.clear()
    this.send_logout()
  },
  methods: {
    send_logout () {
      Film.logout().then(res => {
        this.message = res.data.message
        this.$router.push('/login')
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
