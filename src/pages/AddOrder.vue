<template>
  <q-page class="row">
    <div class="flex column justify-between leftColumn">
      <div class="order flex column justify-between" >
        <div class="div">
          <div class="header">
            <div class="row">
              <div class="col-12 flex items-center justify-between">
                <div class="header__title">Заказать такси</div>
                <div class="header__back flex items-center justify-center" @click="$router.push({ name: 'orders' })">
                  <svg viewBox="0 0 448 448" fill="#efa5b8" width="18px"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div class="employee">
            <div class="employee__input">
              <q-icon color="accent">
                <svg x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"/><path d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195 C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15 C481,444.833,460.745,395.539,423.966,358.195z"/></svg>
              </q-icon>
              <input type="text"
                 v-model="employeeSearch"
                 :placeholder="employeePlaceholder"
                 @input="searchEmployee()"
              >
              <div class="employee__result flex column" v-if="employee.name && employee.phone">
                <div class="employee__result__name">{{employee.name}}</div>
                <div class="employee__result__phone">{{employee.phone}}</div>
              </div>
              <div class="clear" v-if="employeeSearch.length > 0 || employee.name" @click="clearEmployee()">
                <svg viewBox="0 0 448 448" fill="#efa5b8" width="12px"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg>
              </div>
            </div>
            <div class="employee__results" v-if="employees.length > 0">
              <q-list v-if="employees.length > 0">
                <q-item
                class="listItem"
                  v-for="employee in employees"
                  :key="employee.id"
                  @click="chooseEmployee(employee)"
                  clickable
                  v-ripple>
                  <q-item-section>
                    <q-item-label>{{employee.name}}</q-item-label>
                    <q-item-label caption>{{employee.phone}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <p class="employee__warning" :class="{ 'employee__warning_shown' : showEmployeeWarning}">*Для расчета стоимости заказа необходимо выбрать сотрудника</p>
          </div>

          <div class="places flex justify-between items-center">
            <div class="places__inputs">
              <div class="places__results" :class="{'places__results_to': to.step}" v-if="currentResults.stringOptions.length > 0">
                <q-list v-if="currentResults.stringOptions.length > 0">
                  <q-item
                    class="listItem"
                    v-for="tip in currentResults.stringOptions"
                    :key="tip.id"
                    clickable
                    @click.prevent="chooseAddress(tip, 'input')"
                    v-ripple>

                    <q-item-section>
                      <q-item-label>{{tip.structured_formatting.main_text}}</q-item-label>
                      <q-item-label caption>{{tip.structured_formatting.secondary_text}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="places__step">
                <input
                  type="text"
                  v-model="from.text"
                  @input="searchByInputs(from.text, 'from')"
                  @focus="from.step = true, to.step = false"
                  class="places__input"
                  placeholder="Откуда"
                  style="margin-bottom: 15px;"
                >
                <div class="clear" @click="clearInput('from')" v-if="from.text.length > 0">
                  <svg viewBox="0 0 448 448" fill="#efa5b8" width="12px"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg>
                </div>
              </div>
              <div class="places__step">
                <input
                  type="text"
                  v-model="to.text"
                  @input="searchByInputs(to.text, 'to')"
                  @focus="to.step = true, from.step = false"
                  class="places__input"
                  placeholder="Куда"
                >
                <div class="clear" @click="clearInput('to')" v-if="to.text.length > 0">
                  <svg viewBox="0 0 448 448" fill="#efa5b8" width="12px"><path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/></svg>
                </div>
              </div>
            </div>
            <div class="places__steps">
              <InputSteps
                :isTo="to.step"
                :isFrom="from.step"
              />
            </div>
          </div>

          <!-- <div class="selectDate">
            <div class="selectDate__input" @click="showSelectDate = true">
              <q-icon color="accent">
                <svg x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M492,352c11.046,0,20-8.954,20-20V120c0-44.112-35.888-80-80-80h-26V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20 v20h-91V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v20h-90V20c0-11.046-8.954-20-20-20s-20,8.954-20,20v20H80 C35.888,40,0,75.888,0,120v312c0,44.112,35.888,80,80,80h352c44.112,0,80-35.888,80-80c0-11.046-8.954-20-20-20 c-11.046,0-20,8.954-20,20c0,22.056-17.944,40-40,40h-76V352H492z M472,312H356V192h116V312z M156,472H80 c-22.056,0-40-17.944-40-40v-80h116V472z M156,312H40V192h116V312z M316,472H196V352h120V472z M316,312H196V192h120V312z M40,152 v-32c0-22.056,17.944-40,40-40h25v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80h90v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80 h91v20c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80h26c22.056,0,40,17.944,40,40v32H40z"/></svg>
              </q-icon>
              <div class="selectDate__input__result flex items-center">{{selectDate.name}}</div>
              <div class="arrow"></div>
            </div>
            <div class="selectDate__select" v-if="showSelectDate">
              <q-list>
                <q-item
                  v-for="dateOption in dateOptions"
                  :key="dateOption.value"
                  clickable
                  @click="chooseDate(dateOption)"
                  v-ripple>

                  <q-item-section>
                    <q-item-label>{{dateOption.name}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div> -->

          <!-- <div class="selectTime" v-if="selectDate.value === 'today' || selectDate.value === 'tomorrow'">
            <div class="selectTime__input">
              <q-icon color="accent">
                <svg viewBox="0 0 384 384" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="m192 384c105.863281 0 192-86.128906 192-192s-86.136719-192-192-192-192 86.128906-192 192 86.136719 192 192 192zm-16-351.191406v15.191406c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-15.191406c75.472656 7.535156 135.664062 67.71875 143.191406 143.191406h-15.191406c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h15.191406c-7.527344 75.472656-67.71875 135.65625-143.191406 143.191406v-15.191406c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v15.191406c-75.472656-7.535156-135.664062-67.71875-143.191406-143.191406h15.191406c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-15.191406c7.527344-75.472656 67.71875-135.65625 143.191406-143.191406zm0 0"/><path d="m200 208h80c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-72v-48c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v56c0 13.230469 10.769531 24 24 24zm0 0"/></svg>
              </q-icon>
              <the-mask mask="##:##" masked v-model="time" placeholder="12:00" />
            </div>
          </div> -->

          <!-- <div class="selectOtherDay flex justify-between" v-if="selectDate.value === 'otherDay'">
            <div class="selectOtherDay__date">
              <div class="selectOtherDay__input" @click="showCalendar = !showCalendar">
                <q-icon color="accent">
                  <svg x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M492,352c11.046,0,20-8.954,20-20V120c0-44.112-35.888-80-80-80h-26V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20 v20h-91V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v20h-90V20c0-11.046-8.954-20-20-20s-20,8.954-20,20v20H80 C35.888,40,0,75.888,0,120v312c0,44.112,35.888,80,80,80h352c44.112,0,80-35.888,80-80c0-11.046-8.954-20-20-20 c-11.046,0-20,8.954-20,20c0,22.056-17.944,40-40,40h-76V352H492z M472,312H356V192h116V312z M156,472H80 c-22.056,0-40-17.944-40-40v-80h116V472z M156,312H40V192h116V312z M316,472H196V352h120V472z M316,312H196V192h120V312z M40,152 v-32c0-22.056,17.944-40,40-40h25v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80h90v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80 h91v20c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80h26c22.056,0,40,17.944,40,40v32H40z"/></svg>
                </q-icon>
                <the-mask mask="##.##.####" readonly v-model="selectedDate" placeholder="22.05.2020" />
                <div class="arrow"></div>
              </div>
              <q-date
                v-if="showCalendar"
                v-model="selectedDate"
                minimal
                class="selectOtherDay__calendar"
                color="accent"
                mask="DD.MM.YYYY"
                :locale="calenderLocale"
                :options="calenderOptions"
                @input="showCalendar = false"
              />
            </div>

            <div class="selectOtherDay__time">
              <q-icon color="accent">
                <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg"><path d="m192 384c105.863281 0 192-86.128906 192-192s-86.136719-192-192-192-192 86.128906-192 192 86.136719 192 192 192zm-16-351.191406v15.191406c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-15.191406c75.472656 7.535156 135.664062 67.71875 143.191406 143.191406h-15.191406c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h15.191406c-7.527344 75.472656-67.71875 135.65625-143.191406 143.191406v-15.191406c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v15.191406c-75.472656-7.535156-135.664062-67.71875-143.191406-143.191406h15.191406c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-15.191406c7.527344-75.472656 67.71875-135.65625 143.191406-143.191406zm0 0"/><path d="m200 208h80c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-72v-48c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v56c0 13.230469 10.769531 24 24 24zm0 0"/></svg>
              </q-icon>
              <the-mask mask="##:##" masked v-model="time" placeholder="12:00" />
            </div>
          </div> -->
          <!-- <q-chip class="time__utc" color="accent" q-ml-lg text-color="white" icon="query_builder" v-text="utc"></q-chip> -->
        </div>
        <AddOrderCars @selectedCar="carType = $event" :estimates="estimates" :isEstimateSearching="isEstimateSearching"/>
      </div>
      <AddOrderConfirm
        :carType="carType"
        :to="to"
        :employee="employee"
        :from="from"
        :dateType="selectDate"
        :date="selectedDate"
        :time="time"
        :isEstimateSearching="isEstimateSearching"
        :estimateUuid="estimateUuid"
        :utc_offset="utc_offset"
        :isEstimateExpired="isEstimateExpired"
        @update-prices="updatePrices"
      />
    </div>
    <div class="rightColumn">
      <div
        class="google-map"
        ref="googleMap">
        <template v-if="Boolean(this.google) && Boolean(this.map)">
          <slot
            :google="google"
            :map="map"
          />
        </template>
      </div>
    </div>

  </q-page>
</template>

<script>
import API from '../../src/api.js'
import { date } from 'quasar'
// import { TheMask } from 'vue-the-mask'
import { mapActions } from 'vuex'
import InputSteps from 'components/AddOrder/InputSteps'
import AddOrderCars from 'components/AddOrder/AddOrderCars'
import AddOrderConfirm from 'components/AddOrder/AddOrderConfirm'
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: 'AddOrderPage',
  data () {
    return {
      apiKey: 'AIzaSyDkB8ULDjHGj4bCqRDVI3aCOBcjOpcFv2w',
      google: null,
      map: null,
      autocomplete: null,
      service: null,
      geocoder: null,
      carType: { ride_type_name: 'comfort', name: 'Комфорт', img: '../../statics/order/comfort.svg', converted: { amount: 0 } },
      directionsService: null,
      directionsRenderer: null,
      from: {
        step: false,
        text: '',
        stringOptions: [],
        adress: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      },
      to: {
        step: false,
        text: '',
        stringOptions: [],
        adress: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      },
      user: null,
      date: null,
      time: null,
      utc_offset: 0,
      employee: {
        name: '',
        phone: '',
        group: {
          name: ''
        }
      },
      estimates: [],
      estimateUuid: null,
      employees: [],
      employeeSearch: '',
      selectDate: { value: 'now', name: 'Сейчас' },
      showSelectDate: false,
      isEstimateSearching: false,
      dateOptions: [
        { value: 'now', name: 'Сейчас' },
        { value: 'today', name: 'Сегодня' },
        { value: 'tomorrow', name: 'Завтра' },
        { value: 'otherDay', name: 'Другой день' }
      ],
      showCalendar: false,
      calenderLocale: {
        days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
        daysShort: 'ВС_ПН_ВТ_СР_ЧТ_ПТ_СБ'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
        firstDayOfWeek: 1
      },
      selectedDate: '',
      timeBeforeEstimExpired: null,
      isEstimateExpired: false,
      // for debouncing searchEmployee method
      lastCall: null,
      lastCallTimer: null
    }
  },
  async mounted () {
    this.calenderOptions()
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries: ['places'],
      language: 'ru'
    })
    this.google = googleMapApi
    this.$nextTick(() => this.initializeMap())
  },

  computed: {
    currentResults () {
      return (this.to.step) ? this.to : this.from
    },
    employeePlaceholder () {
      if (this.employee.name) {
        return ''
      } else {
        return 'Начните вводить данные сотрудника'
      }
    },
    utc () {
      return 'UTC' + ((this.utc_offset >= 0 ? '+' : '')) + this.utc_offset
    },
    showEmployeeWarning () {
      return this.from.adress && this.to.adress && !this.employee.name
    }
  },

  methods: {
    ...mapActions({
      sendCoords: 'rides/sendCoords'
    }),
    calenderOptions (calendarDate) {
      let now = Date.now()
      let newDate = date.addToDate(now, { days: 2 })
      let newDateFormatted = date.formatDate(newDate, 'YYYY/MM/DD')
      return calendarDate >= newDateFormatted
    },
    initializeMap () {
      const config = {
        center: { lat: 55.75222, lng: 37.61556 },
        zoom: 10,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#3f404f' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#2c2d3d' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#86868f' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#86868f' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#86868f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#2f3040' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#2f3040' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#a2a2a9' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#7f808a' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#a2a2a9' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#a2a2a9' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
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
      this.autocomplete = new this.google.maps.places.AutocompleteService()
      this.service = new this.google.maps.places.PlacesService(this.map)
      this.geocoder = new this.google.maps.Geocoder()

      navigator.geolocation.getCurrentPosition(position => {
        this.utc_offset = new Date(position.timestamp).getTimezoneOffset() / -60
        this.map.setCenter(new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude))
      })
    },

    makeDirectionPoints ({ start = null, end = null } = {}) {
      if (!this.to.directionMarker && end) {
        this.to.directionMarker = new this.google.maps.Marker({
          position: end,
          map: this.map,
          icon: {
            url: '../../statics/order/pointTo.svg',
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(15, 15),
            scaledSize: new this.google.maps.Size(32, 32)
          }
        })
      }
      if (!this.from.directionMarker && start) {
        this.from.directionMarker = new this.google.maps.Marker({
          position: start,
          map: this.map,
          icon: {
            url: '../../statics/order/pointFrom.svg',
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(15, 15),
            scaledSize: new this.google.maps.Size(32, 32)
          }
        })
      }
    },

    searchByInputs (value, type) {
      this.to.stringOptions = []
      this.from.stringOptions = []
      if (value) {
        this.autocomplete.getPlacePredictions({
          input: value,
          location: this.map.getCenter(),
          origin: this.map.getCenter(),
          radius: 25000
        }, (results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK) {
            results.sort((a, b) => { return a.distance_meters - b.distance_meters })
            this[type].stringOptions = results
          }
        })
      }
    },

    chooseAddress (adress, caller) {
      const type = (this.to.step) ? 'to' : 'from'
      const coordName = (this.to.step) ? 'end' : 'start'
      this[type].stringOptions = []

      this.service.getDetails({
        placeId: adress.place_id,
        fields: ['name', 'address_components', 'geometry', 'utc_offset_minutes']
      }, (results, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          const components = results.address_components
          if (type === 'from') this.utc_offset = results.utc_offset_minutes / 60

          if (components) {
            this[type].city = (
              components.find(c => { return c.types[0] === 'locality' }) ||
              components.find(c => { return c.types[0] === 'administrative_area_level_2' }) ||
              components.find(c => { return c.types[0] === 'postal_town' }) ||
              { long_name: null }
            ).long_name

            this[type].country = (
              components.find(c => { return c.types[0] === 'country' }) ||
              { long_name: null }
            ).long_name

            this[type].lat = results.geometry.location.lat()
            this[type].lng = results.geometry.location.lng()
            this[type].name = results.name
            this[type].postal_code = (
              components.find(c => { return c.types[0] === 'postal_code' }) ||
              { long_name: null }
            ).long_name

            this[type].street_name = (
              components.find(c => { return c.types[0] === 'route' }) ||
              { long_name: null }
            ).long_name

            this[type].street_number = (
              components.find(c => { return c.types[0] === 'street_number' }) ||
              { long_name: null }
            ).long_name
          }

          this[type].adress = results
          this[type].text = results.name

          if (this[type].directionMarker) this[type].directionMarker.setMap(null)
          this[type].directionMarker = null
          this.makeDirectionPoints({ [coordName]: this[type].adress.geometry.location })

          this.zoomMap()
          this.goConfigurate()
        }
      })
    },

    zoomMap () {
      if (this.to.adress && this.from.adress) {
        let bounds = new this.google.maps.LatLngBounds()
        bounds.extend(this.from.adress.geometry.location)
        bounds.extend(this.to.adress.geometry.location)
        this.map.fitBounds(bounds)
      } else if (this.from.adress) this.map.setCenter(this.from.adress.geometry.location)
    },

    searchEmployee () {
      let previousCall = this.lastCall
      this.lastCall = performance.now()
      if (previousCall && ((this.lastCall - previousCall) <= 150)) {
        clearTimeout(this.lastCallTimer)
      }
      this.lastCallTimer = setTimeout(() => {
        if (this.employeeSearch) {
          API.get('api/companies/clients', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            params: { search: this.employeeSearch }
          })
            .then(response => {
              this.employees = (this.employeeSearch) ? response.data.data : []
            })
            .catch(error => {
              console.error(error)
            })
            .finally(() => {
              this.isEstimateSearching = false
            })
        } else {
          this.employees = []
        }
      }, 150)
    },
    chooseEmployee (employee) {
      this.employee = employee
      this.employeeSearch = ''
      this.employees = []
      this.goConfigurate()
    },

    goConfigurate () {
      if (this.from.text && this.to.text && this.employee.name) {
        this.isEstimateSearching = true
        this.sendCoords({ client_id: this.employee.id, from: this.from, to: this.to, billing: this.employee.uuid || null })
          .then(response => {
            if (this.timeBeforeEstimExpired) {
              clearTimeout(this.timeBeforeEstimExpired)
              this.isEstimateExpired = false
              this.timeBeforeEstimExpired = null
            }
            this.timeBeforeEstimExpired = setTimeout(() => { this.isEstimateExpired = true }, 5 * 50 * 1000)
            this.estimates = response.data.estimates
            this.estimateUuid = response.data.uuid
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.isEstimateSearching = false
          })
      }
    },

    async updatePrices () {
      const carType = this.carType.ride_type_name
      if (this.from.text && this.to.text && this.employee.name) {
        this.isEstimateSearching = true
        this.sendCoords({ client_id: this.employee.id, from: this.from, to: this.to, billing: this.employee.uuid || null })
          .then(response => {
            if (this.timeBeforeEstimExpired) {
              clearTimeout(this.timeBeforeEstimExpired)
              this.isEstimateExpired = false
              this.timeBeforeEstimExpired = null
            }
            this.timeBeforeEstimExpired = setTimeout(() => { this.isEstimateExpired = true }, 5 * 50 * 1000)
            this.estimates = response.data.estimates
            this.estimateUuid = response.data.uuid
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.$root.$emit('orderPricesUpdated', carType)
            this.isEstimateSearching = false
          })
      }
    },

    clearInput (type) {
      this[type].text = ''
      this[type].search = ''
      this[type].stringOptions = []
    },
    clearEmployee () {
      this.employeeSearch = ''
      this.employees = []
      this.employee.name = ''
      this.employee.phone = ''
    },
    chooseDate (date) {
      this.selectDate = date
      this.showSelectDate = false
    }
  },
  watch: {
    time (val) {
      const time = val.split(':')
      time[0] = (+time[0] > 23) ? '23' : time[0]
      time[1] = (+time[1] > 59) ? '59' : time[1]
      if (this.selectDate.value === 'today' && val.length === 5) {
        let now = new Date()

        let offset = now.getTimezoneOffset() / -60
        // to UTF-0
        now = date.subtractFromDate(now, { hours: offset })
        // to right UTF
        now = date.addToDate(now, { hours: this.utc_offset })

        let timeNow = date.formatDate(now, 'HH:mm')
        const timeNowArray = timeNow.split(':')
        if (+time[0] <= +timeNowArray[0]) {
          time[0] = timeNowArray[0]
          time[1] = (+time[1] < +timeNowArray[1]) ? timeNowArray[1] : time[1]
        }
      }
      this.time = time.join(':')
    },
    carType () {
      this.$root.$emit('carTypeUpdated')
    }
  },
  components: { InputSteps, AddOrderCars, AddOrderConfirm }
}
</script>

