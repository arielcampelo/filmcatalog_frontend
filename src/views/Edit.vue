<template>
  <div class='container-fluid'>

  <div class="row">
    <div class="col-sm-10 offset-sm-1">
      <!-- Title -->
      <br><h2>Edit film</h2>
      <!-- Form -->
      <form action='#' method='pos' @submit.prevent="send_form()">
        <label for="title" class="form-label">Title</label>
        <input type="text" v-model="form.title" class="form-control" id="title">

        <label for="author" class="form-label">Author</label>
        <input type="text" v-model="form.author" class="form-control" id="author">

        <label for="year" class="form-label">Year</label>
        <select class="form-select" id="year" v-model="form.year">
          <option v-for="i in 52" :key="2022-i" :selected="selected" >{{2022-i}}</option>
        </select>

        <label for="grade" class="form-label">Grade</label>
        <input type="text" v-model="form.grade" class="form-control" id="grade">

      <button type="submit" class="btn btn-primary" id="submit">Update</button>
      <button type="button" class="btn btn-primary" id="reset" @click="clear_form()">Reset</button>
      <button type="button" class="btn btn-primary" id="cancel" @click="back2films()">Cancel</button>
      <br>
      <div class="alert alert-warning" role="alert" id="warning" v-show="showalert">{{warning}}</div>
      <div class="spinner-border text-primary" role="status" id="spin" v-show="showspinner" ></div>
    </form>
    <!-- End Form -->
    <hr>
  <!-- Edit cast component -->
  <EditCast/>
  </div>
</div>

  </div>
</template>

<script>
import Film from '../services/films'
import EditCast from '../components/EditCast.vue'

export default {
  name: 'Edit',
  components: {
    EditCast
  },
  props: {
    fid: { Number }
  },
  data () {
    return {
      film_id: 0,
      form: {
        title: '',
        author: '',
        year: 2021,
        grade: ''
      },
      selected: true,
      warning: '',
      showalert: false,
      showspinner: false
    }
  },
  created () {
    this.film_id = this.$route.params.fid
    this.fill_form()
  },
  methods: {
    fill_form () {
      Film.getfilm(this.$route.params.fid).then(res => {
        this.form.title = res.data.data.title
        this.form.author = res.data.data.author
        this.form.year = res.data.data.year
        this.form.grade = res.data.data.grade
      })
    },
    send_form () {
      if (this.check_form() === true) {
        this.showspinner = true
        Film.updatefilm(this.film_id, this.form).then(res => {
          this.$router.push('/films')
        }).catch((error) => {
          this.showalert = true
          this.warning = error
        }).finally(() => {
          this.showspinner = false
        })
      }
    },
    clear_form () {
      this.form.title = ''
      this.form.author = ''
      this.form.year = '2021'
      this.form.grade = ''
    },
    check_form () {
      if (this.form.title === '') {
        this.show_warning('Title is empty. You must fill in all of the fields.')
        return false
      }
      if (this.form.author === '') {
        this.show_warning('Author is empty. You must fill in all of the fields.')
        return false
      }
      if (this.form.grade === '') {
        this.show_warning('Grade is empty. You must fill in all of the fields.')
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
  .form-control#title{
    max-width: 500px;
  }
  .form-control#author{
    max-width: 350px;
  }
  .form-select#year{
    max-width: 100px;
    margin-bottom: 10px ;
  }
  .form-control#grade{
    max-width: 80px;
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
</style>
