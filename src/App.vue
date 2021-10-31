<template>
  <Navbar/>
  <router-view/>
  <Footer/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Film from './services/films'

export default {

  components: {
    Navbar,
    Footer
  },

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

<style>

</style>
