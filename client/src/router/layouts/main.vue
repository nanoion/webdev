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
    <Topbar />

    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page">
      <div class="content">
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
