<script>
import Layout from '../../layouts/main'
import PageHeader from '../../../components/page-header'
import axios from 'axios'
/**
 * Starter component
 */
export default {
  page: {
    title: 'Google Map',
    meta: [{ name: 'description' }]
  },
  components: { Layout, PageHeader },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  data () {
    return {
      title: 'Find Route',
      origin: '',
      destination: '',
      origin_auto: [],
      destination_auto: [],
      map: null
    }
  },
  mounted () {
    if (localStorage.map_origin) this.origin = localStorage.map_origin
    if (localStorage.map_destination) { this.destination = localStorage.map_destination }
    if (localStorage.map_map) this.map = localStorage.map_map
  },
  watch: {
    origin (value) {
      localStorage.map_origin = value
    },
    destination (value) {
      localStorage.map_destination = value
    },
    map (value) {
      localStorage.map_map = value
    }
  },
  methods: {
    handleOriginAuto (e) {
      axios
        .get('http://localhost:9000/api/auto?input=' + e.srcElement.value)
        .then(res => {
          this.origin_auto = res.data.predictions
        })
    },
    handleDestinationAuto (e) {
      axios
        .get('http://localhost:9000/api/auto?input=' + e.srcElement.value)
        .then(res => {
          this.destination_auto = res.data.predictions
        })
    },
    navigate () {
      axios
        .get(
          'http://localhost:9000/api/nav?origin=' +
            this.origin +
            '&destination=' +
            this.destination
        )
        .then(res => (this.map = res.data))
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
            <div class="row">
              <div class="col">
                <b-form-group label="Origin" label-for="input-origin">
                  <b-form-input
                    id="origin"
                    type="text"
                    placeholder="Origin"
                    v-model="origin"
                    @keyup="handleOriginAuto"
                    list="origin-list"
                  ></b-form-input>
                  <datalist id="origin-list">
                    <option v-for="origin in origin_auto" v-bind:key="origin.id"
                      >{{ origin.description }}
                    </option>
                  </datalist>
                </b-form-group>
              </div>
              <div class="col">
                <b-form-group label="Destination" label-for="input-dest">
                  <b-form-input
                    id="destination"
                    type="text"
                    placeholder="Destination"
                    v-model="destination"
                    @keyup="handleDestinationAuto"
                    list="destination-list"
                  ></b-form-input>
                  <datalist id="destination-list">
                    <option
                      v-for="destination in destination_auto"
                      v-bind:key="destination.id"
                      >{{ destination.description }}
                    </option>
                  </datalist>
                </b-form-group>
              </div>
            </div>
            <b-button @click="navigate">Directions</b-button>
            <div v-if="map" class="row map-canvas">
              <img v-bind:src="'data:image/png;base64,' + this.map" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
.map-canvas {
  margin-top: 20px;
  justify-content: center;
}
</style>
