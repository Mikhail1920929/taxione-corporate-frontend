<template>
    <q-card class="q-pa-md" style="border-radius: 23.5px; font-size: 1rem; width: 480px">

        <q-card-section class="column items-center text-center">
          <span class="modal__message">{{ text }}</span>
        </q-card-section>

        <div class="row items-center q-mt-md justify-evenly" style="width: 100%;">

              <div class="btn-block">
                <q-btn type="reset" color="white" class="modal__btn modal__btn-light" unelevated no-caps rounded v-close-popup>
                  <q-icon class="modal__icon" color="accent">
                    <svg id="Capa_1" style="transform: rotate(45deg);box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%;" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
                  </q-icon>
                  <span>Продолжить</span>
                </q-btn>
              </div>
        </div>

    </q-card>
</template>

<script>

export default {
  name: 'UsersDeleteUserModal',

  props: {
    text: {
      required: true,
      type: String
    }
  }
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

    .modal__btn {
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      padding: 0.5em 1em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2);
    }

    .modal__btn-light {
        background: #ffffff;
        color: #000000 !important;
    }

    .btn-block {
      width: 35%;
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
