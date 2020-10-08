<template>
  <header class="header">
      <div class="row" style="padding-left: 0.5em">

        <div class="header__select">
          <input
            type="text"
            v-model="user"
            class="header__select_input"
            :class="{ header__select_input_white: userIsSearching}"
            placeholder="Поиск сотрудника"
            @focus="userIsSearching = true"
            @keyup.enter="searchUser"
          >
          <q-icon v-show="user"  @click="clearUser" class="cursor-pointer header__date_reset">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
          </q-icon>
          <q-btn class="header__select_btn" @click="searchUser" round unelevated color="accent" size="sm" text-color="white" icon="search" />

          <q-scroll-area class="header__select_answers" :class="{ 'header__select_answers_show': userIsSearching}" :thumb-style="thumbStyle">
            <q-list>
              <q-item class="header__select_answer" @click="user = 'Имя Фамилия'; userIsSearching = false" v-for="n in 20" :key="n" clickable v-ripple>
                <q-item-section>Имя Фамилия</q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>

      <div class="header__select">
        <input
          type="text"
          v-model="post.name"
          class="header__select_input"
          :class="{ header__select_input_white: postIsSearching}"
          placeholder="Группа"
          readonly
          @focus="postIsSearching = true"
        >
        <q-icon v-show="post.id"  @click="clearPost" class="cursor-pointer header__date_reset">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
          </q-icon>
        <q-btn
          class="header__select_btn"
          :class="{ header__select_btn_rotated: postIsSearching}"
          round
          unelevated
          color="accent"
          size="sm"
          text-color="white"
          icon="keyboard_arrow_down"
          @click="postIsSearching = !postIsSearching"
        />

        <q-scroll-area
          class="header__select_answers"
          :class="{
            header__select_answers_show230: postIsSearching,
            header__select_answers_show90: postIsSearching && getGroups.length === 1,
            header__select_answers_show135: postIsSearching && getGroups.length === 2,
            header__select_answers_show180: postIsSearching && getGroups.length === 3
          }"
          :thumb-style="thumbStyle">
            <q-list v-if="getGroups.length > 0">
              <q-item class="header__select_answer" @click="post = group; postIsSearching = false" v-for="group in getGroups" :key="group.id" clickable v-ripple>
                <q-item-section>{{ group.name }}</q-item-section>
              </q-item>
            </q-list>
            <div v-else style="text-align: center; margin-top: 75px; font-size: 12px">Тут пока пусто, добавьте <span class="link_to_groups" @click="$root.$emit('openAddGroupByLink')">группы</span></div>
          </q-scroll-area>
      </div>

      </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Registration',

  data () {
    return {
      user: '',
      post: {
        name: '',
        id: null
      },
      userIsSearching: false,
      postIsSearching: false
    }
  },

  mounted () {
    window.addEventListener('click', (e) => {
      if (e.target.localName !== 'input' && e.target.innerText !== 'keyboard_arrow_down') {
        this.userIsSearching = false
        this.postIsSearching = false
      }
    })
  },

  watch: {
    'post.id' () {
      this.$root.$emit('groupHaveBeenChoosen', this.post.id)
    }
  },

  computed: {
    ...mapGetters({
      getGroups: 'groups/groups'
    }),
    thumbStyle () {
      return {
        opacity: 0
      }
    }
  },

  methods: {
    clearPost () {
      this.post = {
        name: '',
        id: null
      }
    },

    clearUser () {
      this.user = null
      this.$root.$emit('userIsSearching', this.user)
    },

    searchUser () {
      this.$root.$emit('userIsSearching', this.user)
    }
  }

}
</script>

<style scoped>
    .header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 1.58em 1.875em;
      margin-bottom: 1.65em;
      border-radius: 0 0 30px 0;
    }
    .header__filter {
      margin-right: 0.75em;
      width: 18em;
    }
    .header__select {
      margin-right: 1.2em;
      width: 18em;
      z-index: 3;
      position: relative;
      width: 203px;
    }
    .header__select_input {
      width: 203px;
      padding: 0.52em 3.5em 0.52em 1.1em;
      font-size: 12px;
      outline: none;
      border-radius: 18px;
      border: none;
      background-color: #ffffff;
      box-shadow: inset 0px 2px 4px 0px rgba(185,191,221,0.35);

      transition: all 0.1s ease 0.3s;
    }

    .header__select_input_white {
      box-shadow: inset 0px 2px 0px 0px rgba(185,191,221,0);
    }

    .header__date_reset {
      position: absolute;
      top: 0.65em;
      right: 2.5em;
      color: #9a9ba9;
    }
    .header__select_btn {
      position: absolute;
      top: 0.05em;
      right: 0;
      background-image: linear-gradient(-150deg, #836af2, #6a87f2) !important;

      transition: all 0.3s ease 0.3s;
    }
    .header__select_btn_rotated {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }

    .header__select_answers {
      position: absolute;
      top: 0.1em;
      left: 0;

      width: 100%;
      height: 0;
      background: #ffffff;
      z-index: -1;

      padding: 2em 1em 0 1em;
      border-radius: 18px;
      box-shadow: 0px 5px 18px 0 rgba(231, 234, 246, 0.79);

      transition: height 0.2s ease 0.2s;
    }
    .header__select_answers_show90 {
      height: 90px !important;
    }
    .header__select_answers_show135 {
      height: 135px !important;
    }
    .header__select_answers_show180 {
      height: 180px !important;
    }
    .header__select_answers_show230 {
      height: 230px;
    }

    .header__select_answer {
      border-radius: 7px;
    }
    .link_to_groups {
      color: #836af2;
      cursor: pointer;
    }
    .link_to_groups:hover {
      text-decoration: underline
    }
</style>
