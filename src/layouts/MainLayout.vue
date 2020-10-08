<template>
  <q-layout view="lHh Lpr lFf">

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-dark"
      flex
      :width="getMenuWidth"
      column
    >
      <q-list class="menu">
        <q-item-label class="menu__logo"><img src="../statics/white_logo.svg" width="128px" alt="TAXIone"></q-item-label>

        <q-item class="menu__item" :to="{name: 'orders'}" active-class="menu-item_active">
          <q-item-section avatar>
            <q-icon class="menu-item__icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;transform: scaleX(-1); height: 0.8rem" xml:space="preserve">
              <g>
                <g>
                  <path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
                    c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
                    L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
                    c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
                    c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
                    C492,219.198,479.172,207.418,464.344,207.418z"/>
                </g>
              </g>
              </svg>
            </q-icon>
          </q-item-section>

          <q-item-section>
            <q-item-label class="menu__title">Заказы</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="menu__item" :to="{name: 'users'}" active-class="menu-item_active">
          <q-item-section avatar>
            <q-icon class="menu-item__icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; width: 0.6rem;" xml:space="preserve">
                <g>
                  <g>
                    <path d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195
                      C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15
                      C481,444.833,460.745,395.539,423.966,358.195z"/>
                  </g>
                </g>
              </svg>
            </q-icon>
          </q-item-section>

          <q-item-section>
            <q-item-label class="menu__title">Пользователи</q-item-label>
          </q-item-section>
        </q-item>

        <q-item  class="menu__item" :to="{name: 'archive'}" exact-active-class="menu-item_active">
          <q-item-section avatar>
            <q-icon class="menu-item__icon">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; width: 0.8rem;" xml:space="preserve">
              <g>
                <g>
                  <path d="M433.886,199.424c0.87-5.385,1.314-10.726,1.314-15.957c0-56.465-45.935-102.4-102.4-102.4
                    c-44.134,0-82.372,22.349-98.347,56.508c-12.911-5.308-24.806-5.308-38.187-5.308c-53.7,0-97.877,41.549-102.076,94.191
                    C41.557,230.656,0,274.833,0,328.533c0,56.465,45.935,102.4,102.4,102.4h290.133c65.877,0,119.467-53.589,119.467-119.467
                    C512,261.572,480.247,216.576,433.886,199.424z"/>
                </g>
              </g>
              </svg>
            </q-icon>
          </q-item-section>

          <q-item-section>
            <q-item-label class="menu__title">Архив</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="menu__item" :to="{name: 'settings'}" exact-active-class="menu-item_active">
          <q-item-section avatar>
            <q-icon class="menu-item__icon">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; width: 0.7rem;" xml:space="preserve">
              <g>
                <g>
                  <path d="M256,211c-24.814,0-45,20.186-45,45c0,24.814,20.186,45,45,45c24.814,0,45-20.186,45-45C301,231.186,280.814,211,256,211z
                    "/>
                </g>
              </g>
              <g>
                <g>
                  <path d="M501.746,211.776l-61.718-20.244c-2.373-6.782-5.156-13.491-8.335-20.054l28.638-57.261
                    c2.886-5.771,1.758-12.744-2.813-17.314l-42.422-42.422c-4.57-4.57-11.514-5.698-17.314-2.813l-57.261,28.638
                    c-6.563-3.179-13.271-5.962-20.054-8.335l-20.244-61.718C298.187,4.131,292.46,0,286,0h-60c-6.46,0-12.188,4.131-14.224,10.254
                    l-20.244,61.718c-6.782,2.373-13.491,5.156-20.054,8.335l-57.261-28.638c-5.786-2.886-12.729-1.787-17.314,2.813L54.481,96.903
                    c-4.57,4.57-5.698,11.543-2.813,17.314l28.638,57.261c-3.179,6.563-5.962,13.271-8.335,20.054l-61.718,20.244
                    C4.131,213.813,0,219.54,0,226v60c0,6.46,4.131,12.188,10.254,14.224l61.718,20.244c2.373,6.782,5.156,13.491,8.335,20.054
                    l-28.638,57.261c-2.886,5.771-1.758,12.744,2.813,17.314l42.422,42.422c4.6,4.585,11.572,5.713,17.314,2.813l57.261-28.638
                    c6.563,3.179,13.271,5.962,20.054,8.335l20.244,61.718C213.812,507.869,219.54,512,226,512h60c6.46,0,12.187-4.131,14.224-10.254
                    l20.244-61.718c6.782-2.373,13.491-5.156,20.054-8.335l57.261,28.638c5.757,2.871,12.729,1.743,17.314-2.813l42.422-42.422
                    c4.57-4.57,5.698-11.543,2.813-17.314l-28.638-57.261c3.179-6.563,5.962-13.271,8.335-20.054l61.718-20.244
                    C507.869,298.188,512,292.46,512,286v-60C512,219.54,507.869,213.812,501.746,211.776z M256,361c-57.891,0-105-47.109-105-105
                    s47.109-105,105-105s105,47.109,105,105S313.891,361,256,361z"/>
                </g>
              </g>
              </svg>
            </q-icon>
          </q-item-section>

          <q-item-section>
            <q-item-label class="menu__title">Настройки</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>

      <button class="drawer__btn row items-center" @click="goLogout">
        <q-icon class="drawer__icon" color="accent">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; width: 1em; width: 1em;" xml:space="preserve">
            <g>
              <g>
                <path d="M256.026,0c-24.816,0-45.004,20.188-45.004,45.004v181.016c0,24.816,20.188,45.004,45.004,45.004
                  s45.004-20.188,45.004-45.004V45.004C301.03,20.188,280.842,0,256.026,0z"/>
              </g>
            </g>
            <g>
              <g>
                <path d="M406.625,118.959c-18.939-17.083-46.502-15.14-63.041,1.873c-16.632,17.109-17.917,46.086,3.153,65.296
                  c33.44,30.395,50.343,76.459,42.336,122.928c-10.868,63.067-65.717,112.767-133.05,112.915
                  c-68.971,0.152-121.809-50.77-132.708-110.617c-8.497-46.747,7.179-93.553,41.972-125.197c21.01-19.127,19.913-48.232,3.234-65.36
                  c-16.567-17.013-44.295-18.851-63.4-1.56c-52.909,47.923-80.527,118.769-72.843,190.58C44.496,423.995,140.9,512,256.553,512
                  c114.326,0,207.934-88.216,222.368-194.743C488.985,243.027,461.957,168.899,406.625,118.959z"/>
              </g>
            </g>
          </svg>
        </q-icon>
        <span>Выход из кабинета</span>
      </button>

    </q-drawer>

    <q-page-container v-if="loadCompanyInfo">
      <transition name="page-fade" mode="out-in">
        <router-view />
      </transition>

      <q-dialog v-model="loadingModal">
        <Loading />
      </q-dialog>

      <q-dialog v-model="loadedModal">
        <Loaded />
      </q-dialog>

      <q-dialog v-model="userEditedModal">
        <UserEdited />
      </q-dialog>

      <q-dialog v-model="userDeletedModal">
        <UserDeleted />
      </q-dialog>

    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import Loading from 'components/Loading'
