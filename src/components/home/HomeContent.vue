<template>
  <div :class="b()">
    <HomeHeader />
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'

export default {
  name: 'home-content',
  components: { HomeHeader }
}
</script>

<style lang="scss" scoped>
.home-content {
  flex: 1;
}
</style>