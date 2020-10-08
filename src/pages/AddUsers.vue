<template>
  <q-page class="row">
      <div class="col-12 column q-pa-md q-pt-lg">
        <AddUsersHeader @sendUsers="addUsers" />
        <AddUsersTitle/>
        <q-scroll-area class="order__scroll" :thumb-style="thumbStyle">
          <AddUsersItem v-for="user in newUsers" :key="user.id" :usersLength="newUsers.length" :userID="user.id" :errorMailText="user.errorMailText" :errorPhoneText="user.errorPhoneText" />
          <q-btn color="accent" class="header__btn" unelevated no-caps rounded @click="addNewUser">
              <q-icon class="header__icon" color="rgb(255, 255, 255)">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; height: 0.925rem; width: 0.925rem;" xml:space="preserve">
                <g>
                  <g>
                    <g>
                      <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
                        c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
                        z"/>
                      <path d="M383.996,234.667H277.333V128c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333v106.667H128.038
                        c-11.782,0-21.333,9.551-21.333,21.333s9.551,21.333,21.333,21.333h106.628V384c0,11.782,9.551,21.333,21.333,21.333
                        s21.333-9.551,21.333-21.333V277.333h106.662c11.782,0,21.333-9.551,21.333-21.333S395.778,234.667,383.996,234.667z"/>
                    </g>
                  </g>
                </g>
                </svg>
              </q-icon>
              <span>Добавить еще одного</span>
            </q-btn>
        </q-scroll-area>
      </div>

      <q-dialog v-model="modalConfirm" @AddUsersOnContinue="sendUsers">
        <AddUsersModalConfirm :id="1" />
      </q-dialog>

      <q-dialog v-model="errorExistModal">
        <AddUsersModalError :text="errorText" />
      </q-dialog>
  </q-page>
</template>

<script>
import AddUsersHeader from 'components/AddUsers/AddUsersHeader'
import AddUsersTitle from 'components/AddUsers/AddUsersTitle'
import AddUsersItem from 'components/AddUsers/AddUsersItem'
import AddUsersModalConfirm from 'components/AddUsers/AddUsersModalConfirm'
import AddUsersModalError from 'components/AddUsers/AddUsersModalError'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddUsersPage',

  components: {
    AddUsersHeader,
    AddUsersTitle,
    AddUsersItem,
    AddUsersModalConfirm,
    AddUsersModalError
  },

  data () {
    return {
      newUsers: [{
        id: 0,
        name: '',
        group_id: '',
        phone: '',
        email: '',
        limit: 0,
        errorMailText: false,
        errorPhoneText: false
      }],

      dataIsValid: true,
      modalConfirm: false,
      errorExistModal: false,
      errorText: '',
      duplicates: []
    }
  },

  beforeDestroy () {
    this.$root.$off('updateUser')
    this.$root.$off('deleteNewUser')
    this.$root.$off('dataIsValid')
    this.$root.$off('AddUsersOnContinue')
  },

  async mounted () {
    this.loadGroups()
    this.$root.$on('updateUser', (updatedUser) => {
      if (updatedUser) {
        let user = this.newUsers.find((user) => user.id === updatedUser.id)
        if (user) {
          if (this.duplicates.length) {
            this.duplicates.forEach((dublicate) => {
              if (dublicate.phone === updatedUser.prevPhone) dublicate.errorPhoneText = false
            })
          }
          for (const key in updatedUser) {
            user[key] = updatedUser[key]
          }
        }
      }
    })
    this.$root.$on('deleteNewUser', (id) => {
      if (this.newUsers.length > 1) this.newUsers.splice(this.newUsers.findIndex(user => user.id === id), 1)
    })
    this.$root.$on('dataIsValid', (answer) => {
      this.dataIsValid = !!answer
    })
    this.$root.$on('AddUsersOnContinue', () => {
      this.sendUsers()
    })
  },

  computed: {
    ...mapGetters({
      getUsers: 'users/users'
    }),

    thumbStyle () {
      return {
        right: '-10px',
        borderRadius: '2px',
        backgroundColor: '#6a87f2',
        width: '4px',
        opacity: 1
      }
    }
  },

  methods: {
    ...mapActions({
      addUser: 'users/addUser',
      loadUsers: 'users/loadUsers',
      loadGroups: 'groups/loadGroups'
    }),

    addUsers () {
      this.$root.$emit('checkUpdatedUsers')
      if (this.dataIsValid) this.sendUsers()
      else this.modalConfirm = true
    },

    getDuplicates () {
      this.duplicates = []
      for (const user of this.newUsers) {
        let amount = this.newUsers.filter((u) => u.phone === user.phone).length
        if (amount > 1) this.duplicates.push(user)
      }
    },

    async sendUsers () {
      let repError = false
      let existError = false
      this.getDuplicates()
      for (const user of this.newUsers) {
        if (this.duplicates.includes(user)) {
          this.errorText = 'Номера телефонов должны быть уникальны.'
          repError = true
          user.errorPhoneText = true
          user.errored = true
          existError = true
          continue
        }
        if (user.name && user.phone.length && user.email && user.phoneIsValid) {
          await this.addUser({
            name: user.name,
            group_id: user.group_id,
            phone: user.phone,
            email: user.email,
            limit: user.limit,
            is_unlimited: user.isUnlimited
          })
            .then(() => {
              user.errorMailText = false
              user.errorPhoneText = false
            })
            .catch(error => {
              if (error.response.data.message !== 'The given data was invalid') {
                repError = true
                existError = true
                this.errorText = error.response.data.message
                if (this.errorText === 'Your company doesn\'t approved!') this.errorText = 'Компания еще не подтверждена.'
                user.errored = true
              } else {
                if (error.response.data.errors && error.response.data.errors.email) {
                  repError = true
                  user.errorMailText = true
                }
                if (error.response.data.errors && error.response.data.errors.phone) {
                  repError = true
                  user.errorPhoneText = true
                }
                user.errored = true
              }
            })
        } else {
          repError = true
          user.errored = true
          existError = true
          this.errorText = 'Заполните корректно все поля для сохранения пользователей.'
        }
      }
      if (!repError) {
        await this.loadUsers()
        this.$router.push({ name: 'users', params: { openSuccessModal: true } })
      } else {
        this.newUsers = this.newUsers.filter(user => user.errored)
        this.newUsers.forEach(user => { user.errored = false })
        if (existError) {
          this.errorExistModal = true
        }
      }
    },

    addNewUser () {
      this.newUsers.push({
        id: this.newUsers[this.newUsers.length - 1].id + 1,
        name: '',
        group_id: '',
        phone: '',
        email: '',
        limit: 0,
        errorMailText: false,
        errorPhoneText: false
      })
    }
  }
}
</script>

<style scoped>
    .order__scroll {
       height: calc(100vh - 48px - 12em);
       width: 100%;
    }
    .header__btn {
      margin: 0.2em 0.4em 0.2em auto;
      color: rgb(118, 121, 242) !important;
      font-family: 'Open Sans', sans-serif;
      padding: 0.5em 0.675em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      background-color: rgb(255, 255, 255) !important;
      box-shadow: 0px 2px 10px 0px rgba(74, 94, 202, 0.16);
    }
    .header__icon {
        width: 0.5625em;
        height: 0.5625em;
        margin-right: 0.5em;
    }

</style>
