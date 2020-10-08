<template>
  <q-page class="row">
      <div class="col-12 pagePaddings">
        <OrdersHeader/>
        <OrdersFilter :period="getCurrentPeriod()"/>
        <OrdersTitle/>
        <div>
          <q-scroll-area class="order__scroll" :thumb-style="thumbStyle">
          <OrdersItem v-for="ride in getRides" :key="ride.id" :ride="ride" @update-rides="updateRides"/>
          <q-scroll-observer @scroll="loadOnScrollEnd" />
          <div class="flex justify-center align-center">
            <q-spinner-dots
              v-show="paginLoading"
              color="accent"
              size="2em"
            />
          </div>
        </q-scroll-area>
        <q-inner-loading :showing="visible" style="top: 35%;">
            <q-spinner
              color="accent"
              size="2em"
            />
          </q-inner-loading>
        </div>
      </div>

      <q-dialog v-model="modalAddOrderSuccess">
        <OrdersAddOrderSuccessModal />
      </q-dialog>

      <q-dialog v-model="Loading">
        <Loading :text="loadingText"/>
      </q-dialog>

  </q-page>
</template>

<script>
import { date } from 'quasar'
import OrdersHeader from 'components/Orders/OrdersHeader'
import OrdersFilter from 'components/Orders/OrdersFilter'
import OrdersTitle from 'components/Orders/OrdersTitle'
import OrdersItem from 'components/Orders/OrdersItem'
import Loading from 'components/Loading'
import OrdersAddOrderSuccessModal from 'components/Orders/OrdersAddOrderSuccessModal'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OrdersPage',

  components: {
    OrdersHeader,
    OrdersFilter,
    OrdersTitle,
    OrdersItem,
    OrdersAddOrderSuccessModal,
    Loading
  },

  data () {
    return {
      paginationPage: 1,
      dateTo: this.getCurrentPeriod().end || '3000-03-15T00:00:00+03:00',
      dateFrom: this.getCurrentPeriod().start || '2000-02-15T00:00:00+03:00',
      searchString: null,
      visible: true,
      modalAddOrderSuccess: false,
      Loading: false,
      loadingText: '',
      paginLoading: false
    }
  },

  beforeDestroy () {
    this.$root.$off('datesChanged')
    this.$root.$off('orgSearching')
    this.$root.$off('canceledTemplated')
    this.$root.$off('canceledRide')
  },

  async mounted () {
    if (this.$route.params.openSuccessOrderModal) this.modalAddOrderSuccess = true
    setTimeout(() => { this.modalAddOrderSuccess = false }, 1200)
    await this.loadRides({ start: this.dateFrom, end: this.dateTo, search: this.searchString }).finally(() => { this.visible = false })

    this.$root.$on('canceledTemplated', (id) => {
      this.loadingText = 'Отменяем предзаказ'
      this.Loading = true
      this.cancelTemplate(id)
        .then(() => {
          this.paginationPage = 1
          this.loadRides({ start: this.dateFrom, end: this.dateTo, search: this.searchString }).finally(() => { this.visible = false })
        })
        .finally(() => {
          this.Loading = false
        })
    })

    this.$root.$on('canceledRide', (data) => {
      this.loadingText = 'Отменяем заказ'
      this.Loading = true
      this.cancelRide(data)
        .then(() => {
          this.paginationPage = 1
          this.loadRides({ start: this.dateFrom, end: this.dateTo, search: this.searchString }).finally(() => { this.visible = false })
        })
        .finally(() => {
          this.Loading = false
        })
    })

    this.$root.$on('orgSearching', (string) => {
      this.searchString = string
      this.visible = true
      this.loadRides({ start: this.dateFrom, end: this.dateTo, search: this.searchString }).finally(() => { this.visible = false })
    })

    this.$root.$on('datesChanged', (date) => {
      this.dateTo = date.to
      this.dateFrom = date.from
      this.paginationPage = 1
      this.visible = true
      this.loadRides({ start: this.dateFrom, end: this.dateTo, search: this.searchString }).finally(() => { this.visible = false })
    })
  },

  computed: {
    ...mapGetters({
      getRides: 'rides/rides',
      getMeta: 'rides/meta'
    }),

    thumbStyle () {
      return {
        right: '-10px',
        borderRadius: '2px',
        backgroundColor: '#6a87f2',
        width: '4px',
        opacity: 1
      }
    }
  },

  methods: {
    ...mapActions({
      loadRides: 'rides/loadRides',
      loadRidesNextPage: 'rides/loadRidesNextPage',
      cancelTemplate: 'rides/cancelTemplate',
      cancelRide: 'rides/cancelRide',
      loadCompanyInfo: 'settings/loadCompanyInfo'
    }),
    updateRides () {
      this.paginationPage = 1
      this.visible = true
      this.loadRides({ start: this.dateFrom, end: this.dateTo, search: this.searchString }).finally(() => { this.visible = false })
    },
    getCurrentPeriod () {
      let newDate = new Date()
      let startDate
      let endDate

      if (newDate.getDate() <= 15) {
        startDate = 1
        endDate = 15
      } else {
        startDate = 16
        endDate = date.daysInMonth(newDate)
      }

      let start = date.adjustDate(newDate, { date: startDate })
      let end = date.adjustDate(newDate, { date: endDate })

      return {
        start: date.formatDate(start, 'YYYY-MM-DD') + 'T00:00:00+00:00',
        end: date.formatDate(end, 'YYYY-MM-DD') + 'T23:59:59+00:00'
      }
    },
    loadOnScrollEnd (e) {
      if (e.position > 1500 * this.paginationPage) {
        this.paginationPage++
        if (this.getMeta.last_page >= this.paginationPage) {
          this.paginLoading = true
          this.loadRidesNextPage({ page: this.paginationPage, params: { start: this.dateFrom, end: this.dateTo, search: this.searchString } })
            .finally(() => { this.paginLoading = false })
        }
      }
    }
  }
}
</script>

<style scoped>
    .order__scroll {
       height: calc(100vh - 48px - 23em);
       width: 100%;
    }
    .pagePaddings {
      padding: 20px 16px 16px;
    }
</style>
