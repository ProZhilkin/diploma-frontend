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
      <iframe :class="b('video')" :src="item.player" />
      <div :class="b('content')">
        <div :class="b('title')" v-html="item.title"></div>
        <div :class="b('description')" v-html="item.description"></div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import moment from 'moment'

export default {
  name: 'modal-video-view',
  computed: {
    date () {
      return moment(this.item.date * 1000).format('YYYY-MM-DD HH:mm')
    },
    item () {
      return this.modal.item || {}
    },
    modal () {
      return this.$store.getters.modal
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
.modal-video-view {
  &__video {
    border: 0;
    height: 400px;
    width: 100%;
  }

  &__content {
    padding: 5px 20px 20px 20px;
  }

  &__title {
    font-size: 1.3em;
    font-weight: 550;
    margin-bottom: 10px;
  }
}
</style>