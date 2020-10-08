<template>
  <div class="q-pa-md">

    <q-form
      @submit="goRegistration"
      class="registration column items-center"
    >
      <q-select
        rounded
        outlined
        color="accent"
        v-model="regType"
        :options="types"
        option-value="value"
        emit-value
        map-options
        class="loginInput"
        popup-content-class="loginSelect"
        lazy-rules
        :rules="[
          val => !!val || '* Обязательное поле',
        ]"
      />
      <q-input
        rounded
        outlined
        class="loginInput"
        color="accent"
        v-model="inn"
        type="text"
        placeholder="ИНН"
        :mask="innMask"
        unmasked-value
        lazy-rules
        :rules="[
          val => !!val || '* Обязательное поле',
          val => val.length === innMask.length || 'Неверный формат ИНН',
        ]"
      />

      <q-input
        rounded
        outlined
        class="loginInput"
        type="email"
        v-model="email"
        placeholder="E-mail"
        color="accent"
        lazy-rules
        :rules="[
          val => !!val || '* Обязательное поле',
          val => /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(val) || 'Неверный формат электронной почты',
        ]"
      />
      <q-input
        rounded
        outlined
        class="loginInput"
        type="password"
        v-model="password"
        placeholder="Пароль"
        color="accent"
        lazy-rules
        :rules="[
          val => !!val || '* Обязательное поле',
          val => val.length > 7 && val.length < 17 || 'Пароль должен быть от 8 до 16 символов'
        ]"
      />
      <q-input
        rounded
        outlined
        class="loginInput"
        type="password"
        v-model="repPassword"
        placeholder="Повторите пароль"
        color="accent"
        lazy-rules
        error-message="Пароли не совпадают"
        :error="checkPasswords === 'fail'"
      >
        <template v-slot:append style="margin-right: 15px" v-if="checkPasswords === 'success'">
          <div class="passConfirm">
          </div>
        </template>
      </q-input>

      <div class="column items-center bottom-block">
        <q-btn label="Зарегистрироваться" flat type="submit" class="enterBtn"/>
        <div class="error" style="text-align: center;">{{ error }}</div>
        <div class="policy flex justify-between items-center" style="width: 300px">
          <div class="checkbox">
            <label class="policyCheckbox">
              <input type="checkbox" checked="checked" v-model="policyAgree">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="policyInfo" >
            Нажимая Зарегистрироваться вы согласны с <router-link :to="{name: 'policy'}" target="_blank">Политикой конфиденциальности</router-link>
          </div>
        </div>
      </div>
    </q-form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Registration',

  data () {
    return {
      regType: null,
      types: [
        { label: 'Корпоративный клиент ООО', value: 'ooo' },
        { label: 'Корпоративный клиент ИП', value: 'ip' }
      ],
      inn: null,
      email: null,
      password: '',
      repPassword: '',
      policyAgree: false,
      error: null
    }
  },
  beforeMount () {
    this.regType = 'ooo'
  },
  computed: {
    innMask () {
      if (this.regType === 'ooo') {
        return '##########'
      } else if (this.regType === 'ip') {
        return '############'
      } else {
        return '##########'
      }
    },
    checkPasswords () {
      if (this.password && this.repPassword) {
        if (this.password === this.repPassword) {
          return 'success'
        } else {
          return 'fail'
        }
      } else {
        return 'zero'
      }
    }
  },
  methods: {
    ...mapActions({
      registrateUser: 'login/registrateUser'
    }),
    goRegistration () {
      if (this.policyAgree === true && this.checkPasswords === 'success') {
        this.registrateUser({ inn: this.inn, email: this.email, password: this.password, repPassword: this.repPassword })
          .then(response => {
            this.$router.push({ name: 'settings' })
          })
          .catch(error => {
            if (error.response.data.errors && error.response.data.errors.email) this.error = 'Клиент с такой почтой уже зарегистрирован в системе'
            else if (error.response.data.errors && error.response.data.errors.inn) this.error = 'Клиент с таким ИНН уже зарегистрирован в системе'
            else this.error = error.response.data.message
          })
      } else if (this.checkPasswords === 'fail' || this.checkPasswords === 'zero') {
        this.error = 'Пароли не совпадают'
      } else {
        this.error = 'Пожалуйста, согласитесь с Политикой конфиденциальности'
      }
    }
  }

}
</script>

<style scoped>
  .enterBtn{
    text-transform: none;
    width: 300px;
    height: 48px;
    border-radius: 24px;
    border: 0px;
    outline: none;
    color: #fff;
    background: linear-gradient(210deg, #836af2, #6a87f2);
    margin-top: 15px;
  }
  .error{
    color: #ff0000;
    margin: 8px 0;
  }
  .policy{
    width: 60%;
  }
  .policyInfo{
    width: calc(100% - 36px);
    font-size: 12px;
    color: #87868e;
  }
  .policyInfo a{
    color: #87868e;
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
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #e3e3fae8;
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

  .bottom-block {
    position: relative;
    width: 100%;
  }

  .bottom-block::before {
    position: absolute;
    content: '';
    top: -5px;
    left: 0;
    margin: 0 -32px;

    display: block;
    width: calc(100% + 72px);
    height: 1px;
    background: #f7f7f7;
  }
</style>
