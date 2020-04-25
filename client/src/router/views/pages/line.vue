<script>
import Layout from '../../layouts/main'
import PageHeader from '../../../components/page-header'
/**
 * Starter component
 */
export default {
  components: { Layout, PageHeader },
  data () {
    return {
      title: 'LINE - Reply Timeout',
      alerts: []
    }
  },
  sockets: {
    connect: () => {
      console.log('socket connected')
    },
    onmessage: data => {
      console.log(data)
      this.alerts.push(data)
    }
  }
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <p class="sub-header">
              The messages are not replied within 10 seconds.
            </p>

            <div class="pt-4 px-3">
              <b-toast v-for="alert in alerts" v-bind:key="alert.token" visible static no-auto-hide>
                <div slot="toast-title">
                  <strong class="mr-auto">Reply Timeout</strong>
                  <small>11 min ago</small>
                </div>
                {{alert.msg}}
              </b-toast>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
