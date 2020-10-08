<template>
  <div class="item row justify-between items-center" :class="{ itemValidated: itemValidated }">
      <div class="item_block item__user col-3">
            <q-input
              class="settings__input"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              @input="updateUserData"
              color="accent"
              id="fullname"
              placeholder="John Doe"
              rounded
              outlined
              v-model="name"
              bottom-slots
              error-message="Введите имя и фамилию"
              :error="!fullnameIsValid"
            >
            </q-input>
      </div>
      <div class="item_block item__number col-2">
          <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              @click="errorPhoneCancel = !errorPhoneText"
              color="accent"
              id="phone"
              ref='phoneInput'
              placeholder="+7 (457) 324-43-34"
              rounded
              outlined
              v-model="phoneUnmasked"
              :mask="phoneMask"
              bottom-slots
              :error-message="phoneErrorText"
              :error="errorPhoneCancel && errorPhoneText || errorIncorrect"
            >
            </q-input>
      </div>
      <div class="item_block item__sum col-2">
          <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              @change="updateUserData"
              @click="errorMailCancel = !errorMailText"
              color="accent"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              rounded
              outlined
              v-model="email"
              bottom-slots
              error-message="Некорректный адрес"
              :error="errorMailCancel && errorMailText"
            >
            </q-input>
      </div>
      <div class="item_block item__amount col-2">
        <div class="header__select" :class="{ header__select_show: postIsSearching}">
        <input
          type="text"
          v-model="group.name"
          class="header__select_input"
          :class="{ header__select_input_white: postIsSearching}"
          @focus="postIsSearching = true"
          readonly
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
            header__select_answers_show230: postIsSearching,
            header__select_answers_show95: postIsSearching && getGroups.length === 1,
            header__select_answers_show140: postIsSearching && getGroups.length === 2,
            header__select_answers_show190: postIsSearching && getGroups.length === 3
          }"
          :thumb-style="thumbStyle">
            <q-list v-if="getGroups.length > 0">
              <q-item class="header__select_answer" @click="group = cgroup; postIsSearching = false; updateUserData()" v-for="cgroup in getGroups" :key="cgroup.id" clickable v-ripple>
                <q-item-section>{{ cgroup.name }}</q-item-section>
              </q-item>
            </q-list>
            <div v-else style="text-align: center; margin-top: 65px; font-size: 12px;">Тут пока пусто, добавьте <span class="link_to_groups" @click="goToUsersAndAddGroup">группы</span></div>
          </q-scroll-area>
      </div>
      </div>
      <div class="item_block item__bill col-3 row justify-start items-center">
          <q-input
                class="settings__input settings__input_limit"
                :class="{ disable_limit: isUnlimited }"
                @focus="(evt) => inputFocus(evt)"
                @blur="(evt) => inputBlur(evt)"
                @input="updateUserData"
                color="accent"
                id="limit"
                rounded
                outlined
                type="text"
                v-model="limit"
                :readonly="isUnlimited"
              >

                <div v-show="!isUnlimited" class="setting__btn-edit_before flex items-center justify-center">
                    <q-icon class="setting__icon" @click="() => { if (limit) limit-- }">
                      <svg xmlns="http://www.w3.org/2000/svg"  height="24" viewBox="0 0 24 24" width="24" style="margin: -7px -2px 0 0;"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
                    </q-icon>
                </div>

                <div v-show="!isUnlimited" class="setting__btn-edit_after flex items-center justify-center">
                    <q-icon class="setting__icon" @click="limit++">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" style="margin: -8px -2px 0 0; transform: scaleY(-1)"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
                    </q-icon>
                </div>
              </q-input>
              <div class="policy flex justify-between items-center">
                <div class="checkbox">
                  <label class="policyCheckbox">
                    <input type="checkbox" checked="checked" v-model="isUnlimited">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="policyInfo" >
                  Без лимита
                </div>
              </div>

              <q-btn v-if="usersLength > 1" class="item__btn" unelevated round color="white" @click="$root.$emit('deleteNewUser', userID)">
                <q-icon class="item__icon item__icon-delete">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="348.333px" height="348.334px" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334; width: 40%; margin: -20.1px 0 0 -21.1px"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AsYouType } from 'libphonenumber-js'
import { getMask } from '../../phone_masks.js'

