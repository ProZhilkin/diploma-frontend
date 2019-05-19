<template>
  <div :class="b()" @click="openFeedViewModal">
    <img :class="b('thumbnail')" :src="thumbnailUrl">
    <div :class="b('content')">
      <div :class="b('title')">{{ item.title }}</div>
      <div :class="b('text')" v-html="content"></div>
      <div :class="b('date')">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import smartTruncate from 'smart-truncate'

export default {
  name: 'feeds-item',
  data: () => ({
    maxContentLength: 100
  }),
  props: {
    item: { required: true, type: Object }
  },
  computed: {
    content () {
      return smartTruncate(this.item.content, this.maxContentLength)
    },
    date () {
      return moment(this.item.pubDate).format('YYYY-MM-DD HH:mm')
    },
    thumbnailUrl () {
      if (this.item.enclosure) return this.item.enclosure.url
      return require('@/assets/images/no-preview.jpg')
    }
  },
  methods: {
    openFeedViewModal () {
      this.$store.commit('SET_MODAL', { name: 'modal-feed-view', item: this.item })
    }
  }
}
</script>

<style lang="scss">
.feeds-item {
  background: #fff;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &__thumbnail {
    background: #eee;
    border-bottom: 1px solid #ccc;
    object-fit: cover;
    height: 200px;
    width: 100%;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
  }

  &__title {
    font-weight: 700;
    margin-block-end: 10px;
  }

  &__text {
    flex: 1;
  }

  &__date {
    font-size: 0.9em;
    text-align: right;
    margin-top: 10px;
  }
}
</style>