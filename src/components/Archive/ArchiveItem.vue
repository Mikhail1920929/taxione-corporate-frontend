<template>
  <div class="item row justify-between items-center">
      <div class="item__period col-sm-1 col-md-2">
          <span>{{dateStringStart}} - {{dateStringEnd}}</span>
      </div>
      <div class="item__sum col-2">
          <span>{{ period.total_amount }} ₽</span>
      </div>
      <div
        class="item__status col-2"
        :class="{ 'item__status-paid': period.status}"
      >
          <span>{{ (period.status) ? 'Оплачено' : 'В ожидании' }}</span>
      </div>
      <div class="item__act row items-center col-sm-4 col-md-3">
          <div class="item__download row items-center">
            <button @click="showBlankAct">
              <q-icon class="item__icon">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.142 512.142" style='width: 0.5em;fill:inherit;stroke:purple;stroke-width:2' xml:space="preserve">
                <g>
                  <g>
                    <path d="M479.304,15.801c-2.539-9.237-10.965-15.659-20.565-15.659l-3.563-0.043c-16.149-0.277-58.731-1.003-111.339,14.443
                      C226.568,48.953,144.605,154.745,138.952,277.475H53.405c-8.619,0-16.427,5.184-19.712,13.163
                      c-3.307,7.979-1.472,17.152,4.629,23.253l192,192c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251l192-192
                      c6.101-6.101,7.936-15.275,4.629-23.253c-3.285-7.979-11.093-13.163-19.712-13.163H327.624
                      c-4.075-41.472,0.085-153.216,142.037-237.675C477.896,34.894,481.864,25.081,479.304,15.801z"/>
                  </g>
                </g>
                </svg>
              </q-icon>
              Скачать</button>
          </div>
          <div class="item__act_splitter"></div>
          <div class="item__upload row items-center">
            <button @click="$refs.fileInput.click()" class="row items-center" :class="{act_uploaded: period.act_uploaded}">
              <q-icon class="item__icon" :class="{ icon_act_uploaded: period.act_uploaded }">
                <svg v-if="!period.act_uploaded" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.142 512.142" style='width: 0.5em;transform: scaleX(-1);fill:inherit;stroke:purple;stroke-width:2' xml:space="preserve">
                <g>
                  <g>
                    <path d="M450.944,453.437c-136.295-81.1-140.268-188.436-136.377-228.167h105.411c8.294,0,15.77-4.977,18.924-12.636
                      c3.174-7.66,1.413-16.466-4.444-22.323L250.137,5.99c-7.987-7.987-20.951-7.987-28.959,0L36.858,190.31
                      c-5.857,5.857-7.619,14.664-4.444,22.323c3.174,7.659,10.65,12.636,18.924,12.636h82.002
                      c4.854,117.74,84.439,220.488,198.533,253.399c39.649,11.448,72.97,13.128,92.59,13.128c5.161,0,9.359-0.123,12.493-0.205
                      l3.502-0.082c9.216,0,17.306-6.144,19.743-15.032C462.658,467.569,458.869,458.148,450.944,453.437z"/>
                  </g>
                </g>
                </svg>
                <svg v-else version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="45.701px" height="45.7px" viewBox="0 0 45.701 45.7" style="width: 9px; enable-background:new 0 0 45.701 45.7;" xml:space="preserve"
                  >
                <g>
                  <g>
                    <path d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504
                      c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0
                      c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"/>
                  </g>
                </g>
                </svg>
              </q-icon>{{ (period.act_uploaded) ? 'Загружено' : 'Загрузить' }}
              </button>
              <input ref="fileInput" type="file" accept="application/pdf" name="name" style="display: none;" @change="tryToSendAct" @click="$refs.fileInput.value = null"/>
          </div>
      </div>
      <div class="item__bill col-2">
          <div class="item__download row items-center">
            <button @click="showPeriod" href="#" class="row items-center">
              <q-icon class="item__icon">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.142 512.142" style='width: 0.5em;fill:inherit;stroke:purple;stroke-width:2' xml:space="preserve">
                <g>
                  <g>
                    <path d="M479.304,15.801c-2.539-9.237-10.965-15.659-20.565-15.659l-3.563-0.043c-16.149-0.277-58.731-1.003-111.339,14.443
                      C226.568,48.953,144.605,154.745,138.952,277.475H53.405c-8.619,0-16.427,5.184-19.712,13.163
                      c-3.307,7.979-1.472,17.152,4.629,23.253l192,192c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251l192-192
                      c6.101-6.101,7.936-15.275,4.629-23.253c-3.285-7.979-11.093-13.163-19.712-13.163H327.624
                      c-4.075-41.472,0.085-153.216,142.037-237.675C477.896,34.894,481.864,25.081,479.304,15.801z"/>
                  </g>
                </g>
                </svg>
              </q-icon>
              Скачать</button>
          </div>
      </div>
      <div class="item__orders col-1">
          <button class="item__open" @click="ArchiveRidesModal = true">Открыть</button>
      </div>

      <q-dialog v-model="SettingsFileSendedModal">
        <SettingsFileSendedModal :text="fileText" />
      </q-dialog>

      <q-dialog v-model="ArchiveError">
        <ArchiveError :text="errorText"/>
      </q-dialog>

      <q-dialog v-model="ArchiveRidesModal" full-width>
        <ArchiveRidesModal :dates="datesForModal"/>
      </q-dialog>

      <q-dialog v-model="Loading">
        <Loading/>
      </q-dialog>
  </div>
