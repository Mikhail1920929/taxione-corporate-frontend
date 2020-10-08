<template>
      <q-card class="q-pa-xs" style="width: 480px; border-radius: 23.5px; font-size: 1rem">

        <q-card-section class="row justify-end q-pa-xs q-pb-none">
          <q-btn ref="closeBtn" flat round dense v-close-popup>
            <q-icon class="header__icon" color="white" size="xs">
              <svg id="Capa_1" style="box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%; transform: rotate(45deg);" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
            </q-icon>
          </q-btn>
        </q-card-section>

        <div class="modal__header text-center q-mb-md">Редактировать пользователя</div>

        <q-card-section class="modal__form_section items-center q-pt-none">
          <q-form
            @submit="onSubmit"
            class="modal__form q-gutter-sm column items-center q-pt-md"
          >
            <label class="settings__label text-center" for="fullname">ФИО сотрудника</label>
            <q-input
              class="settings__input"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              color="accent"
              id="fullname"
              rounded
              outlined
              v-model="name"
            >
            </q-input>

            <label class="settings__label col-6" for="email">E-mail</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              @input="showEmailWarning = false"
              color="accent"
              id="email"
              type="email"
              rounded
              outlined
              v-model="email"
            >
            </q-input>
            <p class="email__warning" :class="{ 'email__warning_shown' : showEmailWarning }">*Некорректный e-mail адрес</p>

            <label class="settings__label col-6" for="post">Группа</label>
            <div class="header__select" :class="{ header__select_show: postIsSearching}">
        <input
          type="text"
          v-model="group.name"
          class="header__select_input"
          readonly
          :class="{header__select_input_white: postIsSearching}"
          @focus="postIsSearching = true"
        >
        <q-btn
          class="header__select_btn"
          :class="{ header__select_btn_rotated: postIsSearching}"
          round
          unelevated
          color="white"
          size="xs"
          text-color="accent"
          icon="keyboard_arrow_down"
          @click="postIsSearching = !postIsSearching"
        />

        <q-scroll-area
          class="header__select_answers"
          :class="{
            header__select_answers_show200: postIsSearching,
            header__select_answers_show95: postIsSearching && getGroups.length === 1,
            header__select_answers_show140: postIsSearching && getGroups.length === 2
          }"
          :thumb-style="thumbStyle">
            <q-list v-if="getGroups.length > 0">
              <q-item class="header__select_answer" @click="group = cgroup; postIsSearching = false" v-for="cgroup in getGroups" :key="cgroup.id" clickable v-ripple>
                <q-item-section>{{ cgroup.name }}</q-item-section>
              </q-item>
            </q-list>
            <div v-else style="text-align: center; margin-top: 55px; font-size: 14px;">Тут пока пусто, добавьте <span class="link_to_groups" @click="$root.$emit('openAddGroupByLink')">группы</span></div>
          </q-scroll-area>
      </div>

            <div class="row items-center justify-between q-my-lg" style="width: 100%; max-width: 340px">
              <label class="settings__label" for="limit">Лимит:</label>
              <q-input
                class="settings__input settings__input_limit"
                :class="{ disable_limit: is_unlimited }"
                @focus="(evt) => inputFocus(evt)"
                @blur="(evt) => inputBlur(evt)"
                color="accent"
                id="limit"
                rounded
                outlined
                v-model="limit"
                type="text"
                :readonly="is_unlimited"
              >

                <div v-show="!is_unlimited" class="setting__btn-edit_before flex items-center justify-center">
                    <q-icon class="setting__icon" @click="() => { if (limit) limit-- }">
                      <svg xmlns="http://www.w3.org/2000/svg"  height="24" viewBox="0 0 24 24" width="24" style="margin: -7px -2px 0 0;"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
                    </q-icon>
                </div>

                <div v-show="!is_unlimited" class="setting__btn-edit_after flex items-center justify-center">
                    <q-icon class="setting__icon" @click="limit++">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" style="margin: -7px -2px 0 0; transform: scaleY(-1)"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
                    </q-icon>
                </div>
              </q-input>
              <div class="policy flex justify-between items-center">
                <div class="checkbox">
                  <label class="policyCheckbox">
                    <input type="checkbox" checked="checked" v-model="is_unlimited">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="policyInfo" >
                  Без лимита
                </div>
              </div>
            </div>

            <div class="row items-center q-mt-md justify-evenly" style="width: 100%; max-width: 340px;">

              <div class="btn-block">
                <q-btn
                  color="accent"
                  class="modal__btn"
                  unelevated
                  no-caps
                  rounded
                  type="submit"
                  :disable="isUserEdited"
                >
                  <q-icon class="modal__icon" color="white">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 512 512" style="enable-background:new 0 0 512 512; width: 0.725rem; height: 0.725rem;" xml:space="preserve">
                    <g>
                      <g>
                        <path d="M438.284,0H60C26.916,0,0,26.916,0,60v392c0,33.084,26.916,60,60,60h392c33.084,0,60-26.916,60-60V73.716L438.284,0z
                          M120,40h230v118H120V40z M392,472H120V314h272V472z M472,452c0,11.028-8.972,20-20,20h-20V274H80v198H60
                          c-11.028,0-20-8.972-20-20V60c0-11.028,8.972-20,20-20h20v158h310V40h31.716L472,90.284V452z"/>
                      </g>
                    </g>
                    <g>
                      <g>
                        <rect x="274" y="59" width="40" height="79"/>
                      </g>
                    </g>
                    </svg>
                  </q-icon>
                  <span>Сохранить</span>
                </q-btn>
              </div>

              <div class="btn-block">
                <q-btn color="white" class="modal__btn modal__btn-light" unelevated no-caps rounded @click="deleteUser(user.id)">
                  <q-icon class="modal__icon" color="accent">
                    <svg id="Capa_1" style="transform: rotate(45deg);box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%;" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
                  </q-icon>
                  <span>Удалить</span>
                </q-btn>
              </div>

            </div>
          </q-form>
        </q-card-section>

        <q-dialog v-model="modalDelete">
          <UsersDeleteUserModal :id="user.id" />
        </q-dialog>
        <q-dialog v-model="modalError">
          <UsersModalDeleteError />
        </q-dialog>
      </q-card>
