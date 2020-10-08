<template>
  <header class="archive__header">
      <div class="row orders__row">
          <div class="col-6 header__title row items-center">Архив</div>
          <div class="col-6 header__firm row items-center justify-end" v-if="getCompanyInfo">{{getCompanyInfo.name}}</div>
      </div>
      <div class="row">
          <div class="col-6">
              <div class="header__date">
                <q-icon class="header__date_icon" color="accent">
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; margin-top: -0.2em" xml:space="preserve">
                  <g>
                    <g>
                      <path d="M492,352c11.046,0,20-8.954,20-20V120c0-44.112-35.888-80-80-80h-26V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20
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

                <input
                  type="text"
                  readonly
                  class="header__date_input"
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
                  round
                  color="accent"
                  size="sm"
                  text-color="white"
                  icon="keyboard_arrow_down"
                  @click="dateSearching"
                />

                <div class="header__select_answers " :class="{ header__select_answers_show: dateIsSearching}" :thumb-style="thumbStyle">
                  <date-range-picker
                  ref="archCal"
                  @select="updateRange"
                  @reset="clearDates"
                  class="calendar"
                  :class="{ calendar_show: dateIsSearching}"
                  panel="range"
                  width="1em"
                  locale="ru"
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
          </div>
          <div class="col-6"></div>
      </div>
  </header>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'ArchiveHeader',

  data () {
    return {
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
          if (!(this.$refs.archCal.values.from && this.$refs.archCal.values.to)) {
            if (this.$refs.archCal.values.from || this.$refs.archCal.values.to) this.resetDate()
          }
        }
      }
    })
  },

  computed: {
    ...mapGetters({
      getCompanyInfo: 'settings/companyInfo',
      subInfo: 'archive/subInfo'
    }),
    thumbStyle () {
      return {
        opacity: 0
      }
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
      if (!(this.$refs.archCal.values.from && this.$refs.archCal.values.to)) {
        if (this.$refs.archCal.values.from || this.$refs.archCal.values.to) this.resetDate()
      }
    },
    updateRange (date) {
      this.dateIsSearching = false
      this.dateTo = date.to.slice(0, 10)
      this.dateFrom = date.from.slice(0, 10)
      this.$root.$emit('datesChangedArchive', {
        from: this.dateFrom + 'T00:00:00+00:00' || this.subInfo.start,
        to: this.dateTo + 'T23:59:59+00:00' || this.subInfo.end
      })
    },
    resetDate () {
      let event = new Event('click')
      this.resetBtn.dispatchEvent(event)
      this.$refs.archCal.preset = 'custom'
    },
    clearDates () {
      this.dateFrom = null
      this.dateTo = null
      this.$root.$emit('datesChangedArchive', {
        from: this.subInfo.start,
        to: this.subInfo.end
      })
    }
  }

}
</script>

<style>
    .archive__header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 0.9em 2.15em 2.4em;
      margin-bottom: 1.7em;
      border-radius: 0 30px 0 0;
    }
    .orders__row {
      padding-bottom: 1.2em;
    }

    .header__title {
      font-size: 2.25rem;
      letter-spacing: 0.03em
    }

    .header__firm {
      font-size: 1.6em;
      letter-spacing: 1.5px;
      color: #716a98;
    }

    .header__date {
      position: relative;
      width: 28.7em;
      z-index: 1;
    }
    .header__date_input {
      position: relative;
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
      z-index: 10;
    }
    .header__date_btn {
      position: absolute;
      top: 0.09em;
      right: 0;

      transition: all 0.15s ease 0.15s;
    }
    .header__date_btn_rotated {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
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
