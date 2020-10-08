<template>
  <div class="q-pa-md">
    <q-form
      @submit="goRegistration"
    >

      <q-input
        rounded
        outlined
        type="email"
        v-model="email"
        placeholder="E-mail"
        class="loginInput recoverInput"
        color="accent"
        lazy-rules
        @input="emailIsExist = true"
        :rules="[
          val => !!val || '* Обязательное поле',
          val => /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(val) || 'Неверный формат электронной почты',
        ]"
      />

      <p class="email__warning" :class="{ 'email__warning_shown' : !emailIsExist}">Пользаватель с таким e-mail не зарегистрирован</p>

      <div style="text-align: justify; color: #87868e; margin-top: 10px;">На указанный E-mail адрес будет выслано сообщение с временной ссылкой. После перехода по ссылке из полученного сообщения следуйте инструкциям на сайте.</div>
      <div class="flex column items-center">
        <q-btn label="Восстановить пароль" flat type="submit" class="enterBtn"/>
        <div class="error">{{ error }}</div>
      </div>
      <div class="backLogin flex justify-center" @click="$emit('backLogin')">Вернуться назад</div>
    </q-form>

    <q-dialog v-model="RecoverPasswordModal">
      <RecoverPasswordModal />
    </q-dialog>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RecoverPasswordModal from 'components/RecoverPasswordModal'

export default {
  name: 'Registration',

  components: {
    RecoverPasswordModal
  },

  data () {
    return {
      email: null,
      error: null,
      RecoverPasswordModal: false,
      emailIsExist: true
    }
  },

  methods: {
    ...mapActions({
      restorePassword: 'login/restorePassword'
    }),
    goRegistration () {
      if (this.email) {
        this.restorePassword(this.email)
          .then(() => { this.RecoverPasswordModal = true; setTimeout(() => { this.RecoverPasswordModal = false }, 1200) })
          .catch((error) => {
            if (error.response.status === 422) {
              this.emailIsExist = false
            }
          })
      }
    }
  }

}
</script>

<style scoped>
  .enterBtn{
    text-transform: none;
    width: 60%;
    height: 48px;
    border-radius: 24px;
    border: 0px;
    outline: none;
    color: #fff;
    background: linear-gradient(210deg, #836af2, #6a87f2);
    margin-top: 30px;
  }
  .error{
    color: #ff0000;
    margin-top: 8px;
  }
  .backLogin{
    color: #87868e;
    cursor: pointer;
    margin-top: 15px;
  }
  .backLogin:hover{
    text-decoration: underline;
  }
  .recoverInput {
    margin: 0 auto;
  }
  .email__warning {
      color: red;
      /* margin: 0.5em 0 0 0.5em; */
      text-align: center;
      visibility: hidden;
      opacity: 0;
      height: 0;

      transition: all ease 0.4s;
  }

  .email__warning_shown {
    visibility: visible;
    opacity: 1;
    height: 20px;
  }
</style>
