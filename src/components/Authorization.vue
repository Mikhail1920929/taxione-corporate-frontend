<template>
  <div class="q-pa-md">

    <q-form
      @submit="goLogin"
    >
      <q-select
        rounded
        outlined
        color="accent"
        v-model="loginType"
        :options="types"
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
        color="accent"
        class="loginInput"
        type="email"
        v-model="email"
        placeholder="E-mail"
        lazy-rules
        :rules="[
          val => !!val || '* Обязательное поле',
          val => /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(val) || 'Неверный формат электронной почты',
        ]"
      >
        <template v-slot:error>
          Please use maximum 3 characters.
        </template>
      </q-input>
      <q-input
        rounded
        outlined
        color="accent"
        class="loginInput"
        type="password"
        v-model="password"
        placeholder="Пароль"
        lazy-rules
        :rules="[
          val => !!val || '* Обязательное поле',
          val => val.length > 7 && val.length < 17 || 'Пароль должен быть от 8 до 16 символов'
        ]"
      />

      <div class="flex column items-center bottom-block">
        <q-btn label="Войти в кабинет" flat type="submit" class="q-mb-sm enterBtn"/>
        <div class="error">{{ error }}</div>
        <div class="forgetPass" @click="$emit('recover')">
          Забыли пароль?
        </div>
      </div>

    </q-form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Authorization',

  data () {
    return {
      loginType: null,
      types: [
        { label: 'Корпоративный клиент', value: 'corparat' }
      ],
      email: null,
      password: null,
      error: null
    }
  },
  beforeMount () {
    this.loginType = this.types[0]
  },
  methods: {
    ...mapActions({
      loginUser: 'login/loginUser'
    }),

    goLogin () {
      this.loginUser({ email: this.email, password: this.password })
        .then(response => {
        })
        .catch(error => {
          const errorText = error.response.data.message
          this.error = (errorText === 'Unauthorized') ? 'Неверные логин или пароль' : errorText
        })
    }
  }

}
</script>

<style>
  .forgetPass{
    color: #87868e;
    text-decoration: underline;
    cursor: pointer;
  }
  .enterBtn{
    text-transform: none;
    width: 60%;
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
  .bottom-block {
    position: relative;
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
