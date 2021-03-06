<template>
  <div class="item row justify-between items-start">
      <div class="item__id col-1">
          <span>{{ ride.id }}</span>
      </div>
      <div class="item__user column col-3">
          <q-input class="fakePhoneInput" borderless v-model="phoneUnmasked" :mask="phoneMask" readonly/>
          <span> {{ ride.client.name }} </span>
      </div>
      <div class="item__ride column col-3">
          <div class="item__user column col-3 q-mb-md">
              <span class="item__text-secondary">{{ positionString }}</span>
              <span ref="firstAddress" class="item__point items__point_first">{{ ride.position.text || 'No information'}}</span>
          </div>
          <div class="item__user column col-3">
              <span class="item__text-secondary">{{ destinationString }}</span>
              <span class="item__point">{{ ride.destination.text || 'No information'}}</span>
          </div>
      </div>
      <div class="item__date col-2 column">
          <div class="q-mb-xs">{{ dateString }}</div>
          <div class="q-mb-xs">{{ timeString }}</div>
          <div>{{ utcString }}</div>
      </div>
      <div class="item__status col-2 column" style="align-items: flex-start">
          <div
            class="item__status-default"
            :class="{
              'item__status-template' : (ride.ride_status_name === 'template'),
              'item__status-done' : (ride.ride_status_name === 'archived'),
              'item__status-inprocess' : (ride.ride_status_name === 'searching' || ride.ride_status_name === 'in-progress'),
              'item__status-rejected' : ride.ride_status_name === 'expired' || ride.ride_status_name === 'failed' || ride.ride_status_name === 'canceled' }"
          >
            {{ status }}
          </div>
          <q-btn
            v-if="this.ride.ride_status_name === 'template' ||
                  this.ride.ride_status_name === 'in-progress'"
            color="white"
            class="item__btn"
            unelevated
            no-caps
            rounded
            @click="cancelingCheck()"
          >
            <q-icon class="item__btn__icon" color="white">
              <svg id="Capa_1" style="transform: rotate(45deg);box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%;" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
            </q-icon>
            <span>Отменить</span>
          </q-btn>
      </div>
      <div class="item__sum col-1">
          <span v-if="isCostAvailable"><strong>{{ cost }}</strong>{{ currency }}</span>
      </div>

      <q-dialog v-model="CancelConfirmModal">
        <CancelConfirmModal @cancel-order="cancelOrder"/>
      </q-dialog>

      <q-dialog v-model="BaseErrorModal">
        <BaseErrorModal text="Отмена этого заказа сейчас недоступна" @modal-close="$emit('update-rides')"/>
      </q-dialog>

      <q-dialog v-model="Loading">
        <Loading/>
      </q-dialog>
  </div>
</template>

<script>

import { AsYouType } from 'libphonenumber-js'
import { getMask } from '../../phone_masks.js'
import { mapActions } from 'vuex'
import BaseErrorModal from 'components/BaseErrorModal'
import Loading from 'components/Loading'
import CancelConfirmModal from 'components/Orders/CancelConfirmModal'

