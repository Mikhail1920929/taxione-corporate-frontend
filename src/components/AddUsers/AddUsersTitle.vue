<template>
  <div class="title row justify-between items-center">
      <div class="title__user col-3">
          <strong>ФИО</strong>
      </div>
      <div class="title__number col-2">
          <strong>Телефон</strong>
      </div>
      <div class="title__sum col-2">
          <strong>Email</strong>
      </div>
      <div class="title__amount col-2">
          <strong>Группа</strong>
      </div>
      <div class="item__remaining col-2">
          <strong>Лимит</strong>
      </div>
      <div class="col-1"></div>
  </div>
</template>

<script>
export default {
  name: 'AddUsersTitle'
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
      padding-left: 1.5em;
      position: relative;
      font-weight: bold;
    }
</style>
