<template>
  <div :class="b()">
    <HomeHeader />
    <PerfectScrollbar :class="b('content')" ref="content">
      <router-view />
    </PerfectScrollbar>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import { mapState } from 'vuex'

export default {
  name: 'home-content',
  components: { HomeHeader },
  computed: mapState(['jumps']),
  watch: {
    jumps () {
      this.$nextTick(() => {
        const element = this.$refs.content.$el
        element.scrollTop = 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-content {
  background: #eee;
  display: flex;
  flex: 1;
  flex-direction: column;

  &__content {
    display: flex;
    flex: 1;
  }
}
</style>