<style scoped lang="scss">
  .leftColumn {
    width: 35%;
    padding: 20px 0 16px 16px;
  }
  .rightColumn {
    width: 65%;
    padding: 20px 16px 16px;
  }
  @media (max-width: 1400px) {
    .leftColumn {
      width: 42%;
    }
    .rightColumn {
      width: 58%;
    }
  }
  .google-map{
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .order {
    font-family: 'SFProDisplay', sans-serif;
    height: calc(100% - 110px);
    border: 1px solid #eff0f7;
    border-radius: 0 20px 0 0;
  }
  .header {
    padding: 0.9em 2.15em 0.9em;
    border-radius: 0 20px 0 0;
    &__title {
      font-size: 2.25rem;
      letter-spacing: 0.03em;
    }
    &__back {
      width: 28px;
      height: 28px;
      background-color: #ffffff;
      border-radius: 50%;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
  .listItem {
    border-radius: 10px;
  }
  .places {
    padding: 0.9em 2.15em 16px;
    &__step {
      position: relative;
    }
    &__inputs {
      width: calc(100% - 54px);
      position: relative;
    }
    &__input {
      width: 100%;
      height: 45px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      border-radius: 18px;
      background-color: #FFF;
      line-height: 20px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
      border: 1px solid #e6edf0;
      display: flex;
      align-items: center;
      outline: none;
      &:first-child {
      }
      &::placeholder {
        color: #d0cee1;
      }
    }
    &__results {
      position: absolute;
      width: 100%;
      background-color: #ffffff;
      top: 44px;
      border-radius: 20px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      z-index: 500;
      box-shadow: 0 5px 18px 0 rgba(231, 234, 246, 0.79);
      border: 1px solid #e6edf0;
      &_to {
        top: 104px;
      }
    }
  }
  .employee {
    padding: 0 2.15em 15px;
    position: relative;
    &__input {
      width: 100%;
      height: 45px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      border-radius: 18px;
      background-color: #FFF;
      color: #000;
      line-height:20px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
      display: flex;
      align-items: center;
      border: 1px solid #e6edf0;
      position: relative;
      & input {
        width: 100%;
        height: 41px;
        outline: none;
        border: none;
        background-color: rgba(0,0,0,0);
        margin-left: 15px;
        &::placeholder {
          color: #d0cee1;
        }
      }
    }
    &__result {
      position: absolute;
      left: 45px;
      line-height: 16px;
      width: calc(100% - 45px);
      padding: 5px 0;
      &__phone {
        color: #d5d3e4;
      }
    }
    &__results {
      position: absolute;
      width: calc(100% - 60px);
      background-color: #ffffff;
      top: 44px;
      border-radius: 20px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      z-index: 500;
      box-shadow: 0 5px 18px 0 rgba(231, 234, 246, 0.79);
      border: 1px solid #e6edf0;
    }
    &__warning {
      color: red;
      margin: 0.5em 0 0 0.5em;
      visibility: hidden;
      opacity: 0;
      height: 0;

      transition: all ease 0.4s;

      &_shown {
      visibility: visible;
      opacity: 1;
      height: 35px;
    }
    }

  }
  .selectDate {
    padding: 0 2.15em 25px;
    position: relative;
    &__input {
      width: 100%;
      height: 45px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      border-radius: 18px;
      background-color: #FFF;
      color: #000;
      line-height:20px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
      display: flex;
      align-items: center;
      border: 1px solid #e6edf0;
      position: relative;
      cursor: pointer;
      &__result {
        width: calc(100% - 30px);
        height: 41px;
        outline: none;
        border: none;
        background-color: rgba(0,0,0,0);
        margin-left: 15px;
      }
    }
    &__select {
      position: absolute;
      width: calc(100% - 60px);
      background-color: #ffffff;
      top: 44px;
      border-radius: 20px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      z-index: 500;
      box-shadow: 0 5px 18px 0 rgba(231, 234, 246, 0.79);
      border: 1px solid #e6edf0;
    }
  }
  .selectTime{
    padding: 0 2.15em 15px;
    &__input {
      width: 100%;
      height: 45px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      border-radius: 18px;
      background-color: #FFF;
      color: #000;
      line-height:20px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
      display: flex;
      align-items: center;
      border: 1px solid #e6edf0;
      position: relative;
      & input {
        width: 100%;
        height: 41px;
        outline: none;
        border: none;
        background-color: rgba(0,0,0,0);
        margin-left: 15px;
        &::placeholder {
          color: #d0cee1;
        }
      }
    }
  }
  .selectOtherDay {
    padding: 0 2.15em 15px;
    &__date {
      width: 65%;
      position: relative;
    }
    &__input {
      cursor: pointer;
      height: 45px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      border-radius: 18px;
      background-color: #FFF;
      color: #000;
      line-height:20px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
      display: flex;
      align-items: center;
      border: 1px solid #e6edf0;
      position: relative;
      & input {
        width: calc(100% - 50px);
        height: 41px;
        outline: none;
        border: none;
        background-color: rgba(0,0,0,0);
        margin-left: 15px;
        &::placeholder {
          color: #d0cee1;
        }
      }
    }
    &__time {
      width: 30%;
      height: 45px;
      padding: 0.52em 1.1em 0.52em 1.1em;
      border-radius: 18px;
      background-color: #FFF;
      color: #000;
      line-height:20px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
      display: flex;
      align-items: center;
      border: 1px solid #e6edf0;
      position: relative;
      & input {
        width: 100%;
        height: 41px;
        outline: none;
        border: none;
        background-color: rgba(0,0,0,0);
        margin-left: 15px;
        &::placeholder {
          color: #d0cee1;
        }
      }
    }
    &__calendar {
      position: absolute;
      width: 100%;
      background-color: #ffffff;
      top: 44px;
      left: 0;
      border-radius: 20px;
      z-index: 500;
      box-shadow: 0 5px 18px 0 rgba(231, 234, 246, 0.79);
      border: 1px solid #e6edf0;
    }
  }
  .arrow{
    width: 23px;
    height: 23px;
    background-color: #fff;
    box-shadow: 0px 0px 6px rgba(118, 121, 242, 0.5);
    border-radius: 50%;
    position: relative;
    &:after {
      position: absolute;
      left: 8px;
      top: 8px;
      width: 6px;
      height: 6px;
      content: '';
      border: solid #8184f3;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  .clear {
    position: absolute;
    right: 15px;
    top: 13px;
    transform: rotate(45deg);
    cursor: pointer;
  }
  .time__utc {
    margin-left: 2.15em;
  }

</style>
