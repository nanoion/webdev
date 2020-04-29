<script>
import Layout from '../../layouts/main'
import PageHeader from '../../../components/page-header'
import axios from 'axios' // api calling library

/**
 * Find B,C Value page
 */
export default {
  components: { Layout, PageHeader },
  data () {
    return {
      title: 'Find B & C value',
      problem: 'A=21 , A+B=23 , A+C=-21',
      answer: ''
    }
  },
  mounted () {
    if (localStorage.bc) {
      this.answer = localStorage.bc
    }
  },
  watch: {
    answer (answered) {
      localStorage.bc = answered
    }
  },
  methods: {
    solve () {
      axios
        .get(
          'http://localhost:9000/api/bc?input=' +
            encodeURIComponent(JSON.stringify(this.problem))
        )
        .then(res => {
          this.answer = res.data
        })
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
            <b-form-group
              id="input-group-problem"
              label="Problem:"
              label-for="input-problem"
            >
              <b-form-input
                readonly
                id="input-problem"
                v-model="problem"
                type="text"
                required
                placeholder="Arithmetic Sequence"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-answer"
              label="Answer:"
              label-for="input-answer"
            >
              <b-form-input
                readonly
                id="input-answer"
                v-model="answer"
                type="text"
                placeholder="Answer"
              ></b-form-input>
            </b-form-group>
            <b-button @click="solve">Solve</b-button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
