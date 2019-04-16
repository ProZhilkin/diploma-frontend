<template>
  <div :class="b()">
    <div :class="b('icons')">
      123
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-header'
}
</script>

<style lang="scss" scoped>
.home-header {
  align-items: center;
  background: #EFEFEF;
  border-bottom: 1px solid #d5d5d5;
  display: flex;
  height: $home-header-height;
  justify-content: flex-end;
  padding: 0 25px 0 25px;
}
</style>