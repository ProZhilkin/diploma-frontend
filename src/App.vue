<template>
  <div :class="b()">
    <router-view />
    <Modals />
  </div>
</template>

<script>
import Modals from './components/common/Modals'

export default {
  name: 'app',
  components: { Modals }
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';
</style>