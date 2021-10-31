<template>
  <div class="films">
    <h1>This the film page</h1>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Year</th>
      <th scope="col">Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for ="film of films" :key="film.id">
      <th scope="row">{{film.id}}</th>
      <td>{{film.title}}</td>
      <td>{{film.author}}</td>
      <td>{{film.year}}</td>
      <td>{{film.grade}}</td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
import Film from '../services/films'

export default {
  data () {
    return {
      films: []
    }
  },

  mounted () {
    Film.listall().then(response => {
      console.log(response.data)
      this.films = response.data
    })
  }
}
</script>
