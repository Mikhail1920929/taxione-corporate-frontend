<template>
  <header class="header">
      <div class="row items-center">
          <div class="header__text row items-center">
              <span class="header__title">Настройки</span>
              <div class="header__splitier"></div>
              <span class="header__firm">Информация о компании</span>
          </div>
          <q-btn
            color="accent"
            class="header__btn header__btn-light"
            unelevated
            no-caps
            rounded
            @click="$emit('sendForm')"
          >
            <q-icon class="header__icon" color="white">
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
  </header>
</template>

<script>
export default {
  name: 'Registration',

  data () {
    return {
      date: '2019/02/01'
    }
  }
}
</script>

<style scoped>
    .header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 1em 2.15em 1.15em 2.25em;
      margin-bottom: 2px;
      border-radius: 0 30px 0 0;
    }

    .header__title {
      font-size: 2.25rem;
      margin-top: -0.125em;
      letter-spacing: 0.03em
    }

    .header__splitier {
        width: 2px;
        height: 1.5em;
        background-color: #e3e2ec;
        margin: 0 1.5em -0.15em;
    }

    .header__firm {
      color: #595187;
      font-size: 1.5rem;
      letter-spacing: 0.03em;
    }
    .header__btn {
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

    .header__icon {
        width: 0.5625em;
        height: 0.5625em;
        margin-right: 0.5em;
    }
</style>
