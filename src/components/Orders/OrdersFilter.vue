<template>
  <header class="filter__header">
      <div class="row justify-start items-center">

        <div class="header__date">
          <q-icon class="header__date_icon" color="accent">
            <svg x="0px" y="0px" viewBox="0 0 512 512" style="margin-top: -0.2em">
              <path d="M492,352c11.046,0,20-8.954,20-20V120c0-44.112-35.888-80-80-80h-26V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20
                v20h-91V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v20h-90V20c0-11.046-8.954-20-20-20s-20,8.954-20,20v20H80
                C35.888,40,0,75.888,0,120v312c0,44.112,35.888,80,80,80h352c44.112,0,80-35.888,80-80c0-11.046-8.954-20-20-20
                c-11.046,0-20,8.954-20,20c0,22.056-17.944,40-40,40h-76V352H492z M472,312H356V192h116V312z M156,472H80
                c-22.056,0-40-17.944-40-40v-80h116V472z M156,312H40V192h116V312z M316,472H196V352h120V472z M316,312H196V192h120V312z M40,152
                v-32c0-22.056,17.944-40,40-40h25v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80h90v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80
                h91v20c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80h26c22.056,0,40,17.944,40,40v32H40z"/>
            </svg>
          </q-icon>
          <input
            type="text"
            class="header__date_input"
            readonly
            :class="{ header__date_input_white: dateIsSearching}"
            :placeholder="dateString"
            @click="dateSearching"
          >
          <q-icon v-show="dateFrom"  @click="resetDate" class="cursor-pointer header__date_reset">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
          </q-icon>

          <q-btn
            class="header__date_btn"
            :class="{ header__date_btn_rotated: dateIsSearching}"
            unelevated
            round color="accent"
            size="sm"
            text-color="white"
            icon="keyboard_arrow_down"
            @click="dateSearching"
          />

          <div class="header__select_answers" :class="{ header__select_answers_show: dateIsSearching}" :thumb-style="thumbStyle">
            <date-range-picker
            ref="cal"
            @select="updateRange"
            @reset="clearDates"
            class="calendar"
            :class="{ calendar_show: dateIsSearching}"
            panel="range"
            width="1em"
            locale="ru"
            :from="start"
            :to="end"
            :panels="[ 'range' ]"
            :showControls="true"
            :theme="{
              primary: '#f7f7ff',
              secondary: '#000000',
              ternary: '#000000',
              border: '#ffffff',
              light: '#ffffff',
              dark: '#000000',
              hovers: {
                day: '#f7f7ff',
                range: '#f7f7ff'
              }
            }"
          />
          </div>
        </div>

        <div class="row header__info">
          <div class="header__amount">
            <span>Количество заказов: {{ rides_count }}</span>
          </div>

          <div class="header__sum">
            <span>Сумма: {{ rides_sum }}</span>
          </div>
        </div>

        <div class="header__search">
          <input type="text" class="header__search_input" placeholder="Поиск заказа" v-model="searchString" @keyup.enter="orgSearch">
          <q-icon v-show="searchString"  @click="clearOrgSearch" class="cursor-pointer header__date_reset">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
          </q-icon>
          <q-btn class="header__search_btn" round color="accent" size="sm" text-color="white" icon="search" @click="orgSearch" />
        </div>

      </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrdersFilter',

  props: {
    period: {}
  },

  data () {
    return {
      dateFrom: this.period.start || null,
      dateTo: this.period.end || null,
      dateIsSearching: false,
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      resetBtn: null,
      searchString: null
    }
  },

  mounted () {
    document.getElementsByClassName('mj-daterange-picker-controls')[0].style.display = 'none'
    this.resetBtn = document.getElementsByClassName('mj-daterange-picker-reset')[0]

    window.addEventListener('click', (e) => {
      if (this.dateIsSearching && e.target.localName !== 'input' && e.target.innerText !== 'keyboard_arrow_down') {
        let isInCal = false
        for (const item of e.path) {
          if (item.classList && item.classList[0] === 'mj-daterange-picker') {
            isInCal = true
            break
          }
        }
        if (!isInCal) {
          this.dateIsSearching = false
          if (!(this.$refs.cal.values.from && this.$refs.cal.values.to)) {
            if (this.$refs.cal.values.from || this.$refs.cal.values.to) this.resetDate()
          }
        }
      }
    })
  },

  computed: {
    ...mapGetters({
      subInfo: 'rides/subInfo'
    }),
    thumbStyle () {
      return {
        opacity: 0
      }
    },
    start () {
      return this.period.start.slice(0, 10) || ''
    },
    end () {
      return this.period.end.slice(0, 10) || ''
    },
    rides_count () {
      return (this.subInfo) ? this.subInfo.rides_count : ' '
    },
    rides_sum () {
      return (this.subInfo) ? this.subInfo.rides_sum : ' '
    },
    dateString () {
      if (this.dateFrom && this.dateTo) {
        return `Период: ${this.dateFrom.split('-').reverse().join('.')} - ${this.dateTo.split('-').reverse().join('.')}`
      } else {
        return 'Выберите промежуток...'
      }
    }
  },

  methods: {
    dateSearching () {
      this.dateIsSearching = !this.dateIsSearching
      if (!(this.$refs.cal.values.from && this.$refs.cal.values.to)) {
        if (this.$refs.cal.values.from || this.$refs.cal.values.to) this.resetDate()
      }
    },
    updateRange (data) {
      this.dateIsSearching = false

      this.dateTo = data.to.slice(0, 10)
      this.dateFrom = data.from.slice(0, 10)
      this.$root.$emit('datesChanged', {
        from: this.dateFrom + 'T00:00:00+00:00' || this.subInfo.start,
        to: this.dateTo + 'T23:59:59+00:00' || this.subInfo.end
      })
    },
    resetDate () {
      let event = new Event('click')
      this.resetBtn.dispatchEvent(event)
      this.$refs.cal.preset = 'custom'
    },
    clearDates () {
      this.dateFrom = null
      this.dateTo = null
      this.$root.$emit('datesChanged', {
        from: this.subInfo.start,
        to: this.subInfo.end
      })
    },
    clearOrgSearch () {
      this.searchString = null
      this.$root.$emit('orgSearching', this.searchString)
    },
    orgSearch () {
      const onlyNumeric = this.searchString.replace(/[^0-9]/gim, '')
      if (this.searchString && onlyNumeric.length === 11) {
        this.$root.$emit('orgSearching', '+' + onlyNumeric)
      }
      this.$root.$emit('orgSearching', this.searchString)
    }
  }

}
</script>