export default {
  name: 'UsersItem',

  props: {
    userID: {
      type: Number,
      required: true
    },
    usersLength: {
      type: Number,
      required: true
    },
    errorMailText: {
      type: Boolean,
      required: true
    },
    errorPhoneText: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      name: '',
      group: { id: null },
      phoneUnmasked: '',
      phone: '',
      phoneIsValid: false,
      phoneMask: '+###############',
      email: '',
      limit: 0,

      errorMailCancel: true,
      errorPhoneCancel: true,

      isEditing: false,
      isUnlimited: false,
      isInputing: false,
      postIsSearching: false
    }
  },

  mounted () {
    this.$root.$on('checkUpdatedUsers', () => {
      this.errorMailCancel = true
      this.errorPhoneCancel = true
    })
    window.addEventListener('click', (e) => {
      if (e.target.localName !== 'input' && e.target.innerText !== 'keyboard_arrow_down') {
        this.postIsSearching = false
      }
    })
  },

  watch: {
    phoneUnmasked (value, oldVal) {
      if (value[0] === '+' || !value.length) {
        const phone = new AsYouType()
        const prevPhone = new AsYouType()
        prevPhone.input(oldVal)
        this.phoneUnmasked = phone.input(value)
        this.phoneIsValid = phone.isPossible()
        if (phone.getNumber()) this.phone = phone.getNumber().number
        if (prevPhone.getNumber()) this.prevPhone = prevPhone.getNumber().number
        if (phone.getNumber()) {
          this.phoneUnmasked = ''
          this.phoneMask = getMask(phone.getNumber().country, phone.getNumber().number)
          const input = this.$refs.phoneInput.$refs.input
          input.blur()
          this.phoneUnmasked = value
          input.focus()
        }
      } else {
        this.phoneUnmasked = '+' + value
      }
      this.$root.$emit('updateUser', {
        id: this.userID,
        name: this.name,
        group_id: this.group_id,
        phone: this.phone,
        prevPhone: this.prevPhone,
        phoneIsValid: this.phoneIsValid,
        email: this.email,
        limit: this.limit,
        isUnlimited: this.isUnlimited
      })
    },
    limit (val) {
      this.limit = this.limit + ''
      this.limit = this.limit.replace(/[^0-9]/g, '')
      this.limit = (!this.limit) ? 0 : +this.limit
      if (this.limit) {
        this.limit = (this.limit < 0) ? 0 : (this.limit > 100000000) ? '100000000' : this.limit
        this.updateUserData()
      }
    },
    isUnlimited (val) {
      this.updateUserData()
    }
  },

  computed: {
    ...mapGetters({
      getGroups: 'groups/groups'
    }),
    group_id () {
      return this.group.id
    },
    fullnameIsValid () {
      let answer = this.isInputing || this.name || this.name === ''
      this.$root.$emit('dataIsValid', answer)
      return answer
    },
    errorIncorrect () { return !this.phoneIsValid && !this.isInputing && !!this.phoneUnmasked.length },
    phoneErrorText () { return (this.errorIncorrect) ? 'Некорректный номер' : 'Номер уже занят' },
    itemValidated () { return !this.fullnameIsValid || (this.errorPhoneCancel && this.errorPhoneText) || (this.errorMailCancel && this.errorMailText) || this.errorIncorrect },
    thumbStyle () {
      return {
        opacity: 0
      }
    }
  },

  methods: {
    // getMask (country) {
    //   console.log(country)
    //   switch (country) {
    //     case 'RU':
    //       return '+# (###) ###-##-##'
    //     case 'AT':
    //       return '+## (#) ###-####'
    //     default:
    //       return '+# (###) ###-##-##'
    //   }
    // },
    updateUserData () {
      this.$root.$emit('updateUser', {
        id: this.userID,
        name: this.name,
        group_id: this.group_id,
        phone: this.phone,
        phoneIsValid: this.phoneIsValid,
        email: this.email,
        limit: this.limit,
        isUnlimited: this.isUnlimited
      })
    },
    goToUsersAndAddGroup () {
      this.$router.push({ name: 'users', params: { openModal: true } })
    },
    inputFocus (e) {
      if (e.target.labels) {
        this.isInputing = true
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
        this.isInputing = false
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
        input.nextSibling.style.backgroundColor = 'white'
        input.nextSibling.style.color = '#7679f2'
        input.style.color = '#bec0e0'
      }
    }
  }

}
</script>

<style scoped>
    .item {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      color: #222734;
      padding: 0.6em 2em;
      margin-bottom: 0.6875em;
      width: 100%;
      border-radius: 0 10px 10px 10px;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26);
      border: solid 1px #f5f4fb;
      background-color: #ffffff;

      transition: all 0.2s ease 0.2s
    }
    .itemValidated {
      padding-bottom: 2em;
    }
    .item_block {
        padding-right: 0.725em;
    }
    .item_block:last-child {
        padding-right: 0;
    }
    .item__btn {
      margin-left: auto;
      width: 1.5em;
      height: 1.5em;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
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
      flex-wrap: wrap !important;
    }

    .settings__input_limit {
      max-width: 92px;
      margin-right: 0.3em;
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

     .policy{
      padding-left: 40px;
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

  .hiddenWhenValidate {
    visibility: hidden !important;
  }
  .settingsSelect__onBase_opened {
      z-index: 200;
    }

    .header__select {
      width: 18em;
      z-index: 3;
      position: relative;
      width: 100%;
      height: 45px;
      margin-top: -4px;
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

      padding: 2.5em 1em 0 1em;
      border-radius: 18px;
      box-shadow: 0px 5px 18px 0 rgba(231, 234, 246, 0.79);

      transition: height 0.125s ease 0s;
    }
    .header__select_answers_show95 {
      height: 95px !important;
    }
    .header__select_answers_show140 {
      height: 140px !important;
    }
    .header__select_answers_show190 {
      height: 190px !important;
    }
    .header__select_answers_show230 {
      height: 230px;
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
    .link_to_groups {
      color: #836af2;
      cursor: pointer;
    }
    .link_to_groups:hover {
      text-decoration: underline
    }
</style>
