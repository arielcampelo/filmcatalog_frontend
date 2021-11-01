<template>
  <div class='container-fluid'>
  <div class="row">
    <div class="col-sm-10 offset-sm-1">
      <!-- Title -->
      <br><h2>Add cast</h2>
      <!--Form -->
       <label for="title" class="form-label">Name</label>
        <input type="text" v-model="form.name" class="form-control" id="name">
      <!--End Form -->

    </div>
  </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      title: '',
      form: {
        film_id: '',
        name: ''
      },
      selected: true,
      warning: '',
      showalert: false,
      showspinner: false
    }
  },
  created () {
    this.selected = 2021
  },
  methods: {
    send_form () {
      if (this.check_form() === true) {
        this.showspinner = true
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
    back2films () {
      this.$router.push('films')
    }
  }
}
</script>

<style scoped>
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
</style>
