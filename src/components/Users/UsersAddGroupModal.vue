<template>
      <q-card class="q-pa-xs" style="width: 480px; border-radius: 23.5px; font-size: 1rem">

        <q-card-section class="row justify-end q-pa-xs q-pb-none">
          <q-btn ref="closeBtn" flat round dense v-close-popup>
            <q-icon class="header__icon" color="white" size="xs">
              <svg id="Capa_1" style="box-shadow: 0px 0px 5px 0px rgba(200, 200, 200, 0.75); border-radius: 50%; transform: rotate(45deg);" enable-background="new 0 0 515.556 515.556" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm128.889 290h-96.667v96.667h-64.444v-96.667h-96.667v-64.444h96.667v-96.667h64.444v96.667h96.667z"/></svg>
            </q-icon>
          </q-btn>
        </q-card-section>

        <div class="modal__header text-center">Добавить группу</div>

        <q-card-section class="modal__form_section items-center q-pt-none">
          <q-form
            @submit="addGroup(groupName)"
            class="modal__form q-gutter-sm column items-center q-pt-md"
          >
            <q-input
              class="settings__input"
              @focus="(evt) => inputFocus(evt)"
              @blur="(evt) => inputBlur(evt)"
              color="accent"
              id="fullname"
              rounded
              outlined
              v-model="groupName"
              placeholder="Новая группа"
            >
            </q-input>

            <div class="row items-center q-mt-md justify-center" style="width: 100%; max-width: 340px;">

              <q-btn color="white" class="modal__btn" type="submit" unelevated no-caps rounded @click="modalDelete = true" v-close-popup>
                  <q-icon class="modal__icon" color="white">
                    <svg  x="0px" y="0px" viewBox="0 0 512 512" style="width: 0.925rem;" >
                        <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
                        c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
                        z"/>
                        <path d="M383.996,234.667H277.333V128c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333v106.667H128.038
                        c-11.782,0-21.333,9.551-21.333,21.333s9.551,21.333,21.333,21.333h106.628V384c0,11.782,9.551,21.333,21.333,21.333
                        s21.333-9.551,21.333-21.333V277.333h106.662c11.782,0,21.333-9.551,21.333-21.333S395.778,234.667,383.996,234.667z"/>
                    </svg>
                  </q-icon>
                  <span>Добавить</span>
              </q-btn>

            </div>
          </q-form>
        </q-card-section>
      </q-card>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'UsersAddGroupModal',

  data () {
    return {
      groupName: null,

      isEditing: false,
      modalDelete: false
    }
  },

  methods: {
    ...mapActions({
      addGroup: 'groups/addGroup'
    }),
    inputFocus (e) {
      if (e.target.labels) {
        if (e.target.labels[0]) e.target.labels[0].style.backgroundColor = 'rgb(247, 247, 255)'
        e.target.style.color = 'black'
      }
    },
    inputBlur (e) {
      if (e.target.labels) {
        e.target.labels[0].style.backgroundColor = 'white'
        e.target.style.color = '#bec0e0'
      } else if (e.target.tagName === 'DIV') {
        let input = e.target.firstChild.firstChild
        input.labels[0].style.backgroundColor = 'white'
        input.style.color = '#bec0e0'
      }
    }
  }

}
</script>

<style scoped>
    .modal__header {
      font-size: 2.25em;
      font-family: 'SFProDisplay', sans-serif;
      color: rgb(34, 39, 52);
      line-height: 1.333;
      margin-top: -0.5em;
      margin-bottom: 0.7em;
      padding: 0 1em;
    }

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

    .modal__form_section {
      padding: 0 3.125em 2.1em;
    }

    .modal__form {
      position: relative;
    }

    .modal__form::before{
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(247, 247, 247);
    }
    .modal__form::after {
      position: absolute;
      bottom: 66px;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(247, 247, 247);
    }

    .settings__label {
      font-size: 0.875rem;
      font-family: 'Open Sans', sans-serif;
      color: #000;
      font-weight: bold;
    }
    .settings__label_secondary {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.85em;
      color: #d0cee1;
    }
    .settings__input {
      margin-bottom: 2.3em;
      width: 100%;
      max-width: 340px;
      z-index: 2;
      height: 45px;
      position: relative;
      font-size: 14px;
      border-radius: 30px;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);
    }

    .settings__input_limit {
      max-width: 135px;
    }

    .setting__btn-edit {
      z-index: 3;
      position: absolute;
      top: 14px;
      right: 0;
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      color: #9093e9;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1) !important;
      visibility: hidden;
    }

    .setting__btn-edit_before {
      z-index: 3;
      position: absolute;
      top: 14px;
      left: 0;
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      color: #9093e9;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1) !important;
      visibility: hidden;
    }

    .setting__btn-edit_after {
      z-index: 3;
      position: absolute;
      top: 14px;
      right: 0;
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      color: #9093e9;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1) !important;
      visibility: hidden;
    }
    .settings__input:hover .setting__btn-edit_before,
    .settings__input:hover .setting__btn-edit_after,
    .settings__input:hover .setting__btn-edit {
      visibility: visible;
    }

    .btn-block {
      width: 46%;
    }
    .modal__btn {
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      padding: 0.325em 0.3em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;
    }
    .modal__btn-light {
        margin-left: 6%;
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

    .policy{
      padding-left: 30px;
    }

    .policyInfo{
      /* width: calc(100% - 36px); */
      font-size: 12px;
      color: rgb(177, 179, 218);
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
    left: -30px;
    height: 20px;
    width: 20px;
    background-color: #f7f7f7;
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
</style>
