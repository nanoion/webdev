<script>
export default {
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<template>
  <!-- Topbar Start -->
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">DOSCG</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          ><router-link tag="a" to="/" class="nav-link"
            >Home</router-link
          ></b-nav-item
        >
        <b-nav-item
          ><router-link tag="a" to="/xyz" class="nav-link"
            >FindXYZ</router-link
          ></b-nav-item
        >
        <b-nav-item
          ><router-link tag="a" to="/bc" class="nav-link"
            >FindBC</router-link
          ></b-nav-item
        >
        <b-nav-item
          ><router-link tag="a" to="/map" class="nav-link"
            >Map</router-link
          ></b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- end Topbar -->
</template>