export default {
  name: 'OrdersItem',

  components: {
    CancelConfirmModal,
    BaseErrorModal,
    Loading
  },

  props: {
    ride: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      inn: null,
      email: null,
      password: null,
      repPassword: null,
      CancelConfirmModal: false,
      BaseErrorModal: false,
      Loading: false,

      statusDone: false,
      statusRejected: false
    }
  },

  methods: {
    ...mapActions({
      loadRideStatus: 'rides/loadRideStatus'
    }),
    cancelingCheck () {
      this.Loading = true
      this.loadRideStatus({
        uuid: this.ride.uuid,
        provider: this.ride.provider,
        client_id: this.ride.payment.billing_id
      })
        .then((response) => {
          this.Loading = false
          if (response.data.ride.ride_status_name === 'in-progress') this.CancelConfirmModal = true
          else this.BaseErrorModal = true
        })
        .finally(() => { this.Loading = false })
    },
    cancelOrder () {
      console.log('canceling')
      if (this.ride.ride_status_name === 'template') {
        this.$root.$emit('canceledTemplated', this.ride.id)
      } else {
        this.$root.$emit('canceledRide', {
          uuid: this.ride.uuid,
          provider: this.ride.provider,
          client_id: this.ride.payment.billing_id

        })
      }
    }
  },

  computed: {
    positionString () {
      const country = (this.ride.position.country === 'Not found') ? '' : this.ride.position.country
      const city = (this.ride.position.city === 'Not found') ? '' : this.ride.position.city
      const comma = (city && country) ? ', ' : ''
      return (this.ride.position.country) ? country + comma + city : 'No information'
    },
    destinationString () {
      const country = (this.ride.destination.country === 'Not found') ? '' : this.ride.destination.country
      const city = (this.ride.destination.city === 'Not found') ? '' : this.ride.destination.city
      const comma = (city && country) ? ', ' : ''
      return (this.ride.destination.country) ? country + comma + city : 'No information'
    },
    dateString () {
      return this.ride.start_at.slice(0, 10).split('-').reverse().join('.')
    },
    timeString () {
      return this.ride.start_at.slice(11, 16)
    },
    utcString () {
      const utc = parseInt(this.ride.start_at.slice(19, 22))
      return 'UTC' + ((utc >= 0) ? '+' : '') + utc
    },
    phoneUnmasked () {
      const phone = new AsYouType()
      return phone.input(this.ride.phone)
    },
    isCostAvailable () {
      return !(this.ride.ride_status_name === 'searching' ||
              this.ride.ride_status_name === 'in-progress' ||
              this.ride.ride_status_name === 'template' ||
              !(this.ride.payment.status === 'CONFIRMED' || this.ride.payment.status === 'NEW'))
    },
    cost () {
      return this.ride.payment.amount.amount + ' ' || '-'
    },
    currency () {
      return (this.ride.payment.amount.currency === 'RUB') ? '₽' : this.ride.payment.amount.currency
    },
    status () {
      switch (this.ride.ride_status_name) {
        case 'searching':
        case 'in-progress':
          return 'В процессе'
        case 'archived':
          return 'Выполнен'
        case 'template':
          return 'Запланирован'
        case 'canceled':
        case 'failed':
        case 'expired':
          return 'Отменен'
        default:
          return this.ride.ride_status_name
      }
    },
    phoneMask () {
      const phone = new AsYouType()
      phone.input(this.ride.phone)
      return getMask(phone.getNumber().country, phone.getNumber().number)
    }
  }

}
</script>

<style scoped>
    .item {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      color: #222734;
      padding: 1.0625em 2.9375em 1.8em 2.2em;
      margin-bottom: 1em;
      width: 100%;
      border-radius: 0 10px 10px 10px;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26);
      border: solid 1px #f5f4fb;
      background-color: #ffffff;
    }
    .item:hover {
      background-color: #f7f7ff;
    }
    .item__text-secondary {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.8575em;
      color: #d0cee1;
    }

    .item__id,
    .item__date,
    .item__status,
    .item__sum {
      margin-top: 0.6em;
    }

    .item__user {
      /* margin-top: -0.2em; */
    }
    .item__status-default {
      color: #000;
    }

    .item__status-inprocess {
      color: #009dff;
    }

    .item__status-template {
      color: #6a6e6d;
    }

    .item__status-done {
      color: #0bdcc7;
    }
    .item__status-rejected {
      color: #ec5454;
    }

    .item__point {
      position: relative;
    }
    .item__point::before {
      position: absolute;
      content: '';
      display: block;
      width: 0.75em;
      height: 0.75em;
      top: 0.4em;
      left: -2em;
      border-radius: 50px;
      box-shadow: 0px 1px 5px 0 rgba(104, 57, 190, 0.22);
      border: solid 1px #ffffff;
      background-color: #6a87f2;
    }
    .items__point_first::before {
       background-color: #b57be4;
    }

    .item__ride {
      position: relative;
    }
    .item__ride::before {
      position: absolute;
      content: '';
      display: block;
      top: 1.5em;
      left: -1.8em;

      width: 4px;
      height: 75%;
      border-radius: 2px;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26);
      background-color: #f7f7ff;
    }

    .item__btn {
      display: none;
      /* max-width: 160px; */
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      margin-top: 1em;
      margin-left: -1.6em;
      background: #ec5454 !important;
    }

    .item:hover .item__btn {
      display: block;
    }

    .item__btn__icon {
        width: 0.5625em;
        height: 0.5625em;
        margin-right: 0.5em;
    }
</style>
