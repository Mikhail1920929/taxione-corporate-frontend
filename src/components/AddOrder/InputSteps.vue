<template>
  <div class="steps flex column justify-between items-center">
    <div class="steps__item">A</div>
    <div class="steps__item">B</div>
  </div>
</template>

<script>
export default {
  name: 'InputSteps'
}
</script>

<style scoped lang="scss">
  .steps {
    width: 24px;
    position: relative;
    height: 95px;
    padding: 8px 0;
  }

  .steps:after {
    position: absolute;
    content: '';
    top: 40%;
    left: 48%;
    width: 2px;
    height: 20%;
    opacity: 0.5;
    background: #9B9B9B;
    border-radius: 1px;
  }

  .steps__item {
    border-radius: 50%;
    background: #688af5;
    z-index: 2;
    width: 22px;
    height: 22px;
    color: #fff;
    box-shadow: 0px 1px 5px 0px rgba(104, 57, 190, 0.22);
    display: flex;
    justify-content: center;
    align-items: center;
    &:last-child {
      background-color: #816FF6;
    }
  }
</style>
