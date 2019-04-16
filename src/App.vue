<template>
  <div :class="b()">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';
</style>