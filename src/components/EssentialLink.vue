<template>
  <q-item class="menu__item" :to="{name: link}" active-class="menu-item_active">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="menu__title">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .menu__item {
    margin: 1.3em 1.3em 1.3em 0;
    border-radius: 0 5px 5px 0;
  }

  .menu__item:hover {
    background: #292b35 !important;
    background-color: #292b35 !important;
    opacity: 1 !important;
  }

  .menu-item_active {
    position: relative;
    background: #292b35 !important;
    background-color: #292b35 !important;
    opacity: 1 !important;
  }

  .menu-item_active:before {
    position: absolute;
    top: -0.05em;
    left: 0;
    content: '';
    display: block;
    width: 4px;
    height: 3.55em;
    border-radius: 0 3px 3px 0;
    box-shadow: 0px 3px 7px 0 rgba(104, 57, 190, 0.43);
    background-image: linear-gradient(to top, #836af2, #6a87f2);
  }

  .menu__title {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 4.71;
    letter-spacing: 0.42px;
    color: #ffffff;
  }
</style>