</template>

<script>
import SettingsFileSendedModal from 'components/Settings/SettingsFileSendedModal'
import ArchiveError from 'components/Archive/ArchiveError'
import Loading from 'components/Loading'
import ArchiveRidesModal from 'components/Archive/ArchiveRidesModal'
import { mapActions } from 'vuex'

export default {
  name: 'Registration',

  components: {
    SettingsFileSendedModal,
    ArchiveError,
    ArchiveRidesModal,
    Loading
  },

  data () {
    return {
      inn: null,
      email: null,
      password: null,
      repPassword: null,
      SettingsFileSendedModal: false,
      fileText: '',
      ArchiveError: false,
      errorText: '',
      ArchiveRidesModal: false,
      datesForModal: {
        dateTo: '3000-03-15',
        dateFrom: '2000-02-15'
      },
      Loading: false
    }
  },

  props: {
    period: {
      required: true,
      type: Object
    }
  },

  mounted () {
    this.datesForModal.dateFrom = this.period.start_at.slice(0, 10)
    this.datesForModal.dateTo = this.period.end_at.slice(0, 10)
  },

  computed: {
    dateStringStart () {
      return this.period.start_at.slice(0, 10).split('-').reverse().join('.')
    },
    dateStringEnd () {
      return this.period.end_at.slice(0, 10).split('-').reverse().join('.')
    }
  },

  methods: {
    ...mapActions({
      sendAct: 'archive/sendAct'
    }),

    showBlankAct () {
      window.open(this.period.act_url)
    },
    showPeriod () {
      window.open(this.period.period_url)
    },

    tryToSendAct () {
      let file = this.$refs.fileInput.files[0]
      let act = new FormData()
      act.append('act', file)
      let data = {
        'act': act,
        'periodId': this.period.id
      }
      this.Loading = true
      this.sendAct(data)
        .then((response) => {
          this.fileText = response.data.message
          this.SettingsFileSendedModal = true
          this.$root.$emit('actUploaded')
          setTimeout(() => { this.SettingsFileSendedModal = false }, 1200)
        })
        .catch((error) => {
          this.errorText = (error.response.data.errors) ? error.response.data.errors.act[0] : error.response.data.message
          if (error.response.status === 413) this.errorText = 'Что-то пошло не так. Возможно, файл слишком большого размера.'
          this.ArchiveError = true
        })
        .finally(() => {
          this.Loading = false
        })
    }
  }

}
</script>

<style scoped>
    .item {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      color: #222734;
      padding: 1em 2.9375em 1em 2em;
      margin-bottom: 0.6875em;
      width: 100%;
      border-radius: 10px;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26);
      border: solid 1px #f5f4fb;
      background-color: #ffffff;
    }
    .item:hover {
      background-color: #f7f7ff;
    }
    .item:hover .item__icon {
      color: #836af2;
    }

    .item__icon {
        color: #b1b3da;
        border-radius: 50%;
        background: #ffffff;
        margin-right: 0.5em;
        width: 1.1875em;
        height: 1.1875em;
        box-shadow: 0px 1px 5px 0 rgba(104, 57, 190, 0.22);
    }
    .icon_act_uploaded {
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
      color: #ffffff !important;
    }

    @media (max-width: 1300px) {
      .item__sum {
        padding-left: 1em;
      }
    }

    .item__status-paid {
      color: #43d7c7;
    }
    .item__status {
      color: #bec0e0;
    }

    .item button {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      color: #222734;
      text-decoration: none;
      background: none;
      border: none;
      outline: none;
    }
    .item button:hover {
      text-decoration: underline;
    }

    .item button.act_uploaded {
      color: #43d7c7;
    }
    .item__act_splitter {
        width: 1px;
        height: 42px;
        background-color: #f5f4fb;
        margin: 0 0.9375em;
    }

    .item__download .item__icon {
      margin-top: -0.2em;
      margin-left: -1.2em;
    }

    .item__upload button:hover .item__icon {
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
      color: #ffffff !important;
      box-shadow: 0;
    }

    .item__download button:hover .item__icon {
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
      color: #ffffff !important;
      box-shadow: 0;
    }

    .item__open {
      font-weight: bold;
      border-radius: 18px;
      outline: none;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.48);
      border: solid 1px rgba(245, 244, 251, 0.79);
      padding: 0.51em 1.1em;
      border: none;
      background: #ffffff;
      margin-left: -1.2em;
    }
    .item__open:hover {
      cursor: pointer;
      color: #ffffff;
      box-shadow: 0px 1px 5px 0 rgba(104, 57, 190, 0.22);
      background-image: linear-gradient(-150deg, #836af2, #6a87f2);
    }
</style>
