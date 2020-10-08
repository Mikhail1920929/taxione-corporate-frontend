<template>
  <q-page class="row">
      <div class="col-12 q-pa-md q-pt-lg">
        <UserHeader v-if="getUser" :user="getUser" />
        <UserFilter v-if="getUser" :user="getUser" :info="getUserRidesInfo || {}" />
        <UserTitle />
        <q-scroll-area class="order__scroll" :thumb-style="thumbStyle">
          <UserItem v-for="ride in getUserRides" :key="ride.id" :ride="ride" />
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

      <q-dialog v-model="Loading">
        <Loading :text="loadingText"/>
      </q-dialog>

  </q-page>
</template>

<script>
import UserHeader from 'components/User/UserHeader'
import UserFilter from 'components/User/UserFilter'
import UserTitle from 'components/User/UserTitle'
import UserItem from 'components/User/UserItem'
import Loading from 'components/Loading'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OrdersPage',

  components: {
    UserHeader,
    UserFilter,
    UserTitle,
    UserItem,
    Loading
  },

  data () {
    return {
      paginationPage: 1,
      dateTo: null,
      dateFrom: null,
      paginLoading: false,
      Loading: false,
      loadingText: '',
      visible: false
    }
  },

  beforeDestroy () {
    this.$root.$off('canceledUserTemplated')
    this.$root.$off('canceledUserRide')
    this.$root.$off('datesChangedUser')
  },

  mounted () {
    const period = this.getLastAndFirstDateOfCurrentMonth()

    if (!this.getUser) this.loadUser(this.$route.params.id)
    if (!this.getUserRides) {
      this.visible = true
      this.loadUserRides({ id: this.$route.params.id, dates: period }).finally(() => { this.visible = false })
    }
    if (!this.dateTo) {
      this.dateFrom = period.start
      this.dateTo = period.end
    }

    this.$root.$on('userEdited', () => {
      if (this.$route.params.id) this.loadUser(this.$route.params.id)
    })

    this.$root.$on('canceledUserTemplated', (id) => {
      this.cancelTemplate(id)
        .then(() => {
          this.paginationPage = 1
          this.visible = true
          this.loadUserRides({ id: this.$route.params.id, dates: this.getLastAndFirstDateOfCurrentMonth() }).finally(() => { this.visible = false })
        })
    })
    this.$root.$on('canceledUserTemplated', (id) => {
      this.loadingText = 'Отменяем предзаказ'
      this.Loading = true
      this.cancelTemplate(id)
        .then(() => {
          this.paginationPage = 1
          this.visible = true
          this.loadUserRides({ id: this.$route.params.id, dates: this.getLastAndFirstDateOfCurrentMonth() }).finally(() => { this.visible = false })
        })
        .finally(() => {
          this.Loading = false
        })
    })

    this.$root.$on('canceledUserRide', (data) => {
      this.loadingText = 'Отменяем заказ'
      this.Loading = true
      this.cancelRide(data)
        .then(() => {
          this.paginationPage = 1
          this.visible = true
          this.loadUserRides({ id: this.$route.params.id, dates: this.getLastAndFirstDateOfCurrentMonth() }).finally(() => { this.visible = false })
        })
        .finally(() => {
          this.Loading = false
        })
    })

    this.$root.$on('datesChangedUser', (date) => {
      this.dateTo = date.to
      this.dateFrom = date.from
      this.paginationPage = 1
      this.visible = true
      this.loadUserRides({ id: this.$route.params.id, dates: { start: this.dateFrom, end: this.dateTo } }).finally(() => { this.visible = false })
    })
  },

  computed: {
    ...mapGetters({
      getUser: 'users/user',
      getUserRides: 'users/userRides',
      getUserRidesMeta: 'users/userRidesMeta',
      getUserRidesInfo: 'users/userRidesInfo'
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
      loadUser: 'users/loadUser',
      loadUserRides: 'users/loadUserRides',
      loadUserRidesNextPage: 'users/loadUserRidesNextPage',
      cancelTemplate: 'rides/cancelTemplate',
      cancelRide: 'rides/cancelRide'
    }),
    loadOnScrollEnd (e) {
      if (e.position > 1300 * this.paginationPage) {
        this.paginationPage++
        if (this.getUserRidesMeta.last_page >= this.paginationPage) {
          this.paginLoading = true
          this.visible = true
          this.loadUserRidesNextPage({ page: this.paginationPage, id: this.$route.params.id, dates: { start: this.dateFrom, end: this.dateTo } })
            .finally(() => { this.paginLoading = false; this.visible = false })
        }
      }
    },
    getLastAndFirstDateOfCurrentMonth () {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      let date = new Date(year, month + 1, 0).getDate()
      return {
        start: `${year}-${(month < 10) ? '0' + (month + 1) : month + 1}-01T00:00:00+00:00`,
        end: `${year}-${(month + 1 < 10) ? '0' + (month + 1) : month + 1}-${(date < 10) ? '0' + date : date}T23:59:59+00:00`
      }
    }
  }
}
</script>

<style scoped>
    .order__scroll {
       height: calc(100vh - 48px - 21em);
       width: 100%;
    }
</style>