<style>
    .filter__header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 1.375em 1.875em;
      margin-bottom: 1.65em;
      border-radius: 0 0 30px 0;
    }
    .header__date {
      position: relative;
      margin: 0;
      padding: 0;
      margin-right: 2.375em;
      z-index: 1;
    }
    .header__amount {
      padding: 0.7em 1.66em;
      border-radius: 18px;
      border: solid 1px #f9f9f9;
      background-color: #ffffff;
      font-size: 0.75rem;
      color: #30323c;
      margin-right: 2em;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);

    }
    .header__sum {
      padding: 0.7em 1.66em;
      border-radius: 18px;
      border: solid 1px #f9f9f9;
      background-color: #ffffff;
      font-size: 0.75rem;
      color: #30323c;
      margin-right: auto;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
    }
    @media (max-width: 1272px) {
      .header__info {
        margin-top: 0.5em;
        order: 3;
      }
    }
    @media (min-width: 1311px) and (max-width: 1323px) {
      .header__info {
        margin-top: 0.5em;
        order: 3;
      }
    }

    .header__date {
      position: relative;
      min-width: 18em;
    }
    .header__date_input {
      min-width: 402px;
      padding: 0.4em 3.5em 0.4em 2.3em;
      outline: none;
      border-radius: 18px;
      border: none;
      background-color: #ffffff;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);

      transition: all 0.1s ease 0.3s;
    }
    .header__date_reset {
      position: absolute;
      top: 0.7em;
      right: 2.5em;
      color: #9a9ba9;
    }
    .header__date_input_white {
      box-shadow: inset 0px 2px 0px 0px rgba(185,191,221,0);
    }
    .header__date_icon {
      position: absolute;
      top: 0.7em;
      left: 0.8em;
    }
    .header__date_btn {
      position: absolute;
      top: 0.09em;
      right: 0;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;

      transition: all 0.15s ease 0.15s;
    }
    .header__date_btn_rotated {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }

    .header__search {
      position: relative;
      margin-left: auto;
    }
    .header__search_input {
      font-size: 14px;
      padding: 0.4em 3.5em 0.4em 1em;
      outline: none;
      border-radius: 18px;
      border: solid 1px #f9f9f9;
      background-color: #ffffff;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
    }

    .header__search_input::placeholder {
      font-size: 12px;
      font-family: 'Open Sans', sans-serif;
      color: rgb(208, 206, 225);

    }

    @media (max-width: 1313px) {
      .header__search_input {
      padding: 0.3em 3.5em 0.3em 1em;
    }
    }
    .header__search_btn {
      position: absolute;
      top: 0.2em;
      right: 0;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
    }

    .header__select_answers {
      position: absolute;
      display: block;
      top: 0.1em;
      left: 0;

      width: 100%;
      height: 0;
      background: #ffffff;
      z-index: -1;

      padding: 2em 0 0 0;
      border-radius: 18px;
      box-shadow: 0px 5px 18px 0 rgba(231, 234, 246, 0.79);

      transition: height 0.15s ease 0.2s;
    }
    .calendar {
      visibility: hidden;
      opacity: 0;
      transition: all 0.25s ease 0.1s;
    }
    .calendar_show {
      visibility: visible;
      opacity: 1;
    }
    .header__select_answers_show {
      height: 355px;
    }

    .calendar-header {
      border-radius: 7px !important;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26)  !important;
      background-color: #f7f7ff  !important;
      padding: 0.5em 0.7em !important;
    }
    .calendar-days .day {
      font-weight: bold !important;
      font-family: 'Open Sans', sans-serif !important;
      color: #d0cee1 !important;
    }
    .calendar-days .day:hover {
      border-radius: 7px !important;
    }
    .calendar-days .is-in-range {
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;
      border-top-right-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
    .calendar-days .day.is-first-range {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
      border-top-right-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
    .calendar-days .is-in-range:hover {
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
    }
    .calendar-days-name .day {
      font-size: 0.75em !important;
      text-transform: uppercase !important;
      color: #222734 !important;
      margin: 0.625em 0 !important;
    }
    .day.is-selected,
    .day.is-first-range,
    .day.is-edge-range,
    .day.is-last-range {
      color: black !important;
    }
    .preset-ranges {
      display: none !important;
    }
    .day.is-first-range {
      border-radius: 10px !important;
    }
    .day.is-selected.is-first-range {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
      border-top-right-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
    .day.is-selected.is-last-range {
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    }
</style>
