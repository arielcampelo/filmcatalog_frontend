<template>
  <div class='container-fluid'>
  <div class="row">
    <div class="col-sm-10 offset-sm-1">
      <!-- Title -->
      <br><h2>Add cast</h2>
      <!--Form -->
      <form action='#' method='pos' @submit.prevent="send_form()">
         <label for="title" class="form-label">Name</label>
        <input type="text" v-model="form.name" class="form-control" id="name">
        <button type="submit" class="btn btn-primary" id="submit">Add</button>
        <button type="button" class="btn btn-primary" id="cancel" @click="back2films()">Done</button>
      </form>
        <br>
      <div class="alert alert-warning" role="alert" id="warning" v-show="showalert">{{warning}}</div>
      <div class="spinner-border text-primary" role="status" id="spin" v-show="showspinner" ></div>
      <!--End Form -->
      <hr>
      <!-- Table -->
       <table class="table" id="actors">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Actor</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for ="actor of actors" :key="actor.id">
            <th scope="row">{{actor.id}}</th>
            <td>{{actor.name}}</td>
            <td> <a href="#" @click="removeactor(actor.id)"><img class="myicon" src='/images/remove.png'>  </a> </td>
          </tr>
        </tbody>
      </table>
      <!-- End Table -->

    </div>
  </div>
  </div>
</template>

<script>
import Film from '../services/films'

export default {

  props: {
    fid: { Number }
  },
  data () {
    return {
      title: '',
      actors: {},
      form: {
        film_id: 0,
        name: ''
      },
      selected: true,
      warning: '',
      showalert: false,
      showspinner: false
    }
  },
  created () {
    this.form.film_id = this.$route.params.fid
    this.load_cast()
  },
  methods: {
    load_cast () {
      Film.getactorsbyfilm(this.$route.params.fid).then(res => {
        this.actors = res.data.data
        console.log(res.data.data)
      })
    },
    send_form () {
      if (this.check_form() === true) {
        this.showspinner = true
        Film.addactor(this.form).then(res => {
          this.load_cast()
          this.clear_form()
        }).catch((error) => {
          this.showalert = true
          this.warning = error
        }).finally(() => {
          this.showspinner = false
        })
      }
    },
    clear_form () {
      this.form.name = ''
    },
    check_form () {
      if (this.form.name === '') {
        this.show_warning('Name is empty. You must fill in all of the fields.')
        return false
      }
      return true
    },
    show_warning (message) {
      this.warning = message
      this.showalert = true
    },
    removeactor (id) {
      if (confirm('Do you really want to delete the actor?')) {
        Film.deleteactor(id).then(res => {
          this.load_cast()
        })
      }
    },
    back2films () {
      this.$router.push('/films')
    }
  }
}
</script>

<style scoped>
  .myicon{
    width: 16px;
    height: 16px;
  }
  .myicon:hover{
   background-color:dimgray;
  }
  .form-control#name{
    max-width: 500px;
  }
  .btn#submit{
  margin-top:15px;
  }
  .btn#reset{
    margin-top:15px;
    margin-left:10px;
  }
  .btn#cancel{
    margin-top:15px;
    margin-left:10px;
  }
  .alert#warning{
    margin-top:20px;
    max-width: 500px;
  }
  .spinner-border#spin{
    margin-top:10px;
    padding-top: 10px;
    margin-left: 50px;
  }
  .table#actors{
    max-width: 800px;
  }
</style>
