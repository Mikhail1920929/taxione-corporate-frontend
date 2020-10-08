<template>
  <div class="title row justify-between items-center">
      <div class="title__id col-1">
          <strong>Id</strong>
      </div>
      <div class="title__user col-3">
          <strong>Пользователь</strong>
      </div>
      <div class="title__ride col-3">
          <strong>Маршрут</strong>
      </div>
      <div class="title__date col-2">
          <strong>Дата</strong>
      </div>
      <div class="item__remaining col-2">
          <strong>Статус</strong>
      </div>
      <div class="item__sum col-1">
        <strong>Сумма</strong>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ArchiveTitle'
}
</script>

<style scoped>
    .title {
      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      color: #222734;
      padding: 1.25em 2.9375em 1.25em 2em;
      margin-bottom: 0.6875em;
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
