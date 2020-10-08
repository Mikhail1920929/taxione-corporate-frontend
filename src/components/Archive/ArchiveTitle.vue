<template>
  <div class="title row justify-between items-center">
      <div class="title__period col-sm-1 col-md-2">
          <strong>Период</strong>
      </div>
      <div class="title__sum col-2">
          <strong>Сумма к оплате</strong>
      </div>
      <div class="title__status col-2">
          <strong>Статус</strong>
      </div>
      <div class="title__act col-sm-4 col-md-3">
          <strong class="with-extention">Акт выполненных работ</strong>
      </div>
      <div class="item__bill col-2">
          <strong class="with-extention">Счет</strong>
      </div>
      <div class="item__orders col-1">
          <strong>Заказы</strong>
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
      border-radius: 0 0 10px 10px;
      box-shadow: 0px 3px 5px 0 rgba(231, 234, 246, 0.26);
      border: solid 1px #f5f4fb;
      background-color: #ffffff;
    }

    .title__item {
      text-align: center;
    }

    .title strong {
      position: relative;
    }

    .with-extention:after {
      position: absolute;
      content: 'PDF';
      display: block;
      top: 1em;
      right: -3.2em;
      font-size: 0.40625em;
      font-weight: bold;
      border-radius: 5.5px;
      color: #ffffff;
      background-color: #737cf2;
      padding: 0.1675em 0.4em;
    }
</style>
