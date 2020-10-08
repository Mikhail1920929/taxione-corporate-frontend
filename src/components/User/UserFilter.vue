<template>
  <header class="user__filter__header">
      <div class="row justify-start items-center">

        <div class="header__info header__info_title row items-center" @click.self="dateSearching">
          <q-icon class="header__date_i" color="accent" @click.self="dateSearching">
            <svg class="userDateIcon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; margin-top: -0.2em" xml:space="preserve">
            <g>
              <g>
                <path class="userDateIcon" d="M492,352c11.046,0,20-8.954,20-20V120c0-44.112-35.888-80-80-80h-26V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20
                  v20h-91V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v20h-90V20c0-11.046-8.954-20-20-20s-20,8.954-20,20v20H80
                  C35.888,40,0,75.888,0,120v312c0,44.112,35.888,80,80,80h352c44.112,0,80-35.888,80-80c0-11.046-8.954-20-20-20
                  c-11.046,0-20,8.954-20,20c0,22.056-17.944,40-40,40h-76V352H492z M472,312H356V192h116V312z M156,472H80
                  c-22.056,0-40-17.944-40-40v-80h116V472z M156,312H40V192h116V312z M316,472H196V352h120V472z M316,312H196V192h120V312z M40,152
                  v-32c0-22.056,17.944-40,40-40h25v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80h90v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80
                  h91v20c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80h26c22.056,0,40,17.944,40,40v32H40z"/>
              </g>
            </g>
            </svg>
          </q-icon>
          <strong class="userDateIcon dateString" v-text="dateString" @click.self="dateSearching"></strong>

          <div class="user__calendar" :class="{ user__calendar_show: dateIsSearching}" :thumb-style="thumbStyle">
            <date-range-picker
                    ref="userCal"
                    @select="updateRange"
                    @reset="clearDates"
                    class="calendar"
                    :class="{ calendar_show: dateIsSearching}"
                    panel="month"
                    width="1em"
                    locale="ru"
                    :panels="[ 'month' ]"
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

        <div class="header__info">
          <span>Количество поездок: <strong v-text="currentInfo.rides_count"></strong></span>
        </div>

        <div class="header__info">
          <span>Потрачено:
            <strong v-if="this.user.is_unlimited">Безлимит</strong>
            <span v-else>
              <strong v-text="currentInfo.rides_sum"></strong> из <strong>{{ currentUser.limit }}</strong>
            </span>
          </span>
        </div>

        <div class="header__info">
          <span>Остаток:  <strong>{{ balance }}</strong></span>
        </div>

      </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserFilter',

  props: {
    user: {
      type: Object,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      dateString: '',
      dateFrom: null,
      dateTo: null,
      dateIsSearching: false,
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      resetBtn: null
    }
  },

  mounted () {
    window.addEventListener('click', (e) => {
      if (this.dateIsSearching &&
          e.target.classList[1] !== 'header__info_title' &&
          e.target.classList[0] !== 'userDateIcon' &&
          e.target.localName !== 'svg' &&
          e.target.localName !== 'path') {
        this.dateIsSearching = false
      }
    })
  },

  updated () {
    document.getElementsByClassName('mj-daterange-picker-controls')[0].style.display = 'none'
    this.resetBtn = document.getElementsByClassName('mj-daterange-picker-reset')[0]
    this.dateString = `Данные за ${this.$refs.userCal.currentMonthName}`
  },

  computed: {
    ...mapGetters({
      userRidesInfo: 'users/userRidesInfo'
    }),
    currentUser () {
      return this.user
    },
    currentInfo () {
      return this.info
    },
    balance () {
      return (this.user.is_unlimited) ? 'Безлимит' : this.user.balance + ' ₽'
    },
    thumbStyle () {
      return {
        opacity: 0
      }
    }
  },

  methods: {
    dateSearching () {
      this.dateIsSearching = !this.dateIsSearching
    },
    updateRange (date) {
      this.dateIsSearching = false
      this.dateTo = date.to.slice(0, 10)
      this.dateFrom = date.from.slice(0, 10)
      this.dateString = `Данные за ${this.$refs.userCal.currentMonthName}`
      this.$root.$emit('datesChangedUser', {
        from: this.dateFrom + 'T00:00:00+00:00' || null,
        to: this.dateTo + 'T23:59:59+00:00' || null
      })
    },
    resetDate () {
      let event = new Event('click')
      this.resetBtn.dispatchEvent(event)
      this.$refs.userCal.preset = 'custom'
    },
    clearDates () {
      this.dateFrom = null
      this.dateTo = null
    }
  }

}
</script>

<style>
    .user__filter__header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 1.375em 1.875em;
      margin-bottom: 0.715em;
      border-radius: 0 0 30px 0;
    }

    .user__filter__header .header__info {
      position: relative;
      padding: 0.7em 1.66em;
      border-radius: 18px;
      border: solid 1px #f9f9f9;
      background-color: #ffffff;
      font-size: 0.75rem;
      color: #30323c;
      margin-right: 2.375em;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
    }

    .user__filter__header .header__info_title {
      z-index: 1;
      padding: 0.7em 1.66em;
      width: 220px;
    }

    .user__filter__header .header__date_i {
      margin-top: 0.1em;
      margin-right: 0.5em;
    }

    .user__filter__header .dateString {
      margin: 0 auto;
      font-size: 0.9em;
    }

    .user__calendar {
      position: absolute;
      display: block;
      top: 0;
      left: 0;

      width: 100%;
      height: 0;
      z-index: -1;

      border-radius: 18px;
      box-shadow: 0px 5px 18px 0 rgba(231, 234, 246, 0.79);

      transition: all 0.15s ease 0.2s;
    }

    .user__calendar_show {
      height: 380px;
      background: #ffffff;
      padding: 2em 0 0 0;
    }

    .user__calendar .calendar {
      visibility: hidden;
      opacity: 0;
      transition: all 0.25s ease 0.1s;
    }
    .user__calendar .calendar_show {
      visibility: visible;
      opacity: 1;
      border-radius: 18px;
    }

    .user__calendar .mj-daterange-picker {
      min-width: 217px;
    }

    .user__calendar .mj-calendar {
      padding: 10px;
      border-radius: 18px;
    }

    .user__calendar .header__select_answers {
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
    .user__calendar .header__select_answers_show {
      height: 200px;
    }

    .user__calendar .calendar-header {
      border-radius: 7px !important;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26)  !important;
      background-color: #f7f7ff  !important;
      padding: 0.5em 0.7em !important;
    }

    .user__calendar .calendar-months {
      grid-template-columns: 1fr 1fr;
      margin-top: 12px;
    }

    .user__calendar .calendar-months .month {
      padding: 5px;
      height: 40px;
      font-size: 1em;
      font-weight: bold;
      font-family: 'Open Sans', sans-serif;
      color: #d0cee1;
    }
    .user__calendar .calendar-months .month:hover {
      border-radius: 7px !important;
    }
    .user__calendar .month.is-selected {
      color: black !important;
      border-radius: 7px !important;
    }
    .user__calendar .preset-ranges {
      display: none !important;
    }
</style>