import Loaded from 'components/Loaded'
import UserEdited from 'components/UserEdited'
import UserDeleted from 'components/UserDeleted'

export default {
  name: 'MainLayout',

  components: {
    Loading,
    Loaded,
    UserEdited,
    UserDeleted
  },

  data () {
    return {
      leftDrawerOpen: true,
      loadingModal: false,
      loadedModal: false,
      userEditedModal: false,
      userDeletedModal: false,

      windowWidth: window.innerWidth
    }
  },

  computed: {
    getMenuWidth () {
      return (this.windowWidth >= 1070) ? 275 : 220
    }
  },
  mounted () {
    this.loadCompanyInfo()
      .then(async (response) => {
        if (!response.data.data.is_approved && !response.data.data.agreement_uploaded && !response.data.data.agreement_url) {
          this.showNotif(`<h6 style="padding: 0; margin: 0 0 0.5em; text-align: center">Присоединиться к договору</h6>
            <p style="padding: 0; margin: 0 0 0.5em;">Чтобы начать работу в кабинете, необходимо загрузить скан Договора на оказание услуг в Настройках.</p>`, true, this.goSettings)
        } else if (!response.data.data.is_approved && !response.data.data.agreement_uploaded && response.data.data.agreement_url) {
          this.showNotif(`<h6 style="padding: 0; margin: 0 0 0.5em; text-align: center">Договор сформирован</h6>
            <p style="padding: 0; margin: 0 0 0.5em;">Скачайте и ознакомьтесь с договором. Загрузите скан подписанного договора.</p>`, true, this.goSettings)
        } else if (!response.data.data.is_approved && response.data.data.agreement_uploaded) {
          await this.showNotif(`<h6 style="padding: 0; margin: 0 0 0.5em; text-align: center">Договор на проверке</h6>
            <p style="padding: 0; margin: 0 0 0.5em;">После прохождения проверки Вам станут доступны все функции кабинета.</p>`)
          document.querySelector('.q-notification__actions').lastChild.style.display = 'none'
        } else if (response.data.data.is_approved && !localStorage.getItem('is_approved_notify_has_been_shown')) {
          localStorage.setItem('is_approved_notify_has_been_shown', true)
          this.showNotif(`<h6 style="padding: 0; margin: 0 0 0.5em; text-align: center">Договор одобрен</h6>
            <p style="padding: 0; margin: 0 0 0.5em;">Вам доступны все функции кабинета. Начните с добавления групп и сотрудников в разделе Пользователи.</p>`, true, this.goUsers)
        }
      })
      .catch(error => {
        this.goLogout()
        console.log(error)
      })
    this.loadGroups()
    window.addEventListener('resize', this.onResize)

    this.$root.$on('userEdited', () => {
      console.log('onEvent')
      this.userEditedModal = true
      setTimeout(() => { this.userEditedModal = false }, 1200)
    })
    this.$root.$on('userDeleted', () => {
      this.userDeletedModal = true
      setTimeout(() => { this.userDeletedModal = false }, 1200)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    ...mapActions({
      logoutUser: 'login/logoutUser',
      loadCompanyInfo: 'settings/loadCompanyInfo',
      loadGroups: 'groups/loadGroups'
    }),

    showNotif (message, widthHandler, handler) {
      const actions = (widthHandler)
        ? [
          { label: 'Ок', color: 'accent', handler: handler },
          { label: 'Позже', color: 'white', handler: () => { /* ... */ } }
        ]
        : [ { label: 'ОК', color: 'accent', handler: () => { /* ... */ } }, { label: '', color: 'accent', handler: () => { /* ... */ } } ]

      this.$q.notify({
        message: message,
        color: 'positive',
        html: true,
        textColor: 'info',
        position: 'top-right',
        timeout: '10000000',
        icon: 'announcement',
        actions: actions
      })
    },

    goSettings () {
      if (this.$route.name !== 'settings') this.$router.push({ name: 'settings' })
    },
    goUsers () {
      if (this.$route.name !== 'users') this.$router.push({ name: 'users' })
    },

    goLogout () {
      this.logoutUser()
        .then(response => {
          this.$router.push({ name: 'login' })
        })
        .catch(error => {
          console.log(error)
        })
    },

    onResize () {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style scoped>

  .menu__logo {
    margin: 1em;
    margin: 1.3em 1.15em 1.25em;
    font-size: 2rem;
    color: #ffffff;
    font-family: 'Open Sans', sans-serif;
  }
  .menu__item {
    color: black;
    margin: 1.3em 1.3em 1.3em 0;
    padding-left: 2.15em;
    border-radius: 0 5px 5px 0;
  }

  .menu__item:hover {
    background: #292b35 !important;
    background-color: #292b35 !important;
    opacity: 1 !important;
  }

  .menu-item_active {
    position: relative;
    background: #292b35 !important;
    background-color: #292b35 !important;
    opacity: 1 !important;
  }

  .menu-item_active:before {
    position: absolute;
    top: -0.05em;
    left: 0;
    content: '';
    display: block;
    width: 4px;
    height: 3.55em;
    border-radius: 0 3px 3px 0;
    box-shadow: 0px 3px 7px 0 rgba(104, 57, 190, 0.43);
    background-image: linear-gradient(to top, #836af2, #6a87f2);
  }

  .menu-item__icon {
    color: #ffffff;
  }

  .menu-item_active .menu-item__icon {
    color: #6a87f2;
  }

  .menu-item_active .menu__title {
    color: #7976f2;
  }

  .menu__title {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 4.71;
    letter-spacing: 0.42px;
    margin-left: -1.5em;
    color: #ffffff;
  }

  .drawer__btn {
    position: absolute;
    bottom: 2.15em;
    left: 0;
      color: #ffffff;
      font-family: 'SFProDisplay', sans-serif;
      padding: 1.0625em 1.4375em 1.0625em 2.15em;
      font-size: 1rem;
      outline: none;
      border: none;
      border-radius: 23.5px;
      background: transparent;
    }

    .drawer__btn:hover {
      cursor: pointer;
    }
    .drawer__icon {
      margin-right: 0.89em;
    }

    .page-fade-enter-active, .component-fade-leave-active {
      transition: all .2s ease;
    }
    .page-fade-enter, .component-fade-leave-to {
      opacity: 0;
    }
</style>
