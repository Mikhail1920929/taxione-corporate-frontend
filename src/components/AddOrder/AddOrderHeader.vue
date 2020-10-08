<template>
  <div class="orderHeader">
    <div class="header">
      <div class="row">
        <div class="col-12 flex items-center justify-between">
          <div class="header__title">Заказать такси</div>
          <div class="header__back flex items-center justify-center" @click="$emit('back')">
            <svg viewBox="0 0 448 448" fill="#efa5b8" width="18px"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="places flex justify-between items-center">
      <div class="places__steps">
        <InputSteps
          :isTo="to.step"
          :isFrom="from.step"
        />
      </div>
      <div class="places__inputs">
        <div class="places__input" style="margin-bottom: 15px;">
          Откуда:
          <input
            type="text"
            v-model="from.text"
            @focus="from.step = true, to.step = false"
            @keyup.enter="searchUser"
            @input="searchByInputs(from.text, 'from')"
          >
        </div>
        <div class="places__input">
          Куда:
          <input
            type="text"
            v-model="to.text"
            @focus="to.step = true, from.step = false"
            @keyup.enter="searchUser"
            @input="searchByInputs(to.text, 'to')"
          >
        </div>
      </div>
    </div>
    <div class="employee">
      <input
        type="text"
        v-model="user"
        placeholder="Выберите сотрудника"
      >
    </div>
    <div class="orderDate flex items-center justify-between">
      <div class="orderDate__date">
        <input
          type="text"
          v-model="user"
          placeholder="Дата"
        >
      </div>
      <div class="orderDate__time">
        <input
          type="text"
          v-model="user"
          placeholder="Время"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddOrderHEader',
  data () {
    return {
      from: {
        step: false,
        text: null
      },
      to: {
        step: false,
        text: null
      },
      user: null
    }
  },
  methods: {
    initializeMap () {
      if (this.rideStatus) this.countinueRide({ provider: this.rideStatus.provider, uuid: this.rideStatus.uuid })
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.watcherId = navigator.geolocation.watchPosition(this.watchUserLocation)
      this.geoUpdate()
      const config = {
        center: { lat: 55.75222, lng: 37.61556 },
        zoom: 10,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false
      }
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(
        mapContainer, config
      )
      this.directionsService = new this.google.maps.DirectionsService()
      this.directionsRenderer = new this.google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
        InfoWindowOptions: {
          disableAutoPan: true
        }
      })
      this.map.addListener('dragstart', async (e) => {
        this.activePoint = true
        if (this.status && this.status.ride.ride_status_name === 'transporting') this.carIsTracking = false
      })
      this.map.addListener('dragend', async (e) => {
        this.activePoint = false
        if (this.markerSearchingTimout) {
          clearTimeout(this.markerSearchingTimout)
          this.markerSearchingTimout = setTimeout(() => {
            this.markerSearchingTimout = 0
            this.loadPlaceByPicker()
          }, 1000)
        }

        this.loadPlaceByPicker()
      })
      this.autocomplete = new this.google.maps.places.AutocompleteService()
      this.service = new this.google.maps.places.PlacesService(this.map)
      this.geocoder = new this.google.maps.Geocoder()
      this.calcRouteIfCountinue()
      this.calcRouteIfOtherPage()
    },

  },
  components: { InputSteps }
}
</script>

<style scoped lang="scss">

</style>
