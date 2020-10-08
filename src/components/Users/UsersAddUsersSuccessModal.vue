<template>
    <q-card class="q-pa-md" style="border-radius: 23.5px; font-size: 1rem; width: 480px">

        <q-card-section class="column items-center text-center">
          <span class="modal__message">Пользователи добавлены</span>
          <q-icon size="lg" color="accent" class="modal__icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/></svg>
          </q-icon>
        </q-card-section>

    </q-card>
</template>

<script>

export default {
  name: 'UsersAddUsersSuccessModal'
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
      margin-top: -0.3em;
      font-family: 'SFProDisplay', sans-serif;
      font-size: 2rem;
      margin-bottom: 0.4em;
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
</style>
