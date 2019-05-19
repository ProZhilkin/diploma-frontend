<template>
  <div :class="b()">
    <div :class="b('buttons')">
      <div :class="b('button')" @click="openAddItemModal">add</div>
      <div :class="b('button')" @click="logout">exit_to_app</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-header',
  methods: {
    logout () {
      this.$store.commit('SET_TOKEN', null)
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    },
    openAddItemModal () {
      this.$store.commit('SET_MODAL', { name: 'modal-add-item' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-header {
  align-items: center;
  background: #f9f9f9;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  height: $home-header-height;
  justify-content: flex-end;
  padding: 0 25px 0 25px;

  &__button {
    @extend .material-icons;
    border-radius: 5px;
    cursor: pointer;
    padding: 7px;
    transition: all $transition-duration;

    &:hover {
      background: #eee;
      box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>