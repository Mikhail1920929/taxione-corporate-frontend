<template>
  <q-page class="row">
      <div class="col-12 pagePaddings">
        <ArchiveHeader/>
        <ArchiveTitle/>
        <q-scroll-area class="archive__scroll" :thumb-style="thumbStyle">
          <ArchiveItem v-for="period in getPeriods" :key="period.id" :period="period"/>
          <q-scroll-observer @scroll="loadOnScrollEnd" />
          <div class="flex justify-center align-center">
            <q-spinner-dots
              v-show="paginLoading"
              color="accent"
              size="2em"
            />
          </div>
        </q-scroll-area>
      </div>
  </q-page>
</template>

<script>
import ArchiveTitle from 'components/Archive/ArchiveTitle'
import ArchiveItem from 'components/Archive/ArchiveItem'
import ArchiveHeader from 'components/Archive/ArchiveHeader'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',

  components: {
    ArchiveHeader,
    ArchiveItem,
    ArchiveTitle
  },

  beforeDestroy () {
    this.$root.$off('datesChangedArchive')
    this.$root.$off('actUploaded')
  },

  mounted () {
    this.loadCompanyPeriods({ start: this.dateFrom, end: this.dateTo })

    this.$root.$on('datesChangedArchive', (date) => {
      this.dateTo = date.to
      this.dateFrom = date.from
      this.paginationPage = 1
      this.loadCompanyPeriods({ start: this.dateFrom, end: this.dateTo }).then(() => { this.visible = false })
    })

    this.$root.$on('actUploaded', () => {
      this.loadCompanyPeriods({ start: this.dateFrom, end: this.dateTo })
    })
  },

  data () {
    return {
      paginationPage: 1,
      dateTo: '',
      dateFrom: '',
      paginLoading: false
    }
  },

  computed: {
    thumbStyle () {
      return {
        right: '-10px',
        borderRadius: '2px',
        backgroundColor: '#6a87f2',
        width: '4px',
        opacity: 1
      }
    },
    ...mapGetters({
      getPeriods: 'archive/periods',
      getMeta: 'archive/meta'
    })
  },

  methods: {
    ...mapActions({
      loadCompanyPeriods: 'archive/loadCompanyPeriods',
      loadRidesNextPage: 'archive/loadPeriodsNextPage'
    }),
    loadOnScrollEnd (e) {
      if (e.position > 1700 * this.paginationPage) {
        this.paginationPage++
        if (this.getMeta.last_page <= this.paginationPage) {
          this.paginLoading = true
          this.loadPeriodsNextPage({ page: this.paginationPage, dates: { start: this.dateFrom, end: this.dateTo } })
            .finally(() => { this.paginLoading = false })
        }
      }
    }
  }
}
</script>

<style scoped>
    .archive__scroll {
       height: calc(100vh - 48px - 17em);
       width: 100%;
    }
    .pagePaddings {
      padding: 20px 16px 16px;
    }
</style>
