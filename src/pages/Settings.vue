<template>
  <q-page>
      <div class="col-12 pagePaddings">
        <SettingsHeader @sendForm="editInfo" />
      </div>
      <div class="settings__form row col-12">

        <div class="setting__form_column">
          <div class="row settings__item items-center">

              <div class="col-6">
                <div class="column">
                      <span class="settings__label">ИНН</span>
                    <transition name="fade-on-error">
                      <span v-if="!!innError" class="settings__label_error">{{ innError }}</span>
                    </transition>
                </div>
              </div>

            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              @input="innError = false"
              id="inn"
              mask="##########"
              ref="inn"
              placeholder="1234512345"
              :error="!!innError"
              rounded
              outlined
              v-model="inn"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6" for="name">Название организации</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="name"
              rounded
              outlined
              placeholder="ООО «Технопоиск»"
              v-model="name"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6">Индекс</label>
            <q-input
              class="settings__input col-6"
              rounded
              outlined
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              v-model="postcode"
              mask="######"
              :error="!postcode && showEmpty"
              placeholder="123435"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6">Город организации</label>
            <q-input
              class="settings__input col-6"
              rounded
              outlined
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              v-model="city"
              :error="!city && showEmpty"
              placeholder="Москва"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6" for="address"> Адрес организации</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="address"
              rounded
              outlined
              v-model="address"
              :error="!address && showEmpty"
              placeholder="ул. Ленина, д.28, оф.25"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6" for="kpp"> КПП</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="kpp"
              rounded
              outlined
              mask="#########"
              v-model="kpp"
              :error="!kpp && showEmpty"
              placeholder="123412123"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6" for="bik"> Бик</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="bik"
              mask="#########"
              placeholder="121212123"
              rounded
              outlined
              :error="!bik && showEmpty"
              v-model="bik"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6" for="bank_name">Банк</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="bank_name"
              rounded
              outlined
              v-model="bank_name"
              :error="!bank_name && showEmpty"
              placeholder="ПАО «Сбербанк»"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6" for="correspondent"> Корреспондентский счет</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="correspondent"
              mask="####################"
              placeholder="12345678901234567890"
              rounded
              outlined
              :error="!correspondent && showEmpty"
              v-model="correspondent"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center">
            <div class="col-6">
              <div class="column">
                <span class="settings__label">На основании</span>
                <span class="settings__label_secondary">Устава/Доверенности</span>
              </div>
            </div>
            <q-select
              rounded
              outlined
              v-model="based_on"
              :options="bases"
              color="accent"
              menu-anchor="top right"
              menu-self="top right"
              popup-content-class="settingSelect__onBase"
              class="settingsSelect__onBase col-6"
              @popup-show="basedOnIsOpen = true"
              @popup-hide="basedOnIsOpen = false"
              :class="{settingsSelect__onBase_opened: taxFormIsOpen}"
              :error="!based_on && showEmpty"
              behavior="menu"
            />
          </div>
          <div class="row settings__item items-center">
            <label class="settings__label col-6" for="taxForm">Форма налогообложения</label>
            <q-select
              rounded
              outlined
              v-model="tax_form"
              :options="taxForms"
              id="taxForm"
              color="accent"
              popup-content-class="settingSelect__taxFrom"
              class="settingsSelect__taxFrom col-6"
              @popup-show="taxFormIsOpen = true"
              @popup-hide="taxFormIsOpen = false"
              :class="{settingsSelect__onBase_opened: basedOnIsOpen}"
              :error="!tax_form && showEmpty"
              behavior="menu"
            />
          </div>
        </div>

        <div class="setting__form_column">
          <div class="row settings__item items-center justify-end">
            <label class="settings__label col-6" for="payment"> Рассчетный счет</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="payment"
              mask="####################"
              placeholder="12312123112341234567"
              rounded
              outlined
              :error="!payment && showEmpty"
              v-model="payment"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center justify-end">
            <div class="col-6">
              <div class="column">
                <span class="settings__label">Руководитель</span>
                <span class="settings__label_secondary">ФИО, должность</span>
              </div>
            </div>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="supervisor"
              rounded
              outlined
              v-model="chief_fio"
              :error="!chief_fio && showEmpty"
              placeholder="Петров Иван Иванович"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center justify-end">
            <div class="col-6">
              <div class="column">
                <span class="settings__label">Менеджер аккаунта</span>
                <span class="settings__label_secondary">ФИО</span>
              </div>
            </div>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="manager"
              placeholder="Петров Иван Иванович"
              rounded
              outlined
              :error="!manager_fio && showEmpty"
              v-model="manager_fio"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center justify-end">
            <label class="settings__label col-6" for="phone">Номер телефона</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="phone"
              mask="+# (###) ###-##-##"
              unmasked-value
              placeholder="+7 (900) 000-00-00"
              rounded
              outlined
              :error="!phoneUnmasked && showEmpty"
              v-model="phoneUnmasked"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center justify-end">
            <label class="settings__label col-6" for="email">E-mail</label>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              id="email"
              rounded
              outlined
              :error="!email && showEmpty"
              placeholder="example@example.ru"
              v-model="email"
            >
            </q-input>
          </div>
          <div class="row settings__item items-center justify-end">
            <div class="col-6">
                <div class="column">
                      <span class="settings__label">Ваш пароль</span>
                    <transition name="fade-on-error">
                      <span v-if="checkPasswords === 'success' && !password" class="settings__label_error">Введите старый пароль</span>
                    </transition>
                </div>
              </div>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              rounded
              outlined
              type="password"
              id="password"
              v-model="password"
              :error="checkPasswords === 'success' && !password"
            />
          </div>
          <div class="row settings__item items-center justify-end">
            <div class="col-6">
              <div class="column">
                <label class="settings__label" for="newPassword">Введите новый пароль</label>
                <span class="settings__label_secondary" :class="{'settings__label_error': passwordIsCorrect }">Длиной от 8 до 16 знаков</span>
              </div>
            </div>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              color="accent"
              rounded
              outlined
              type="password"
              id="newPassword"
              v-model="newPassword"
              lazy-rules
              :error="passwordIsCorrect"
            />
          </div>
          <div class="row settings__item items-center justify-end">
            <div class="col-6">
                <div class="column">
                      <span class="settings__label">Повторите новый пароль</span>
                    <transition name="fade-on-error">
                      <span v-if="checkPasswords === 'fail'" class="settings__label_error">Пароли не совпадают!</span>
                      <span v-if="checkPasswords === 'success'" class="settings_label_success">Пароли совпадают!</span>
                    </transition>
                </div>
              </div>
            <q-input
              class="settings__input col-6"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              color="accent"
              rounded
              type="password"
              outlined
              id="repeatPassword"
              v-model="repeatPassword"
              lazy-rules
              :error="checkPasswords === 'fail'"
            >
            <template v-slot:append style="margin-right: 15px" v-if="checkPasswords === 'success'">
              <div class="passConfirm">
              </div>
            </template>
            </q-input>
          </div>
          <div class="row justify-end">
            <div class="col-6">
              <div class="column">
                <span class="settings__label">Договор</span>
                <span v-if="getCompanyInfo.agreement_uploaded" class="settings__label_secondary agreement_on_proccesing">
                  {{ agreementLabel }}
                </span>
              </div>
            </div>

            <div class="col-6 row justify-between btns-block">
              <div class="btn-block">
                <q-btn
                  color="accent"
                  class="settings__btn-load settings__btn-load-accent"
                  no-caps
                  rounded
                  unelevated
                  size="lg"
                  @click="goToAgreement"
                >
                  <q-icon size="sm" class="settings__btn_icon">
                      <svg x="0px" y="0px" viewBox="0 0 512.142 512.142" style='width: 0.4em;fill:inherit;stroke:purple;stroke-width:2'>
                        <path d="M479.304,15.801c-2.539-9.237-10.965-15.659-20.565-15.659l-3.563-0.043c-16.149-0.277-58.731-1.003-111.339,14.443
                          C226.568,48.953,144.605,154.745,138.952,277.475H53.405c-8.619,0-16.427,5.184-19.712,13.163
                          c-3.307,7.979-1.472,17.152,4.629,23.253l192,192c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251l192-192
                          c6.101-6.101,7.936-15.275,4.629-23.253c-3.285-7.979-11.093-13.163-19.712-13.163H327.624
                          c-4.075-41.472,0.085-153.216,142.037-237.675C477.896,34.894,481.864,25.081,479.304,15.801z"/>
                      </svg>
                  </q-icon>
                  <span class="q-mr-sm settings__btn_text">Скачать</span>
                </q-btn>
              </div>
              <div class="btn-block">
                <q-btn
                  color="white"
                  class="settings__btn-load"
                  no-caps rounded size="lg"
                  @click="$refs.fileInput.click()"
                >
                  <q-icon size="sm" class="settings__btn_icon">
                      <svg x="0px" y="0px" viewBox="0 0 512.142 512.142" style='width: 0.4em;transform: scaleX(-1);fill:#836af2;stroke:purple;stroke-width:2'>
                        <path d="M450.944,453.437c-136.295-81.1-140.268-188.436-136.377-228.167h105.411c8.294,0,15.77-4.977,18.924-12.636
                          c3.174-7.66,1.413-16.466-4.444-22.323L250.137,5.99c-7.987-7.987-20.951-7.987-28.959,0L36.858,190.31
                          c-5.857,5.857-7.619,14.664-4.444,22.323c3.174,7.659,10.65,12.636,18.924,12.636h82.002
                          c4.854,117.74,84.439,220.488,198.533,253.399c39.649,11.448,72.97,13.128,92.59,13.128c5.161,0,9.359-0.123,12.493-0.205
                          l3.502-0.082c9.216,0,17.306-6.144,19.743-15.032C462.658,467.569,458.869,458.148,450.944,453.437z"/>
                      </svg>
                  </q-icon>
                  <span style="color: #836af2" class="q-mr-sm settings__btn_text">{{ (getCompanyInfo.is_approved) ? 'Загружено' : 'Загрузить' }}</span>
                </q-btn>
                <input ref="fileInput" type="file" name="name" accept="application/pdf" style="display: none;" @change="tryToSendDocs" @click="$refs.fileInput.value = null" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <q-dialog v-model="settingsEditedModal">
        <SettingsEditedModal />
      </q-dialog>

      <q-dialog v-model="SettingsFileSendedModal">
        <SettingsFileSendedModal :text="fileText" />
      </q-dialog>

      <q-dialog v-model="settingsErrorModal">
        <SettingsErrorModal :text="errorText"/>
      </q-dialog>

      <q-dialog v-model="SettingsWarningModal">
        <SettingsWarningModal />
      </q-dialog>

  </q-page>
