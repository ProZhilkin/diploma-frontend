<template>
  <div :class="b()">
    <div
      :class="b('item', { selected: isSelected(item.id) })"
      v-for="item in items"
      :key="item.id"
      @click="select(item.id)">
      <div :class="b('icon')">{{ item.icon }}</div>
      <div :class="b('title')">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-sidebar',
  data: () => ({
    items: [{
      id: 1,
      icon: 'home',
      title: 'Дом'
    }, {
      id: 2,
      icon: 'ondemand_video',
      title: 'Youtube'
    }, {
      id: 3,
      icon: 'rss_feed',
      title: 'RSS'
    }],
    selected: 1
  }),
  methods: {
    isSelected (id) {
      return this.selected === id
    },
    select (id) {
      this.selected = id
    }
  }
}
</script>

<style lang="scss" scoped>
.home-sidebar {
  background: #30323F;
  border-right: 1px solid #20222F;
  color: #fff;
  height: 100%;
  width: $home-sidebar-width;

  &__item {
    align-items: center;
    border-bottom: 1px solid #20222F;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: $home-sidebar-width;
    justify-content: center;
    width: 100%;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    &_selected {
      background: rgba(255, 0, 0, 0.4) !important;
      box-shadow: inset 0 0 10px 3px rgba(0, 0, 0, 0.2);
      color: #fff;
    }
  }

  &__icon {
    @extend .material-icons;
  }

  &__title {
    font-size: 0.9em;
  }
}
</style>