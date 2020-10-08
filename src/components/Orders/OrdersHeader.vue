<template>
  <header class="header">
      <div class="row orders__row">
          <div class="col-6 header__title">Корпоративные заказы</div>
          <div class="col-6 header__firm row items-center justify-end" v-if="getCompanyInfo">{{getCompanyInfo.name}}</div>
      </div>
     <div class="row">
       <div class="col-6">
         <q-btn color="accent" class="header__btn" unelevated no-caps rounded :to="{ name: 'addOrder' }">
           <q-icon class="header__icon" color="white">
             <svg  x="0px" y="0px" viewBox="0 0 512 512" style="width: 0.925rem;" >
                 <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
                   c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
                   z"/>
                 <path d="M383.996,234.667H277.333V128c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333v106.667H128.038
                   c-11.782,0-21.333,9.551-21.333,21.333s9.551,21.333,21.333,21.333h106.628V384c0,11.782,9.551,21.333,21.333,21.333
                   s21.333-9.551,21.333-21.333V277.333h106.662c11.782,0,21.333-9.551,21.333-21.333S395.778,234.667,383.996,234.667z"/>
             </svg>
           </q-icon>
           <span>Добавить заказ</span>
         </q-btn>
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
      date: '2019/02/01'
    }
  },
  computed: {
    ...mapGetters({
      getCompanyInfo: 'settings/companyInfo'
    })
  },
  methods: {
  }

}
</script>

<style scoped>
    .header {
      font-family: 'SFProDisplay', sans-serif;
      background-color: #f7f7f7;
      padding: 0.9em 2.15em 1.8em;
      margin-bottom: 1em;
      border-radius: 0 30px 0 0;
    }

    .orders__row {
      padding-bottom: 0.7em;
    }

    .header__title {
      font-size: 2.25rem;
      letter-spacing: 0.03em
    }

    .header__firm {
      font-size: 1.6em;
      letter-spacing: 1.5px;
      color: #716a98;
    }
    .header__btn {
      color: #ffffff;
      font-family: 'Open Sans', sans-serif;
      padding: 0.38em 0.5em 0.4em;
      margin-left: 0.15em;
      font-size: 0.875rem !important;
      outline: none;
      border: none;
      border-radius: 25px;
      box-shadow: 0px 1px 5px 0 rgba(104, 57, 190, 0.22);
      background: linear-gradient(-150deg, #836af2, #6a87f2) !important;
    }
    .header__btn:hover {
      cursor: pointer;
      color: #ffffff;
      box-shadow: 0px 1px 5px 0 rgba(104, 57, 190, 0.22);
      background: linear-gradient(-150deg, #836af2, #6a87f2);
    }
    .header__icon {
        width: 0.5625em;
        height: 0.5625em;
        margin-right: 0.5em;
    }
</style>
