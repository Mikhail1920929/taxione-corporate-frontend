<template>
    <q-card class="q-pa-md" style="border-radius: 23.5px; font-size: 1rem">

        <q-card-section class="column items-center">
          <span>Вы действительно хотите удалить пользователя?</span>
        </q-card-section>

        <div class="row items-center q-mt-md justify-evenly" style="width: 100%;">
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
                  <q-icon class="modal__icon" color="white">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88 3.16 0 5.89 1.84 7.19 4.5.27.56.91.84 1.5.64.71-.23 1.07-1.04.75-1.72C20.23 10.42 16.65 8 12.5 8z"/></svg>
                  </q-icon>
                  <span>Отменить</span>
                </q-btn>
              </div>

              <div class="btn-block">
                <q-btn type="reset" color="white" class="modal__btn modal__btn-light" unelevated no-caps rounded v-close-popup @click="deleteAndClose(id)">
                  <q-icon class="modal__icon" color="accent">
                    <svg id="Capa_1" style="transform: rotate(45deg);box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%;" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
                  </q-icon>
                  <span>Удалить</span>
                </q-btn>
              </div>
        </div>

    </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UsersDeleteUserModal',

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  methods: {
    ...mapActions({
      deleteUser: 'users/deleteUser'
    }),
    deleteAndClose (id) {
      this.$root.$emit('userDeleted')
      this.deleteUser(id)
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
      width: 40%;
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
