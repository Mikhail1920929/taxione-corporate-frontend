<template>
  <q-page class="loginPage flex column items-center">
    <div class="loginHeader flex column items-center">
      <img src="../statics/color_logo.svg" alt="" style="width: 25%;">
      <span v-if="login === false && reg === false">Восстановление пароля</span>
    </div>
    <div class="loginContainer column items-center">
      <div class="containerHead row justify-center" v-if="login === true || reg === true">
        <button class="headBtn headBtnLog" :class="{headBtnActive: login === false}" @click="login = true, reg = false">Войти</button>
        <button class="headBtn headBtnReg" :class="{headBtnActive: login === true}" @click="login = false, reg = true">Зарегистрироваться</button>
      </div>
      <Authorization v-if="login" @recover="login = false, reg = false" />
      <Registration v-if="reg" />
      <RecoverPassword v-if="login === false && reg === false" @backLogin="login = true, reg = false" />
    </div>
  </q-page>
</template>

<script>
import Authorization from '../components/Authorization'
import Registration from '../components/Registration'
import RecoverPassword from '../components/RecoverPassword'
export default {
  name: 'PageIndex',
  data () {
    return {
      login: true,
      reg: false
    }
  },
  components: {
    Authorization,
    Registration,
    RecoverPassword
  }
}
</script>

<style>
  .loginPage{
    width: 100%;
    height: 100%;
    background-image: url("../statics/bg.png");
    background-size: cover;
    background-position: center center;
  }
  .loginHeader{
    margin-top: 60px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
  }
  .loginHeader img{
    margin-bottom: 35px;
  }
  .loginContainer{
    margin-top: 2em;
    width: 480px;
    background-color: #ffffff;
    box-shadow: 0px 0px 15px 0px #e7eaf6;
    border-radius: 20px;
    padding: 30px 54px;
  }
  .containerHead{
    width: 100%;
    padding-bottom: 24px;
    border-bottom: 1px solid #f7f7f7;
  }
  .headBtn{
    border: none;
    color: #564e85;
    font-size: 24px;
    outline: none;
    background: #ffffff;
  }
  .headBtnActive{
    padding: 15px 20px;
    border-radius: 24px;
    border: 0px;
    background-color: #ffffff;
    box-shadow: 0px 0px 15px 0px #e7eaf6;
    font-size: 14px;
    color: #7679f2;
  }
  .headBtnLog {
    margin-right: 35px;
  }
  .headBtnReg {

  }
</style>
