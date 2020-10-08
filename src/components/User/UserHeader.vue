<template>
  <header class="header">
      <div class="row items-center">
          <div class="header__text row items-center">
              <span class="header__title">{{ currentUser.name }}</span>
              <div class="header__splitier"></div>
              <span class="header__firm">{{ (currentUser.group) ? currentUser.group.name : '-' }}</span>
          </div>
          <q-btn
            color="accent"
            class="header__btn header__btn-light"
            unelevated
            no-caps
            rounded
            @click="modalEdit = true"
          >
            <q-icon class="header__icon">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 383.947 383.947" style="color: #6f82f0; width: 50%" xml:space="preserve">
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
            <span>Редактировать</span>
          </q-btn>
      </div>
      <div class="row">
          <div class="header__phone">
              <q-icon name="phone" size="xs" color="accent"></q-icon>
              <q-input class="fakePhoneInput" borderless v-model="phoneUnmasked" :mask="phoneMask" readonly/>
          </div>
          <div class="header__email">
              <q-icon name="alternate_email" size="xs" color="accent"></q-icon>
              <strong>{{ currentUser.email }}</strong>
          </div>
      </div>

      <q-dialog v-model="modalEdit">
        <UsersEditUserModal :user="currentUser" />
      </q-dialog>
  </header>
</template>

<script>
import UsersEditUserModal from 'components/Users/UsersEditUserModal'
import { AsYouType } from 'libphonenumber-js'
import { getMask } from '../../phone_masks.js'

export default {
  name: 'Registration',

  components: {
    UsersEditUserModal
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      modalEdit: false
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

  computed: {
    currentUser () {
      return this.user
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
    .header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 1.15em 2.15em;
      margin-bottom: 1em;
      border-radius: 0 30px 0 0;
    }

    .header__title {
      font-size: 2.25rem;
      margin-top: -0.125em;
    }

    .header__splitier {
        width: 2px;
        height: 1.5em;
        background-color: #e3e2ec;
        margin: 0 1em;
    }

    .header__firm {
      color: #595187;
      font-size: 1.5rem;
    }

    .header__btn {
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      padding: 0.325em 0.3em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      margin-left: auto;
      background-image: linear-gradient(to top, #836af2, #6a87f2) !important;
    }

    .header__icon {
        background: #ffffff;
        border-radius: 50%;
        width: 0.8em;
        height: 0.8em;
        margin-right: 0.5em;
    }

    .header__phone {
      font-size: 0.875rem;
      font-family: 'Open Sans', sans-serif;
      color: rgb(41, 43, 53);
      margin: 1em 0 0.5em;
    }

    .header__email {
      font-size: 0.875rem;
      font-family: 'Open Sans', sans-serif;
      color: rgb(41, 43, 53);
      margin: 1em 0 0.5em;
    }

    .header__phone strong,
    .header__email strong {
      margin-left: 0.5em;
    }

</style>
