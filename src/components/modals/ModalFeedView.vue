<template>
  <b-modal
    centered
    body-class="custom-modal-body"
    content-class="custom-modal-content"
    hide-header
    hide-footer
    size="lg"
    :visible="visible"
    @hide="hide">
    <div :class="b()">
      <a :href="item.link">
        <img :class="b('image')" :src="thumbnailUrl">
      </a>
      <div :class="b('title')">{{ item.title }}</div>
      <div :class="b('date')">Опубликовано: {{ date }}</div>
      <div :class="b('text')" v-html="item.content"></div>
    </div>
  </b-modal>
</template>

<script>
import moment from 'moment'

export default {
  name: 'modal-feed-view',
  computed: {
    date () {
      return moment(this.item.pubDate).format('YYYY-MM-DD HH:mm')
    },
    item () {
      return this.modal.item || {}
    },
    modal () {
      return this.$store.getters.modal
    },
    thumbnailUrl () {
      if (this.item.enclosure) return this.item.enclosure.url
      return require('@/assets/images/no-preview.jpg')
    },
    visible () {
      return this.$options.name === this.modal.name
    }
  },
  methods: {
    hide () {
      this.$store.commit('RESET_MODAL')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-feed-view {
  padding: 20px;

  &__image {
    width: 100%;
  }

  &__title {
    font-size: 1.5em;
    font-weight: 550;
    margin: 10px 0 5px 0;
  }

  &__date {
    font-style: italic;
    margin-bottom: 10px;
  }
}
</style>