</template>

<script>
import SettingsHeader from 'components/Settings/SettingsHeader'
import SettingsEditedModal from 'components/Settings/SettingsEditedModal'
import SettingsErrorModal from 'components/Settings/SettingsErrorModal'
import SettingsWarningModal from 'components/Settings/SettingsWarningModal'
import SettingsFileSendedModal from 'components/Settings/SettingsFileSendedModal'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Settings',

  data () {
    return {
      inn: null,
      name: null,
      address: null,
      kpp: null,
      bik: null,
      bank_name: null,
      correspondent: null,
      payment: null,
      phoneUnmasked: null,
      email: null,

      postcode: null,
      city: null,
      based_on: null,
      tax_form: null,
      chief_fio: null,
      manager_fio: null,

      password: null,
      newPassword: null,
      repeatPassword: null,
      taxForms: ['ОСН - 20%', 'УСН - 15%', 'УСН - 7%'],
      bases: ['Устава', 'Доверенности', 'Свидетельства'],

      isEditing: false,
      basedOnIsOpen: false,
      taxFormIsOpen: false,
      settingsEditedModal: false,
      settingsErrorModal: false,
      SettingsWarningModal: false,
      SettingsFileSendedModal: false,
      innError: false,
      showEmpty: false,
      errorText: '',
      fileText: ''
    }
  },

  components: {
    SettingsHeader,
    SettingsEditedModal,
    SettingsErrorModal,
    SettingsWarningModal,
    SettingsFileSendedModal
  },

  mounted () {
    this.loadCompanyInfo()
      .then(response => {
        this.updateInfo()
        document.getElementsByTagName('input')[0].readOnly = true
      })
  },

  computed: {
    ...mapGetters({
      getCompanyInfo: 'settings/companyInfo'
    }),
    phone () {
      return (this.phoneUnmasked) ? '+' + this.phoneUnmasked : null
    },
    agreementLabel () {
      return (this.getCompanyInfo.is_approved) ? 'Компания подтверждена' : (this.getCompanyInfo.agreement_uploaded) ? 'Договор находится в обработке' : 'Договор не отправлен'
    },
    checkPasswords () {
      if (this.newPassword && this.repeatPassword) {
        if (this.newPassword === this.repeatPassword) {
          return 'success'
        } else {
          return 'fail'
        }
      } else {
        return 'zero'
      }
    },
    passwordIsCorrect () {
      if (this.newPassword) {
        return this.newPassword.length < 8 || this.newPassword.length > 15
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapActions({
      loadCompanyInfo: 'settings/loadCompanyInfo',
      editCompanyInfo: 'settings/editCompanyInfo',
      sendDocs: 'settings/sendDocs'
    }),

    tryToSendDocs () {
      let file = this.$refs.fileInput.files[0]
      let agreement = new FormData()
      agreement.append('agreement', file)
      this.sendDocs(agreement)
        .then((response) => {
          this.fileText = response.data.message || 'Документ успешно загружен'
          this.SettingsFileSendedModal = true
          this.loadCompanyInfo()
            .then(async (response) => {
              new Promise((resolve, reject) => { setTimeout(() => { this.SettingsFileSendedModal = false; resolve('result') }, 1200) }).then(async () => {
                if (!response.data.data.is_approved && response.data.data.agreement_uploaded) {
                  await this.showNotif(`<h6 style="padding: 0; margin: 0 0 0.5em; text-align: center">Договор на проверке</h6>
                    <p style="padding: 0; margin: 0 0 0.5em;">После прохождения проверки Вам станут доступны все функции кабинета.</p>`)
                  document.querySelector('.q-notification__actions').lastChild.style.display = 'none'
                }
              })
            })
        })
        .catch((error) => {
          this.settingsErrorModal = true
          if (error.response) {
            this.errorText = (error.response.data.errors) ? error.response.data.errors.agreement[0] : error.response.data.message
            if (!error.response.data.message) this.errorText = 'Некорректный файл'
          } else {
            this.errorText = 'Произошла ошибка. Попробуйте позже.'
          }
        })
    },

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

    goToAgreement () {
      if (this.getCompanyInfo.agreement_url) {
        window.open(this.getCompanyInfo.agreement_url)
      } else {
        this.SettingsWarningModal = true
        this.showEmpty = true
      }
    },

    updateInfo () {
      this.inn = this.getCompanyInfo.inn
      this.name = this.getCompanyInfo.name
      this.phoneUnmasked = this.getCompanyInfo.phone
      this.email = this.getCompanyInfo.email
      this.address = this.getCompanyInfo.address
      this.kpp = this.getCompanyInfo.kpp
      this.bik = this.getCompanyInfo.bik
      this.correspondent = this.getCompanyInfo.correspondent
      this.payment = this.getCompanyInfo.payment
      this.bank_name = this.getCompanyInfo.bank_name
      this.postcode = this.getCompanyInfo.postcode
      this.city = this.getCompanyInfo.city
      this.based_on = this.getCompanyInfo.based_on
      this.tax_form = this.getCompanyInfo.tax_form
      this.chief_fio = this.getCompanyInfo.chief_fio
      this.manager_fio = this.getCompanyInfo.manager_fio
    },

    async editInfo () {
      let newSettings = {}
      for (let key in this.getCompanyInfo) {
        if (this[key] !== this.getCompanyInfo[key]) newSettings[key] = this[key]
      }
      if (this.checkPasswords === 'success' && this.password) {
        newSettings.password = this.password
        newSettings.new_password = this.newPassword
      }
      if (Object.keys(newSettings).length > 5) {
        this.editCompanyInfo(newSettings)
          .then(async (response) => {
            this.settingsEditedModal = true
            new Promise((resolve, reject) => { setTimeout(() => { this.settingsEditedModal = false; resolve('result') }, 1200) }).then(() => {
              if (!response.data.data.is_approved && !response.data.data.agreement_uploaded && !response.data.data.agreement_url) {
                this.showNotif(`<h6 style="padding: 0; margin: 0 0 0.5em; text-align: center">Присоединиться к договору</h6>
                  <p style="padding: 0; margin: 0 0 0.5em;">Чтобы начать работу в кабинете, необходимо загрузить скан Договора на оказание услуг в Настройках.</p>`, true, this.goSettings)
              } else if (!response.data.data.is_approved && !response.data.data.agreement_uploaded && response.data.data.agreement_url) {
                this.showNotif(`<h6 style="padding: 0; margin: 0 0 0.5em; text-align: center">Договор сформирован</h6>
                  <p style="padding: 0; margin: 0 0 0.5em;">Скачайте и ознакомьтесь с договором. Загрузите скан подписанного договора.</p>`, true, this.goSettings)
              }
            })
          })
          .catch((error) => {
            if (error.response.data.errors && error.response.data.errors.inn) {
              this.innError = error.response.data.errors.inn[0]
            } else {
              this.settingsErrorModal = true
              this.errorText = error.response.data.message
            }
            console.error(error)
          })
      } else {
        this.settingsErrorModal = true
        this.errorText = 'Сначала внесите изменения, а затем сохраните данные.'
      }
    },
    inputFocus (e) {
      if (e.target.labels) {
        if (e.target.labels[0]) e.target.labels[0].style.backgroundColor = 'rgb(247, 247, 255)'
      }
    },
    inputBlur (e) {
      if (e.target.labels) {
        e.target.labels[0].style.backgroundColor = 'white'
      }
    }
  }
}
</script>

<style scoped>
    .pagePaddings {
      padding: 20px 16px 16px;
    }
    .settings__form {
      padding: 0 3.25vw;
    }
    .setting__form_column {
      width: 48.5%;
    }
    .setting__form_column:first-child {
      margin-right: 3%;
    }
    .settings__item {
      margin-bottom: 1em;
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
    .settings__label_error {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.85em;
      color: #C10015;
    }
    .settings_label_success {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.85em;
      color: #43d7c7;
    }

    .settingsSelect__onBase_opened {
      z-index: 200;
    }
    .settings__input {
      max-width: 300px;
      z-index: 2;
      padding-bottom: 0px;
      height: 45px;
      position: relative;
      font-size: 14px;
      border-radius: 30px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
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
    .setting__btn_reverse {
      color: white;
      background-image: linear-gradient(to top, #836af2, #6a87f2) !important;
    }
    .settings__input:hover .setting__btn-edit{
      visibility: visible;
    }

    .btns-block {
      max-width: 300px;
    }

    .btn-block {
      width: 48%;
    }
    .settings__btn-load {
      font-size: 0.875rem !important;
      padding: 0.325em 0em;
      width: 100%;
      max-width: 142px;
    }
    .settings__btn-load-accent {
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
    }

    .settings__btn_icon {
      margin-left: -0.7em;
    }

    .settings__btn_text {
      margin-right: -0.7em;
    }

    .agreement_on_proccesing {
      font-size: 0.825rem;
      color: #43d7c7;
    }

    .passConfirm{
      width: 20px;
      height: 20px;
      background-color: #7679f2;
      border-radius: 50%;
      position: relative;
    }
    .passConfirm:after{
      position: absolute;
      left: 7px;
      top: 4px;
      width: 6px;
      height: 10px;
      content: '';
      border: solid #fff;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    .fade-on-error-enter-active, .fade-leave-active {
      transition: all .5s;
    }
    .fade-on-error-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
      opacity: 0;
    }

    @media (min-width: 1000px) and (max-width: 1076px) {
      .settings__btn_icon {
        display: none;
      }
      .settings__btn_text {
        margin-right: 0;
      }
    }
    @media (max-width: 810px) {
      .settings__btn_icon {
        display: none;
      }
      .settings__btn_text {
        margin-right: 0;
      }
    }
</style>
