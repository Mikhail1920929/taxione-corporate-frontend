<template>
  <q-page class="row">
      <div class="col-12 pagePaddings">
        <UsersHeader/>
        <UsersFilter/>
        <UsersTitle/>
        <div>
          <q-scroll-area class="order__scroll" :thumb-style="thumbStyle">
          <UsersItem v-for="user in getUsers" :key="user.id" :user="user"/>
          <q-scroll-observer @scroll="loadOnScrollEnd" />
          <div class="flex justify-center align-center">
            <q-spinner-dots
              v-show="paginLoading"
              color="accent"
              size="2em"
            />
          </div>
        </q-scroll-area>
        <q-inner-loading :showing="visible" style="top: 40%;">
            <q-spinner
              color="accent"
              size="2em"
            />
          </q-inner-loading>
        </div>
      </div>
  </q-page>
</template>

<script>
import UsersHeader from 'components/Users/UsersHeader'
import UsersFilter from 'components/Users/UsersFilter'
import UsersTitle from 'components/Users/UsersTitle'
import UsersItem from 'components/Users/UsersItem'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UsersPage',

  components: {
    UsersHeader,
    UsersFilter,
    UsersTitle,
    UsersItem
  },

  data () {
    return {
      paginationPage: 1,
      requestParams: {
        search: null,
        group_id: null
      },
      visible: true,
      paginLoading: false
    }
  },

  beforeDestroy () {
    this.$root.$off('groupHaveBeenChoosen')
    this.$root.$off('userIsSearching')
  },

  mounted () {
    this.loadUsers(this.requestParams).catch((error) => { console.error(error) }).finally(() => { this.visible = false })
    this.loadGroups()

    this.$root.$on('groupHaveBeenChoosen', (id) => {
      this.requestParams.group_id = id
      this.visible = true
      this.loadUsers(this.requestParams).finally(() => { this.visible = false })
    })
    this.$root.$on('userIsSearching', (search) => {
      this.requestParams.search = search
      this.visible = true
      this.loadUsers(this.requestParams).finally(() => { this.visible = false })
    })
  },

  computed: {
    ...mapGetters({
      getUsers: 'users/users',
      getMeta: 'users/meta'
    }),

    thumbStyle () {
      return {
        right: '-10px',
        borderRadius: '2px',
        backgroundColor: '#6a87f2',
        width: '4px',
        opacity: 1
      }
    }
  },

  methods: {
    ...mapActions({
      loadGroups: 'groups/loadGroups',
      loadUsers: 'users/loadUsers',
      loadUsersNextPage: 'users/loadUsersNextPage'
    }),
    loadOnScrollEnd (e) {
      if (e.position > 800 * this.paginationPage) {
        this.paginationPage++
        if (this.getMeta.last_page >= this.paginationPage) {
          this.paginLoading = true
          this.loadUsersNextPage({
            page: this.paginationPage,
            params: this.requestParams
          })
            .finally(() => { this.paginLoading = false })
        }
      }
    }
  }
}
</script>

<style scoped>
    .order__scroll {
       height: calc(100vh - 48px - 24em);
       width: 100%;
    }
    .pagePaddings {
      padding: 20px 16px 16px;
    }
</style>
