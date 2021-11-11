<template>
<div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="text-center" >
                                    <h1 class="h4 text-gray-900 mb-4" id="welcome">Login</h1>
                                </div>
                                <form class="user" action='#' method='pos' @submit.prevent="send_form()">
                                    <div class="form-group">
                                        <input type="email" class="form-control form-control-user"
                                            id="email" aria-describedby="emailHelp"
                                            placeholder="Type your e-mail addresss" v-model="form.email" >
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control form-control-user"
                                            id="password" placeholder="Password" v-model="form.password">
                                    </div>
                                        <div class="form-group">
                                        <div class="custom-control custom-checkbox small">
                                            <input type="checkbox" class="custom-control-input" id="customCheck">
                                            <label class="custom-control-label" for="customCheck">Remember</label>
                                        </div>
                                    </div>
                                    <a href="#" class="btn btn-primary btn-user btn-block" id = "loginButton" @click="send_form()">
                                    Login
                                    </a>
                                </form>
                                <div class="alert alert-warning" role="alert" id="warning" v-show="showalert">{{warning}}</div>
                                <hr>
                                <div align="center">
                                  <div class="spinner-border text-primary"  role="status" id="spin" v-show="showspinner" ></div>
                                </div>
                                <div class="text-center">
                                    <a class="small" href="#" @click="this.$router.push('/register')">Sign up</a>
                                </div>
                                <!-- Use this div only if Login with Google And Facebook are disabled  -->
                                <div style="margin-top:100px;"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Film from '../services/films'

export default {
  name: 'Login',
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

  },
  methods: {
    send_form () {
      if (this.check_form() === true) {
        this.showspinner = true
        Film.login(this.form).then(res => {
          localStorage.setItem('token', res.data.token)
          this.$router.push('/films')
          console.log(res)
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
@import url('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
@import '../assets/login/css/sb-admin-2.min.css';
@import '../assets/login/css/custom.css';
@import '../assets/login/vendor/fontawesome-free/css/all.min.css';
.alert#warning{
  margin-top:20px;
  max-width: 500px;
}
</style>
