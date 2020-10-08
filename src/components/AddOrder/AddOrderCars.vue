<template>
  <div>
    <div class="carsType">
      <div class="carsType__title">Класс авто</div>
      <div class="carsType__cars flex q-gutter-md">
        <CarsType v-for="car in cars" :key="car.id" :car="car" :selectedCar="selectedCar" :isEstimateSearching="isEstimateSearching" @selectCar="selectCar($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import CarsType from 'components/AddOrder/CarsType'

export default {
  name: 'AddOrderHEader',
  props: {
    estimates: {
      type: Array
    },
    isEstimateSearching: {
      type: Boolean
    }
  },
  data () {
    return {
      cars: [
        { ride_type_name: 'comfort', name: 'Комфорт', converted: { amount: 0 } },
        { ride_type_name: 'business', name: 'Бизнес', converted: { amount: 0 } },
        { ride_type_name: 'minivan', name: 'Минивен', converted: { amount: 0 } }
      ],
      selectedCar: { ride_type_name: 'comfort', name: 'Комфорт', converted: { amount: 0 } }
    }
  },

  mounted () {
    this.$root.$on('orderPricesUpdated', (carTypeName) => {
      this.selectCar(this.cars.find((est) => est.ride_type_name === carTypeName))
    })
  },

  watch: {
    estimates: {
      handler: function (val, oldVal) {
        for (const estimate of val) {
          this.cars.find(car => car.ride_type_name === estimate.ride_class_name).converted.amount = estimate.converted.amount
        }
        this.selectCar(this.cars[0])
      },
      deep: true
    }
  },
  methods: {
    selectCar (data) {
      this.selectedCar = data
      this.$emit('selectedCar', this.selectedCar)
    }
  },
  components: { CarsType }
}
</script>

<style scoped lang="scss">
    .carsType {
      font-family: 'SFProDisplay', sans-serif;
      padding: 0.9em 2em 30px;
      &__title {
        font-size: 1.5rem;
        letter-spacing: 0.03em;
        color: #55584f;
        margin-bottom: 15px;
      }
    }
</style>
