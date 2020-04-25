<script>
import Layout from '../../layouts/main'
import PageHeader from '../../../components/page-header'
import axios from 'axios'
/**
 * Starter component
 */
export default {
  page: {
    title: 'Starter',
    meta: [{ name: 'description' }]
  },
  components: { Layout, PageHeader },
  data () {
    return {
      problem: 'X,Y,5,9,15,23,Z',
      answer: '',
      title: 'Find XYZ value'
    }
  },
  mounted () {
    if (localStorage.xyz) {
      this.answer = localStorage.xyz
    }
  },
  watch: {
    answer (answered) {
      localStorage.xyz = answered
    }
  },
  methods: {
    solve () {
      axios
        .get('http://localhost:9000/api/xyz?input=' + this.problem)
        .then(res => { this.answer = res.data.value })
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
              <b-form-input readonly
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
              <b-form-input readonly
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
