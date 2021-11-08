<template>
  <div class='container-fluid'>
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <!-- Title -->
        <br><h2>Login</h2>
        <!-- Form -->
        <form action='#' method='pos' @submit.prevent="send_form()">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label" >Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" style="max-width:350px;" v-model="form.email">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" style="max-width:350px;" v-model="form.password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="button" class="btn btn-primary" id="clear" @click="clear_form()">Clear</button>
        </form>
        <!-- End Form -->
        <div class="alert alert-warning" role="alert" id="warning" v-show="showalert">{{warning}}</div>
        <div class="spinner-border text-primary" role="status" id="spin" v-show="showspinner" ></div>

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
      films: {},
      form: {
        email: 'jlopes@alumni.usp.br',
        password: '123'
      },
      selected: true,
      warning: '',
      showalert: false,
      showspinner: false
    }
  },
  created () {
    // Cookie.remove('jwt')
  },
  methods: {
    send_form () {
      if (this.check_form() === true) {
        this.showspinner = true
        Film.login(this.form).then(res => {
          Cookie.set('jwt', res.data.token)
          this.$router.push('/films')
          this.showalert = true
          this.warning = res.data.message + '- Token: ' + res.data.token
          // console.log(res)
        }).catch((error) => {
          this.showalert = true
          this.warning = error
        }).finally(() => {
          this.showspinner = false
        })
      }
    },
    clear_form () {
      this.form.email = ''
      this.form.password = ''
    },
    check_form () {
      if (this.form.email === '') {
        this.show_warning('E-mail is empty. You must fill in all of the fields.')
        return false
      }
      if (this.form.password === '') {
        this.show_warning('Password is empty. You must fill in all of the fields.')
        return false
      }
      return true
    },
    show_warning (message) {
      this.warning = message
      this.showalert = true
    },
    back2films () {
      this.$router.push('/films')
    }
  }
}
</script>
<style scoped>
.btn#clear{
    margin-left:10px;
  }
  .alert#warning{
    margin-top:20px;
    max-width: 500px;
  }
</style>
