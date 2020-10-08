<template>
      <q-card class="q-pa-xs" style="width: 480px; border-radius: 23.5px; font-size: 1rem">

        <q-card-section class="row justify-end items-center q-pa-xs q-pa-none">
          <div class="modal__title">{{ dateString }}</div>
          <q-btn ref="closeBtn" class="closeBtn" flat round dense v-close-popup>
            <q-icon class="header__icon" color="white" size="xs">
              <svg id="Capa_1" style="box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%; transform: rotate(45deg);" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
            </q-icon>
          </q-btn>
        </q-card-section>

        <q-card-section class="modal__form_section items-center q-pt-none">
          <OrdersTitle/>
          <q-scroll-area class="order__scroll" :thumb-style="thumbStyle">
            <OrdersItem v-for="ride in getRides" :key="ride.id" :ride="ride" />
            <q-scroll-observer @scroll="loadOnScrollEnd" />
          </q-scroll-area>

          <q-inner-loading :showing="visible">
            <q-spinner
              color="accent"
              size="2em"
            />
          </q-inner-loading>
        </q-card-section>

      </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrdersTitle from 'components/Orders/OrdersTitle'
import OrdersItem from 'components/Orders/OrdersItem'

export default {
  name: 'UsersEditUserModal',

  props: {
    dates: {
      required: true,
      type: Object
    }
  },

  components: {
    OrdersTitle,
    OrdersItem
  },

  data () {
    return {
      paginationPage: 1,
      ridesInterval: null,
      visible: true
    }
  },

  mounted () {
    this.loadRides({ start: this.dates.dateFrom + 'T00:00:00+00:00', end: this.dates.dateTo + 'T23:59:59+00:00' }).then(() => { this.visible = false })
  },

  computed: {
    ...mapGetters({
      getRides: 'rides/rides',
      getMeta: 'rides/meta'
    }),
    dateString () {
      return this.dates.dateFrom.split('-').reverse().join('.') + ' - ' + this.dates.dateTo.split('-').reverse().join('.')
    },
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
      loadRidesNextPage: 'rides/loadRidesNextPage'
    }),
    loadOnScrollEnd (e) {
      if (e.position > 1700 * this.paginationPage) {
        this.paginationPage++
        if (this.getMeta.last_page <= this.paginationPage) {
          console.log({ start: this.dates.dateFrom + 'T00:00:00+00:00', end: this.dates.dateTo + 'T23:59:59+00:00' })
          this.loadRidesNextPage({
            page: this.paginationPage,
            params: { start: this.dates.dateFrom + 'T00:00:00+00:00', end: this.dates.dateTo + 'T23:59:59+00:00' }
          })
        }
      }
    }
  }

}
</script>

<style scoped>
    .modal__header {
      font-size: 2.25em;
      font-family: 'SFProDisplay', sans-serif;
      color: rgb(34, 39, 52);
      line-height: 1.333;
      margin-top: -0.5em;
      padding: 0 1em;
    }

    .modal__title {
      margin: 0 auto 0 auto;
      font-size: 1rem;
    }
    .closeBtn {
      margin-left: -5em;
    }

    .header__icon {
      position: relative;
    }
    .header__icon::after {
      z-index: -1;
      position: absolute;
      content: '';
      top: 0.2em;
      left: 0.2em;
      border-radius: 50%;
      display: block;
      background: #efa7ba;
      width: 0.6em;
      height: 0.6em;
    }

    .modal__form_section {
      /* padding: 0 3.125em 2.1em; */
    }

    .modal__form {
      position: relative;
    }

    .modal__form::before{
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(247, 247, 247);
    }
    .modal__form::after {
      position: absolute;
      bottom: 66px;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(247, 247, 247);
    }

    .order__scroll {
       height: calc(100vh - 48px - 15em);
       width: 100%;
    }
    .pagePaddings {
      padding: 20px 16px 16px;
    }
    .modal__btn {
      width: 100%;
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      padding: 0.325em 0.3em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      margin-left: auto;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
    }
    .modal__btn-light {
        margin-left: 6%;
        background: #ffffff !important;
        color: #7c72f2 !important;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 2px 10px 0px rgba(74, 94, 202, 0.16);
    }
    .modal__icon {
        width: 0.5625em;
        height: 0.5625em;
        margin-right: 0.5em;
    }
</style>
