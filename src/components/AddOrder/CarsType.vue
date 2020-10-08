<template>
  <div>
    <div class="cars__block flex column justify-center" @click="chooseCar(car)" :class="{cars__active: car.ride_type_name === selectedCar.ride_type_name}">
      <div class="cars__select flex items-start justify-center" v-if="car.ride_type_name === selectedCar.ride_type_name">
        <svg viewBox="0 -46 417.81333 417" fill="#fff" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
      </div>
      <div class="cars__type">
        <div class="cars__title" :class="{ cars__title__active: car.ride_type_name === selectedCar.ride_type_name }">{{carName}}</div>
        <div class="cars__price" :class="{ cars__price__active: car.ride_type_name === selectedCar.ride_type_name }">
          <q-spinner v-if="isEstimateSearching" size="1em" :thickness="7" :color="(car.ride_type_name === selectedCar.ride_type_name) ? 'white' : 'accent'"/>
          <span v-else >{{car.converted.amount}} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarsType',
  props: ['car', 'selectedCar', 'isEstimateSearching'],
  computed: {
    carName () {
      return (this.car.ride_type_name === 'comfort') ? 'Комфорт' : (this.car.ride_type_name === 'business') ? 'Бизнес' : 'Минивен'
    }
  },
  methods: {
    chooseCar (car) {
      this.$emit('selectCar', car)
    }
  }
}
</script>

<style scoped lang="scss">
  .cars {
    &__block {
      cursor: pointer;
      width: 100px;
      height: 60px;
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      border: 2px solid #eff0f7;
      position: relative;
    }
    &__type {
      padding: 0 0 0 13px;
    }
    &__price {
      position: relative;
    }
    &__active {
      background: linear-gradient( 150deg, rgb(131,106,242) 0%, rgb(106,135,242) 100%);
      color: #fff;
      font-weight: bold;
      border: 0px;
      box-shadow: 0px 3px 7px 0px rgba(104, 57, 190, 0.43);
    }
    &__select{
      position: absolute;
      right: 10px;
      top: 12px;
    }
  }
</style>
