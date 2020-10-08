<template>
  <div>
    <div class="footer flex items-center justify-between">
      <div class="footer__total">
        Предварительная цена: <br>
        <q-spinner v-if="isEstimateSearching" size="1.5em" :thickness="7" color="white"/>
        <span v-else style="font-size: 24px; font-weight: bold;"> {{carType.converted.amount}} ₽</span>
      </div>
      <button class="footer__btn flex items-center justify-center" :disabled="isOrderEnable" @click="createOrderCheck" >
        Заказать
      </button>
    </div>

    <q-dialog v-model="BaseErrorModal">
      <BaseErrorModal :text="errorText"/>
    </q-dialog>

    <q-dialog v-model="addOrderWarning">
      <addOrderWarning :text="errorText"/>
    </q-dialog>

    <q-dialog v-model="updatePricesModal">
      <updatePricesModal @add-order="createOrder" :text="priceUpdateText"/>
    </q-dialog>

    <q-dialog v-model="Loading">
      <Loading text="Создаём заказ"/>
    </q-dialog>

  </div>
</template>

<script>
import { date } from 'quasar'
import { mapActions } from 'vuex'
import BaseErrorModal from 'components/BaseErrorModal'
import Loading from 'components/Loading'
import addOrderWarning from 'components/AddOrder/addOrderWarning'
import updatePricesModal from 'components/AddOrder/updatePricesModal'

export default {
  name: 'AddOrderConfirm',
  components: {
    BaseErrorModal,
    addOrderWarning,
    Loading,
    updatePricesModal
  },
  data () {
    return {
      errorText: '',
      BaseErrorModal: false,
      addOrderWarning: false,
      Loading: false,
      updatePricesModal: false,
      priceUpdateText: ''
    }
  },
  props: {
    carType: {
      type: Object
    },
    employee: {
      type: Object
    },
    to: {
      type: Object
    },
    from: {
      type: Object
    },
    date: {
    },
    dateType: {
      type: Object
    },
    time: {
      type: String
    },
    utc_offset: {},
    isEstimateSearching: {
      type: Boolean
    },
    isEstimateExpired: {
      type: Boolean
    },
    estimateUuid: {}
  },

  mounted () {
    this.$root.$on('makeOrder', () => this.createOrder())
  },

  computed: {
    fromCounrtyCityString () {
      const country = this.from.country || ''
      const city = this.from.city || ''
      const comma = (city && country) ? ', ' : ''
      return country + comma + city
    },
    toCounrtyCityString () {
      const country = this.to.country || ''
      const city = this.to.city || ''
      const comma = (city && country) ? ', ' : ''
      return country + comma + city
    },
    isOrderEnable () {
      let isDateCorrect
      if (this.dateType.value === 'otherDay') {
        isDateCorrect = !!(this.time && this.time.length === 5 && this.date)
      } else if (this.dateType.value === 'now') {
        isDateCorrect = true
      } else isDateCorrect = this.time && this.time.length === 5
      return !(this.from.text && this.to.text && this.employee.name && isDateCorrect && this.carType.converted.amount)
    }
  },

  methods: {
    ...mapActions({
      createRide: 'rides/createRide',
      createTemplate: 'rides/createTemplate'
    }),
    getDateString () {
      let formattedString
      let newDate = new Date()

      formattedString = date.formatDate(newDate, 'YYYY-MM-DDT')

      let ATOMsuffix
      if (this.utc_offset >= 0) {
        ATOMsuffix = (Math.abs(this.utc_offset) < 10) ? `:00+0${this.utc_offset}:00` : `:00+${this.utc_offset}:00`
      } else {
        ATOMsuffix = (Math.abs(this.utc_offset) < 10) ? `:00-0${-this.utc_offset}:00` : `:00-${-this.utc_offset}:00`
      }
      switch (this.dateType.value) {
        case 'now':
          let offset = newDate.getTimezoneOffset() / -60
          newDate = date.subtractFromDate(newDate, { hours: offset })
          newDate = date.addToDate(newDate, { hours: this.utc_offset })
          formattedString = date.formatDate(newDate, 'YYYY-MM-DDTHH:mm') + ATOMsuffix
          break
        case 'today':
          formattedString = formattedString + this.time + ATOMsuffix
          break
        case 'tomorrow':
          newDate = date.addToDate(newDate, { days: 1 })
          formattedString = date.formatDate(newDate, 'YYYY-MM-DDT')
          formattedString = formattedString + this.time + ATOMsuffix
          break
        default:
          formattedString = this.date.split('.').reverse().join('-') + 'T' + this.time + ATOMsuffix
          break
      }
      return formattedString
    },
    createOrderCheck () {
      const newDate = new Date()
      const offset = newDate.getTimezoneOffset() / -60
      if (+this.utc_offset === +offset) {
        this.createOrder()
      } else {
        this.addOrderWarning = true
      }
    },
    createOrder () {
      if (this.isEstimateExpired) {
        this.$emit('update-prices')
        this.$root.$on('carTypeUpdated', () => {
          this.Loading = false
          this.priceUpdateText = `Новая стоимость поездки — ${this.carType.converted.amount} ₽`
          this.updatePricesModal = true
          this.$root.$off('carTypeUpdated')
        })
      } else {
        this.Loading = true
        this.createRide({
          client_id: this.employee.id,
          uuid: this.estimateUuid,
          class: this.carType.ride_type_name,
          from: this.from,
          to: this.to,
          template_id: null,
          start_at: this.getDateString(),
          billing: this.employee.uuid || null })
          .then(response => {
            this.estimates = response.data.estimates
            this.Loading = false
            this.$router.push({ name: 'orders', params: { openSuccessOrderModal: true } })
          })
          .catch(error => {
            this.errorText = error.response.data.message
            this.BaseErrorModal = true
            this.Loading = false
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    font-family: 'SFProDisplay', sans-serif;
    background-color: #f7f7f7;
    padding: 0.9em 2.15em 1em;
    border-radius: 0 20px 0 0;
    &__title {
      font-size: 1.5rem;
      letter-spacing: 0.03em;
      color: #564e85;
    }
  }
  .confirm {
    background-color: #f7f7f7;
    padding: 0 2.15em 1.8em;
    &__block {
      border-bottom: 1px solid #fff;
      padding: 8px 0;
      line-height: 18px;
      &:last-child {
        padding-bottom: 0px;
        border-bottom: 0px;
      }
    }
    &__name {
      width: 30%;
      font-size: 16px;
      font-weight: bold;
    }
    &__info {
      width: 70%;
    }
  }
  .footer {
    background: linear-gradient( -150deg, rgb(131,106,242) 0%, rgb(106,135,242) 100%);
    width: 100%;
    height: 110px;
    border-radius: 0 0 20px 20px;
    padding: 0 2em;
    &__total {
      color: #fff;
      line-height: 24px;
      height: 45px;
    }
    &__btn {
      background-color: #fff;
      color: #7679f2;
      box-shadow: 0px 2px 10px 0px rgba(74, 94, 202, 0.79);
      width: clamp(30%, 180px, 40%);
      height: 45px;
      border: none;
      outline: none;
      border-radius: 20px;
      cursor: pointer;
      & svg {
        margin-right: 8px;
      }
    }
  }
</style>
