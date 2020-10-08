<template>
      <q-card class="q-pa-xs" style="width: 480px; border-radius: 23.5px; font-size: 1rem">

        <q-card-section class="row justify-end q-pa-xs q-pb-none">
          <q-btn ref="closeBtn" flat round dense v-close-popup>
            <q-icon class="header__icon" color="white" size="xs">
              <svg id="Capa_1" style="box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%; transform: rotate(45deg);" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
            </q-icon>
          </q-btn>
        </q-card-section>

        <q-card-section class="column items-center text-center">
          <span class="modal__message">Часовой пояс заказа, отличается от местного. Продолжить?</span>
        </q-card-section>

        <q-card-section class="modal__form_section -ceitemsnter q-pt-none">
            <div class="row items-center q-mt-md justify-end" style="width: 100%; max-width: 340px;">

              <div class="btn-block">
                <q-btn
                  color="accent"
                  class="modal__btn"
                  unelevated
                  no-caps
                  rounded
                  type="submit"
                  v-close-popup
                >
                  <span>Назад</span>
                </q-btn>
              </div>

              <div class="btn-block">
                <q-btn color="white" class="modal__btn modal__btn-light" unelevated no-caps rounded @click="$root.$emit('makeOrder')">
                  <span>Заказать</span>
                </q-btn>
              </div>

            </div>
        </q-card-section>
      </q-card>
</template>

<script>

export default {
  name: 'addOrderWarning'
}
</script>

<style scoped>

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

    .modal__message {
      font-size: 1.5rem;
    }

    .modal__form_section {
      padding: 0 3.125em 2.1em;
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
        margin-left: 8%;
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
</style>
