<template>
  <div>
    <div class="error404 container">
      <div class="error404__info">
        <div class="error404__info__title">Без паники!</div>
        <div class="error404__info__subtitle">Тут ничего нет. Похоже, страница была телепортирована! Проверьте адрес или вернитесь в начало пути</div>
        <div class="error404__info__button">
          <button @click="$router.push({ name: 'registration' })">Вернуться на Главную</button>
        </div>
      </div>
      <div class="error404__image">
        <img src="../statics/404.png" alt="404">
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>

<style scoped lang="scss">
  .error404 {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    color: #1A2030;
    padding: 0 160px;
    &__info {
      width: 36%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: flex-start;
      &__title {
        font-style: normal;
        font-weight: bold;
        font-size: 64px;
        line-height: 120%;
      }
      &__subtitle {
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 140%;
        margin: 20px 0 70px;
      }
      &__button {
        > button {
          background: linear-gradient(109.07deg, #8070F6 8.96%, #6989F5 90.72%);
          box-shadow: 12px 11px 34px #CCD0FF;
          border-radius: 56px;
          outline: none;
          border: none;
          cursor: pointer;
          font-style: normal;
          font-weight: 600;
          font-size: 22px;
          line-height: 110%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          padding: 22px 37px;
        }
      }
    }
    &__image {
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 100%;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .error404 {
      padding: 0 24px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap-reverse;
      &__info {
        width: 100%;
        margin: 50px 0 0;
        &__title {
          font-size: 30px;
        }
        &__subtitle {
          font-size: 14px;
          margin: 10px 0 40px;
        }
        &__button {
          width: 100%;
          > button {
            width: 100%;
            font-size: 18px;
            padding: 18px 0;
          }
        }
      }
      &__image {
        width: 100%;
      }
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .error404 {
      padding: 0 25px;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      flex-wrap: wrap;
      color: #1A2030;
      height: calc(100vh - 85px);
      &__info {
        width: 50%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
        &__title {
          font-style: normal;
          font-weight: bold;
          font-size: 42px;
          line-height: 120%;
        }
        &__subtitle {
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 140%;
          margin: 20px 0 40px;
        }
        &__button {
          width: 100%;
          > button {
            width: 100%;
            font-size: 18px;
            padding: 18px 0;
          }
        }
      }
      &__image {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          width: 100%;
        }
      }
    }
  }
  @media (min-width: 1025px) and (max-width: 1488px) {
    .error404 {
      height: calc(100vh - 85px);
      padding: 0 80px;
      &__info {
        width: 40%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
        &__title {
          font-size: 42px;
        }
        &__subtitle {
          font-size: 18px;
          margin: 20px 0 40px;
        }
        &__button {
          width: 100%;
          > button {
            width: 100%;
            font-size: 18px;
            padding: 18px 0;
          }
        }
      }
      &__image {
        width: 50%;
        > img {
          width: 100%;
        }
      }
    }
  }
</style>
