<script>
/**
 * A page title component - Renders the title with breadcrumbs
 */
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div class="row page-title">
    <div class="col-md-12">
      <h4 class="mb-1 mt-0">{{ title }}</h4>
    </div>
  </div>
</template>
<style lang="scss">
.page-title-topbar {
  margin: 0;
  font-size: 20px;
}

.page-title {
  padding: 20px 0;

  h4 {
    font-size: 19px;
  }
}
</style>
