<template>
  <div :class="b()">
    <div :class="b('search')">
      <b-form-input placeholder="Поиск..." size="sm" type="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-menu'
}
</script>

<style lang="scss" scoped>
.home-menu {
  background:#262A35;
  color: #fff;
  height: 100%;
  left: 80px;
  transition: all 0.2s;
  width: $home-menu-width;

  &__search {
    align-items: center;
    display: flex;
    height: 80px;
    padding: 0 10px 0 10px;
  }
  &__channels {
    margin: 0 10px 0 10px;
  }
  &__channel {
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    padding: 5px 10px 5px 10px;
    margin-bottom: 4px;
    transition: all 0.2s;
    width: 100%;
  }
}
</style>