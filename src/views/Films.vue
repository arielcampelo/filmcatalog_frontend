<template>
<div class='container-fluid' v-cloak>
    <!-- Title -->
    <br>
    <h2>Films</h2>
    <!-- Table -->
    <p>
        <br><a class="btn btn-primary" href="/new" role="button">+ Add new film</a>
    </p>
    <hr>
    <table class="table" id="films">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Year</th>
                <th scope="col">Grade</th>
                <th scope="col">Cast</th>
                <th scope="col">-</th>
                <th scope="col">-</th>
                <th scope="col">-</th>
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
                        <li>{{actor.name}} </li>
                    </ul>
                </td>
                <td> <a href="#" @click="gotoaddactor(film.id)"><img class="myicon" src='images/actor_add.png'>  </a> </td>
                <td> <a href="#" @click="gotoedit(film.id)"><img class="myicon" src='images/edit.png'></a></td>
                <td> <a href="#" @click="removefilm(film.id)"><img class="myicon" src='images/remove.png'>  </a> </td>
            </tr>
        </tbody>
    </table>
    <!-- End Table -->
    <!-- Pagination -->
    <p></p>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#" @click="previouspage()">Previous</a></li>
            <li class="page-item" v-if="films[0].meta.last_page >= 1"><a class="page-link" href="#"  @click="showpage(1)">1</a></li>
            <li class="page-item" v-if="films[0].meta.last_page >= 2"><a class="page-link" href="#"  @click="showpage(2)">2</a></li>
            <li class="page-item" v-if="films[0].meta.last_page >= 3"><a class="page-link" href="#"  @click="showpage(3)">3</a></li>
            <li class="page-item" v-if="films[0].meta.last_page >= 4"><a class="page-link" href="#"  @click="showpage(4)">4</a></li>
            <li class="page-item" v-if="films[0].meta.last_page >= 5"><a class="page-link" href="#"  @click="showpage(5)">5</a></li>
            <li class="page-item"><a class="page-link" href="#" @click="nextpage()" >Next</a></li>
            <!-- <li class="page-item"><a class="page-link" href="#">{{films[0].meta.current_page + "/" + films[0].meta.last_page}}</a></li> -->
        </ul>
    </nav>
    <!-- End Pagination -->
</div>
</template>

<script>
import Film from '../services/films'

export default {
  name: 'Films',
  data () {
    return {
      films: {},
      var_mdl_param: 0,
      var_mdl_func: 1
    }
  },
  async created () {
    this.listfilms()
  },
  async mounted () {
    this.listfilms()
  },
  methods: {
    async listfilms () {
      Film.listfilms().then(res => {
        this.films = res.data.data
      })
    },
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
    removefilm (id) {
      if (confirm('Do you really want to delete the film?')) {
        Film.deletefilm(id).then(res => {
          this.listfilms()
        })
      }
    },
    removeactor (id) {
      if (confirm('Do you really want to delete the actor?')) {
        Film.deleteactor(id).then(res => {
          this.showpage(this.films[0].meta.current_page)
        })
      }
    },
    gotoaddactor (id) {
      this.$router.push({ name: 'Addcast', params: { fid: id } })
    },
    gotoedit (id) {
      this.$router.push({ name: 'Edit', params: { fid: id } })
    },
    showpage (n) {
      Film.gotopage(n).then(res => {
        this.films = res.data.data
      })
    }
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}
  .myicon{
    width: 16px;
    height: 16px;
  }
  .myicon:hover{
   background-color:dimgray;
  }
  .btn#addcast{
    margin-left:10px;
  }
  .table#films{
    max-width: 1200px;
  }
</style>