</template>

<script>

import UsersDeleteUserModal from 'components/Users/UsersDeleteUserModal'
import { mapActions, mapGetters } from 'vuex'
import UsersModalDeleteError from 'components/Users/UsersModalDeleteError'
// import { AsYouType } from 'libphonenumber-js'
// import { getMask } from '../../phone_masks.js'

export default {
  name: 'UsersEditUserModal',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  components: {
    UsersDeleteUserModal,
    UsersModalDeleteError
  },

  data () {
    return {
      modalError: false,
      id: this.user.id,
      name: this.user.name,
      group: this.user.group || {},
      // phoneUnmasked: this.user.phone,
      // phoneMask: '+###############',
      email: this.user.email,
      limit: this.user.limit,
      is_unlimited: this.user.is_unlimited,
      country_code: 'RUS',
      lang: 'ru',
      is_active: true,
      saveIsEnable: false,
      // phone: '',
      showEmailWarning: false,

      oldUser: {
        id: this.user.id,
        name: this.user.name,
        group_id: (this.user.group) ? this.user.group.id : null,
        phone: this.user.phone,
        email: this.user.email,
        limit: this.user.limit,
        is_unlimited: this.user.is_unlimited,
        country_code: 'RUS',
        lang: 'ru',
        is_active: true
      },

      isEditing: false,
      modalDelete: false,
      postIsSearching: false
    }
  },

  mounted () {
    // this.phoneUnmasked += ' '
    window.addEventListener('click', (e) => {
      if (e.target.localName !== 'input' && e.target.innerText !== 'keyboard_arrow_down') {
        this.postIsSearching = false
      }
    })
    // setTimeout(() => {
    //   const input = this.$refs.phoneInput.$refs.input
    //   input.blur()
    // }, 0)
  },

  computed: {
    group_id () {
      return this.group.id
    },
    ...mapGetters({
      getGroups: 'groups/groups'
    }),
    thumbStyle () {
      return {
        opacity: 0
      }
    },
    isUserEdited () {
      let isGroupTheSame
      if (this.user.group) {
        isGroupTheSame = this.group.id === this.user.group.id
      } else {
        isGroupTheSame = !this.group.id
      }
      return this.user.limit === this.limit &&
          this.user.name === this.name &&
          this.user.email === this.email &&
          this.user.is_unlimited === this.is_unlimited &&
          isGroupTheSame
    }
  },

  watch: {
    // phoneUnmasked (value) {
    //   console.log(value)
    //   if (value[0] === '+' || !value.length) {
    //     const phone = new AsYouType()
    //     this.phoneUnmasked = phone.input(value)
    //     this.phoneIsValid = phone.isPossible()
    //     if (phone.getNumber()) this.phone = phone.getNumber().number
    //     if (phone.getNumber()) {
    //       this.phoneUnmasked = ''
    //       this.phoneMask = getMask(phone.getNumber().country, phone.getNumber().number)
    //       const input = this.$refs.phoneInput.$refs.input
    //       input.blur()
    //       this.phoneUnmasked = value
    //       input.focus()
    //     }
    //   } else {
    //     this.phoneUnmasked = '+' + value
    //   }
    // },
    // name (val) {
    //   if (this.user.name !== val) this.saveIsEnable = true
    //   else this.saveIsEnable = false
    // },
    // group (val) {
    //   if (this.user.group !== val) this.saveIsEnable = true
    //   else this.saveIsEnable = false
    // },
    // email (val) {
    //   if (this.user.email !== val) this.saveIsEnable = true
    //   else this.saveIsEnable = false
    // },
    // is_unlimited (val) {
    //   if (this.user.is_unlimited !== val) this.saveIsEnable = true
    //   else this.saveIsEnable = false
    // },
    limit (val) {
      this.limit = this.limit + ''
      this.limit = this.limit.replace(/[^0-9]/g, '')
      this.limit = (!this.limit) ? 0 : +this.limit
      if (this.limit) {
        this.limit = (this.limit < 0) ? 0 : (this.limit > 100000000) ? '100000000' : this.limit
      }
    }
  },

  methods: {
    ...mapActions({
      editUser: 'users/editUser',
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

    onSubmit () {
      let userUpdate = {
        id: this.id
      }
      for (let key in this.oldUser) {
        if (this[key] !== this.oldUser[key]) {
          userUpdate[key] = this[key]
        }
      }
      this.editUser(userUpdate)
        .then(() => {
          this.$root.$emit('closeEditModal')
          this.$root.$emit('userEdited')
        })
        .catch((error) => {
          if (error.response.data.errors.email) this.showEmailWarning = true
        })
    },
    inputFocus (e) {
      if (e.target.labels) {
        if (e.target.labels[0]) e.target.labels[0].style.backgroundColor = 'rgb(247, 247, 255)'
        if (e.target.nextSibling) {
          e.target.nextSibling.style.backgroundColor = '#7679f2'
          e.target.nextSibling.style.color = 'white'
          if (e.target.nextSibling.nextSibling) {
            e.target.nextSibling.nextSibling.style.backgroundColor = '#7679f2'
            e.target.nextSibling.nextSibling.style.color = 'white'
          }
        }
      }
    },
    inputBlur (e) {
      if (e.target.labels) {
        e.target.labels[0].style.backgroundColor = 'white'
        if (e.target.nextSibling) {
          e.target.nextSibling.style.backgroundColor = 'white'
          e.target.nextSibling.style.color = '#7679f2'
          if (e.target.nextSibling.nextSibling) {
            e.target.nextSibling.nextSibling.style.backgroundColor = 'white'
            e.target.nextSibling.nextSibling.style.color = '#7679f2'
          }
        }
      } else if (e.target.tagName === 'DIV') {
        let input = e.target.firstChild.firstChild
        input.labels[0].style.backgroundColor = 'white'
        if (input.nextSibling) {
          input.nextSibling.style.backgroundColor = 'white'
          input.nextSibling.style.color = '#7679f2'
          if (input.nextSibling.nextSibling) {
            input.nextSibling.nextSibling.style.backgroundColor = 'white'
            input.nextSibling.nextSibling.style.color = '#7679f2'
          }
        }
      }
    }
  }

}
</script>

<style scoped>
    .modal__header {
      font-size: 2.25em;
      font-family: 'SFProDisplay', sans-serif;
      color: rgb(34, 39, 52);
      line-height: 1.333;
      margin-top: -0.5em;
      padding: 0 1em;
    }

    .header__icon {
      position: relative;
    }
    .header__icon::after {
      z-index: -1;
      position: absolute;
      content: '';
      top: 0.2em;
      left: 0.2em;
      border-radius: 50%;
      display: block;
      background: #efa7ba;
      width: 0.6em;
      height: 0.6em;
    }

    .modal__form_section {
      padding: 0 3.125em 2.1em;
    }

    .modal__form {
      position: relative;
    }

    .modal__form::before{
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(247, 247, 247);
    }
    .modal__form::after {
      position: absolute;
      bottom: 66px;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(247, 247, 247);
    }

    .settings__label {
      font-size: 0.875rem;
      font-family: 'Open Sans', sans-serif;
      color: #000;
      font-weight: bold;
    }
    .settings__label_secondary {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.85em;
      color: #d0cee1;
    }
    .settings__input {
      margin-bottom: 0.3em;
      width: 100%;
      max-width: 340px;
      z-index: 2;
      height: 45px;
      position: relative;
      font-size: 14px;
      border-radius: 30px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
    }

    .settings__input_limit {
      max-width: 135px;
    }

    .setting__btn-edit {
      z-index: 3;
      position: absolute;
      top: 14px;
      right: 0;
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      color: #9093e9;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1) !important;
      visibility: hidden;
    }

    .setting__btn-edit_before {
      z-index: 3;
      position: absolute;
      top: 14px;
      left: 0;
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      color: #9093e9;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1) !important;
      visibility: hidden;
    }

    .setting__btn-edit_after {
      z-index: 3;
      position: absolute;
      top: 14px;
      right: 0;
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      color: #9093e9;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1) !important;
      visibility: hidden;
    }
    .settings__input:hover .setting__btn-edit_before,
    .settings__input:hover .setting__btn-edit_after,
    .settings__input:hover .setting__btn-edit {
      visibility: visible;
    }

    .btn-block {
      width: 46%;
    }
    .modal__btn {
      width: 100%;
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      padding: 0.325em 0.3em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      margin-left: auto;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
    }
    .modal__btn-light {
        margin-left: 6%;
        background: #ffffff !important;
        color: #7c72f2 !important;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 2px 10px 0px rgba(74, 94, 202, 0.16);
    }
    .modal__icon {
        width: 0.5625em;
        height: 0.5625em;
        margin-right: 0.5em;
    }

    .policy{
      padding-left: 30px;
    }

    .policyInfo{
      /* width: calc(100% - 36px); */
      font-size: 12px;
      color: rgb(118, 121, 242);
  }

  .policyCheckbox {
    display: block;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .policyCheckbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: -10px;
    left: -30px;
    height: 20px;
    width: 20px;
    background-color: #f7f7f7;
    border-radius: 4px;
    box-shadow: inset  0px 0px 2px 0px #e7eaf6;
  }

  .policyCheckbox:hover input ~ .checkmark {
    background-color: #f7f7f7;
  }

  .policyCheckbox input:checked ~ .checkmark {
    background-color: #f7f7f7;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .policyCheckbox input:checked ~ .checkmark:after {
    display: block;
  }
  .policyCheckbox .checkmark:after {
    left: 7px;
    top: 4px;
    width: 6px;
    height: 10px;
    border: solid #777af2;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .header__select {
      z-index: 3;
      position: relative;
      width: 100%;
      max-width: 340px;
      height: 45px;
      margin-top: 0.5em;
    }
    .header__select_input {
      width: 100%;
      padding: 0.52em 3.5em 0.52em 1.1em;
      font-size: 14px;
      outline: none;
      border-radius: 28px;
      border: 1px solid #b9babf;
      background-color: #ffffff;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
      height: 45px;

      transition: all 0.1s ease 0s;
    }
    .header__select_input:hover {
      border: 1px solid black;
    }

    .header__select_input_white {
      border-radius: 27px 27px 0 0;
      box-shadow: inset 0px 2px 0px 0px rgba(185,191,221,0);
      border-top: 2px solid #836af2 !important;
      border-right: 2px solid #836af2 !important;
      border-left: 2px solid #836af2 !important;
      border-bottom: none !important;
      z-index: 10;
    }

    .header__select_btn {
      position: absolute;
      top: 10.5px;
      right: 10px;
      color:#777af2;
      background: white;
      box-shadow: 0px 1px 10px 0px rgba(133, 136, 179, 0.27);

      transition: all 0.2s ease 0.2s;
    }
    .header__select_btn_rotated {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }

    .header__select_answers {
      position: absolute;
      top: 9px;
      left: 0;

      width: 100%;
      height: 0;
      background: #ffffff;
      z-index: -1;

      padding: 2.1em 1em 0em 1em;
      border-radius: 18px;
      /* box-shadow: 0px 5px 18px 0 rgba(231, 234, 246, 0.79); */

      transition: all 0.125s ease 0.125s;
    }
    .header__select_answers_show95 {
      height: 95px !important;
    }
    .header__select_answers_show140 {
      height: 140px !important;
    }
    .header__select_answers_show200 {
      height: 200px;
      border-radius: 30px;
      box-shadow: inset 0px 2px 0px 0px rgba(185,191,221,0);
      border-bottom: 2px solid #836af2 !important;
      border-right: 2px solid #836af2 !important;
      border-left: 2px solid #836af2 !important;
      border-top: none !important;
    }

    .header__select_answer {
      border-radius: 7px;
    }
    .header__select_show {
      z-index: 33;
    }

    .header__select_show .header__select_answers {
      padding: 2.1em 1em 1em 1em;
    }

    .link_to_groups {
      color: #836af2;
      cursor: pointer;
    }
    .link_to_groups:hover {
      text-decoration: underline
    }

    .email__warning {
      color: red;
      margin: 0.5em 0 0 0.5em;
      visibility: hidden;
      opacity: 0;
      height: 0;

      transition: all ease 0.4s;
    }

    .email__warning_shown {
      visibility: visible;
      opacity: 1;
      height: 35px;
    }
</style>
