<template>
  <div id="map" style="min-height: 400px"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
export default {
  props: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  head() {
    return {
      link: [
        {
          href: 'https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css',
          rel: 'stylesheet',
        },
      ],
    }
  },
  mounted() {
    if (this.$config.MAPBOX_TOKEN) {
      // TO MAKE THE MAP APPEAR YOU MUST
      // ADD YOUR ACCESS TOKEN FROM
      // https://account.mapbox.com
      mapboxgl.accessToken = this.$config.MAPBOX_TOKEN
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [this.lng, this.lat], // starting position [lng, lat]
        zoom: 13, // starting zoom
      })

      // const marker =
      new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(map)
    }
  },
}
</script>
