<script>
import Topbar from '../../components/topbar'
import Footer from '../../components/footer'

export default {
  components: { Topbar, Footer },
  computed: {},
  created: () => {},
  methods: {}
}
</script>

<template>
  <div id="wrapper">
    <!-- Top Bar -->
    <Topbar />

    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <!-- Body -->
          <slot />
        </div>
      </div>
      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>
