<template>
  <div :class="b()" :style="style">
    <ChannelsItem :class="b('item')" v-for="(item, index) in filteredItems" :key="index" :item="item" />
  </div>
</template>

<script>
import ChannelsItem from './ChannelsItem'

export default {
  name: 'channels-list',
  components: { ChannelsItem },
  props: {
    columns: { default: 4, type: Number },
    items: { required: true, type: Array },
    limit: { default: 0, type: Number }
  },
  computed: {
    filteredItems () {
      if (!this.limit) return this.items
      return this.items.slice(0, this.limit)
    },
    style () {
      return {
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`
      }
    }
  }
}
</script>

<style lang="scss">
.channels-list {
  display: grid;
  grid-column-gap: $columns-gap;
  grid-row-gap: $columns-gap;
}
</style>