<template>
  <div class="title row justify-between items-center">
      <div class="title__period col-2">
          <strong>Дата</strong>
      </div>
      <div class="title__sum col-6">
          <strong>Маршрут</strong>
      </div>
      <div class="title__status col-2">
          <strong>Статус</strong>
      </div>
      <div class="title__act col-2">
          <strong>Сумма</strong>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UserTitle'
}
</script>

<style scoped>
    .title {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      color: #222734;
      padding: 1.25em 2.9375em 1.25em 2em;
      margin-bottom: 0.715em;
      width: 100%;
      border-radius: 0 10px 10px 0;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26);
      border: solid 1px #f5f4fb;
      background-color: #ffffff;
    }

    .title strong {
      position: relative;
    }

</style>
