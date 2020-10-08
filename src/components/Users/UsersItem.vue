<template>
  <div class="item row justify-between items-center" @click="(e) => goToUser(e)">
      <div class="item__user column col-3">
          <span class="item__user_post">{{ (user.group) ? user.group.name : '-' }}</span>
          <span>{{ user.name }}</span>
      </div>
      <div class="item__number col-2">
          <q-input class="fakePhoneInput" borderless v-model="phoneUnmasked" :mask="phoneMask" readonly/>
      </div>
      <div class="item__sum col-2">
          <span><strong>{{ user.rides_sum }}</strong> ₽</span>
      </div>
      <div class="item__amount col-2">
          <span>{{ user.rides_count }}</span>
      </div>
      <div class="item__bill col-2">
          <span>{{ balance }}</span>
      </div>
      <div class="item__btns col-1 row justify-end">
          <q-btn class="item__btn" unelevated round color="white" @click="modalEdit = true">
            <q-icon class="item__icon">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 383.947 383.947" style="width: 50%; margin: -0.85em 0 0 -0.85em" xml:space="preserve">
                      <g>
                        <g>
                          <g>
                            <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893"/>
                            <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
                              C386.027,77.92,386.027,64.373,377.707,56.053z"/>
                          </g>
                        </g>
                      </g>
                    </svg>
            </q-icon>
          </q-btn>
          <q-btn class="item__btn" unelevated round color="white" @click="deleteUser(user.id)">
            <q-icon class="item__icon item__icon-delete">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="348.333px" height="348.334px" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334; width: 40%; margin: -0.85em 0 0 -0.9em"
                xml:space="preserve">
              <g>
                <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
                  c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
                  c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
                  l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
                  L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
              </g>
              </svg>
            </q-icon>
          </q-btn>
      </div>

      <q-dialog v-model="modalEdit">
        <UsersEditUserModal :user="user" />
      </q-dialog>

      <q-dialog v-model="modalDelete">
        <UsersDeleteUserModal :id="user.id" />
      </q-dialog>

      <q-dialog v-model="modalError">
        <UsersDeleteError />
      </q-dialog>
  </div>
</template>

<script>
import UsersEditUserModal from 'components/Users/UsersEditUserModal'
import UsersDeleteUserModal from 'components/Users/UsersDeleteUserModal'
import UsersDeleteError from 'components/Users/UsersDeleteError'

import { mapActions } from 'vuex'
import { AsYouType } from 'libphonenumber-js'
import { getMask } from '../../phone_masks.js'

export default {
  name: 'UsersItem',

  components: {
    UsersEditUserModal,
    UsersDeleteUserModal,
    UsersDeleteError
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      modalEdit: false,
      modalDelete: false,
      modalError: false
    }
  },

  mounted () {
    this.$root.$on('userDeleted', () => {
      this.modalEdit = false
    })
    this.$root.$on('closeEditModal', () => {
      this.modalEdit = false
    })
  },

  methods: {
    ...mapActions({
      loadUser: 'users/loadUser',
      loadUserRides: 'users/loadUserRides',
      checkUser: 'users/checkUser'
    }),
    deleteUser (user) {
      this.checkUser(user)
        .then(response => {
          this.modalDelete = true
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.modalError = true
          }
        })
    },
    async goToUser (e) {
      if (e.target.tagName !== 'svg' &&
        e.target.classList[0] !== 'q-btn__content' &&
        e.target.tagName !== 'polygon' &&
        e.target.tagName !== 'path') {
        this.loadUserRides({ id: this.user.id, dates: this.getLastAndFirstDateOfCurrentMonth() })
        await this.loadUser(this.user.id)
        this.$router.push({ path: `/users/${this.user.id}` })
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
  },

  computed: {
    balance () {
      return (this.user.is_unlimited) ? 'Безлимит' : this.user.balance + ' ₽'
    },
    phoneUnmasked () {
      const phone = new AsYouType()
      return phone.input(this.user.phone)
    },
    phoneMask () {
      const phone = new AsYouType()
      phone.input(this.user.phone)
      return getMask(phone.getNumber().country, phone.getNumber().number)
    }
  }

}
</script>

<style scoped>
    .item {
      z-index: 0;
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      color: #222734;
      padding: 1em 2.9375em 1em 2em;
      margin-bottom: 0.6875em;
      width: 100%;
      border-radius: 0 10px 10px 10px;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26);
      border: solid 1px #f5f4fb;
      background-color: #ffffff;
      cursor: pointer;
    }
    .item:hover {
      background-color: #f7f7ff;
    }
    .item__btn {
      width: 1.5em;
      height: 1.5em;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    }
    .item__btn:first-child {
      margin-right: 0.875em;
    }
    .item__icon {
      color: #c4c6e3;
    }
    .item__icon-delete {
      color: #efa6b9;
    }
    .item:hover .item__btn {
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
      color: #ffffff !important;
      box-shadow: 0;
    }
    .item:hover .item__icon {
      color: #ffffff;
    }
    .item__user_post {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.75em;
      color: #d0cee1;
      margin-bottom: 0.5em;
    }
</style>
