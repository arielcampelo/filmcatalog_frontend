<template>
<div class='container-fluid'>
  <!-- Title -->
    <h1>List of all films</h1>
  <!-- Table -->
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Year</th>
      <th scope="col">Grade</th>
      <th scope="col">Cast</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for ="film of films" :key="film.id">
      <th scope="row">{{film.id}}</th>
      <td>{{film.title}}</td>
      <td>{{film.author}}</td>
      <td>{{film.year}}</td>
      <td>{{film.grade}}</td>
      <td>
        <ul v-for= "actor of film.cast" :key="actor.id" >
            <li>{{actor.name}}</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<!-- End Table -->
<!-- Pagination -->
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" @click="previouspage()">Previous</a></li>
     <li class="page-item" v-if="films[0].meta.last_page >= 1"><a class="page-link" href="#"  @click="showpage(1)">1</a></li>
     <li class="page-item" v-if="films[0].meta.last_page >= 2"><a class="page-link" href="#"  @click="showpage(2)">2</a></li>
     <li class="page-item" v-if="films[0].meta.last_page >= 3"><a class="page-link" href="#"  @click="showpage(3)">3</a></li>
     <li class="page-item" v-if="films[0].meta.last_page >= 4"><a class="page-link" href="#"  @click="showpage(4)">4</a></li>
     <li class="page-item" v-if="films[0].meta.last_page >= 5"><a class="page-link" href="#"  @click="showpage(5)">5</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="nextpage()" >Next</a></li>
  </ul>
</nav>
<!-- End Pagination -->
<!-- Modal -->
<div v-show="true">
<div class="modal" tabindex="-1" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
<!-- End Modal -->

  </div>
</template>

<script>
import Film from '../services/films'

export default {
  name: 'Film',
  data () {
    return {
      films: {}
    }
  },
  created () {
    Film.listfilms().then(res => {
      this.films = res.data.data
      console.log(res.data.data)
    })
  },
  methods: {
    nextpage () {
      if (this.films[0].meta.next_page <= this.films[0].meta.last_page) {
        Film.gotopage(this.films[0].meta.next_page).then(res => {
          this.films = res.data.data
        })
      }
    },
    previouspage () {
      if (this.films[0].meta.previous_page > 0) {
        Film.gotopage(this.films[0].meta.previous_page).then(res => {
          this.films = res.data.data
        })
      }
    },
    modalToggle () {
      const body = document.querySelector('body')
      this.active = !this.active
      this.active ? body.classList.add('modal-open') : body.classList.remove('modal-open')
    },
    showpage (n) {
      Film.gotopage(n).then(res => {
        this.films = res.data.data
      })
    }
  }
}
</script>
