<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container class="loginPage">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .loginPage {
    overflow-y: auto;
  }
</style>
