<script>
import Layout from '../../layouts/main'
import PageHeader from '../../../components/page-header'
import pdf from 'vue-pdf'
/**
 * Starter component
 */
export default {
  page: {
    title: 'Curriculum Vitae'
  },
  data () {
    return {
      title: 'Curriculum Vitae'
    }
  },
  components: { Layout, pdf, PageHeader }

}
</script>

<template>
  <Layout>
    <PageHeader :title="title"/>
     <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
      <pdf src="./static/cv.pdf" :page=1></pdf>
      <pdf src="./static/cv.pdf" :page=2></pdf>
      <pdf src="./static/cv.pdf" :page=3></pdf>
          </div>
        </div>
      </div>
     </div>
  </Layout>
</template>
