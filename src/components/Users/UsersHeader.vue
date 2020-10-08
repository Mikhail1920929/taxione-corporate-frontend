<template>
  <header class="header">
      <div class="row orders__row">
          <div class="col-6 header__title row items-center">Пользователи</div>
          <div class="col-6 header__firm row items-center justify-end" v-if="getCompanyInfo">{{ getCompanyInfo.name }}</div>
      </div>
      <div class="row">
          <div class="col-6">
            <q-btn color="accent" class="header__btn" unelevated no-caps rounded @click="$router.push({ name: 'addUsers' })">
              <q-icon class="header__icon" color="white">
                <svg  x="0px" y="0px" viewBox="0 0 512 512" style="width: 0.825rem;">
                  <path d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"/>
                  <path d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195
                    C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15
                    C481,444.833,460.745,395.539,423.966,358.195z"/>
              </svg>
              </q-icon>
              <span>Добавить пользователя</span>
            </q-btn>
          </div>
          <div class="col-6 row items-center justify-end">
            <q-btn color="white" class="header__btn header__btn-light" unelevated no-caps rounded @click="modalAddGroup = true">
              <q-icon class="header__icon" color="accent">
                <svg style="box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%;" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
              </q-icon>
              <span>Добавить группу</span>
            </q-btn>
          </div>
      </div>

      <q-dialog v-model="modalAddGroup">
        <UsersAddGroupModal />
      </q-dialog>

      <q-dialog v-model="modalAddUserSuccess">
        <UsersAddUsersSuccessModal />
      </q-dialog>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import UsersAddGroupModal from 'components/Users/UsersAddGroupModal'
import UsersAddUsersSuccessModal from 'components/Users/UsersAddUsersSuccessModal'

export default {
  name: 'Registration',

  data () {
    return {
      modalAddGroup: false,
      modalAddUserSuccess: false
    }
  },

  computed: {
    ...mapGetters({
      getCompanyInfo: 'settings/companyInfo'
    })
  },

  mounted () {
    this.$root.$on('openAddGroupByLink', () => {
      this.modalAddGroup = true
    })
    if (this.$route.params.openModal) this.modalAddGroup = true
    if (this.$route.params.openSuccessModal) this.modalAddUserSuccess = true
    setTimeout(() => { this.modalAddUserSuccess = false }, 1200)
  },

  components: {
    UsersAddGroupModal,
    UsersAddUsersSuccessModal
  }
}
</script>

<style scoped>
    .header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 0.9em 2.15em 1.8em;
      margin-bottom: 1em;
      border-radius: 0 30px 0 0;
    }

    .orders__row {
      padding-bottom: 0.7em;
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
    .header__btn {
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      padding: 0.38em 0.5em 0.4em;
      margin-left: 0.15em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
    }
    .header__btn span {
    }

    .header__btn:hover {
      cursor: pointer;
    }

    .header__btn-light {
        background: #ffffff !important;
        color: #000000 !important;
    }

    .header__icon {
      width: 0.5625em;
      height: 0.5625em;
      margin-right: 0.5em;
  }
</style>
