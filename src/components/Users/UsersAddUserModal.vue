<template>
      <q-card class="q-pa-xs" style="width: 700px; max-width: 30vw; border-radius: 23.5px">

        <q-card-section class="row items-center q-pb-md">
          <div class="text-h6">Добавление</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input type="text" v-model="first_name" placeholder="Имя" color="accent" rounded outlined />

            <q-input type="text" v-model="last_name" placeholder="Фамилия" color="accent" rounded outlined />

            <q-input type="number" v-model="post" placeholder="Должность" color="accent" rounded outlined />

            <q-input type="email" v-model="email" placeholder="E-mail" color="accent" rounded outlined />

            <q-input type="tel" v-model="phone" placeholder="Номер телефона" mask="# (###) ###-##-##" color="accent" rounded outlined />

            <q-input type="number" v-model="limit" placeholder="Лимит" color="accent" rounded outlined prefix="₽" />

            <div class="row items-center justify-center">
              <q-btn label="Добавить" class="modal__btn" unelevated no-caps rounded type="submit" color="accent" v-close-popup/>
              <q-btn label="Очистить" class="modal__btn modal__btn-light q-ml-sm" no-caps rounded type="reset" flat />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UsersAddUserModal',

  data () {
    return {
      first_name: null,
      last_name: null,
      post: null,
      phone: null,
      email: null,
      limit: null
    }
  },

  methods: {
    ...mapActions({
      addUser: 'users/addUser'
    }),

    onSubmit () {
      this.addUser({
        first_name: this.first_name,
        last_name: this.last_name,
        post: this.post,
        phone: this.phone,
        email: this.email,
        limit: this.limit
      })
    },
    onReset () {
      this.first_name = null
      this.last_name = null
      this.post = null
      this.phone = null
      this.email = null
      this.limit = null
    }
  }

}
</script>

<style scoped>
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
</style>
