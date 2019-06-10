<template>
  <div :class="b()" @click="openChannelViewModal">
    <img :class="b('thumbnail')" :src="thumbnail">
    <div :class="b('content')">
      <div :class="b('title')" v-html="item.title"></div>
      <div :class="b('date')">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'channels-item',
  props: {
    item: { required: true, type: Object }
  },
  computed: {
    date () {
      return moment(this.item.publishedAt).format('YYYY-MM-DD HH:mm')
    },
    thumbnail () {
      const thumbnails = this.item.thumbnails || { high: {}, medium: {}, default: {} }
      if (thumbnails.high) return thumbnails.high.url
      if (thumbnails.medium) return thumbnails.medium.url
      return thumbnails.default.url 
    }
  },
  methods: {
    openChannelViewModal () {
      this.$store.commit('SET_MODAL', { name: 'modal-channel-view', item: this.item })
    }
  }
}
</script>

<style lang="scss">
.channels-item {
  background: #fff;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &__thumbnail {
    background: #000;
    border-bottom: 1px solid #ccc;
    object-fit: contain;
    width: 100%;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
  }

  &__title {
    flex: 1;
    font-weight: 550;
  }

  &__date {
    font-size: 0.9em;
    text-align: right;
    margin-top: 10px;
  }
}
</style>