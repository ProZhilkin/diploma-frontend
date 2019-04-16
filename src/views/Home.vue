<template>
  <div :class="b()">
    <HomeSidebar />
    <HomeMenu />
    <HomeContent />
  </div>
</template>

<script>
import HomeSidebar from '@/components/home/HomeSidebar'
import HomeMenu from '@/components/home/HomeMenu'
import HomeContent from '@/components/home/HomeContent'

export default {
  name: 'home',
  components: { HomeSidebar, HomeMenu, HomeContent }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>