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
      <iframe :class="b('video')" :src="url" />
      <div :class="b('content')">
        <div :class="b('title')" v-html="item.title"></div>
        <div :class="b('description')" v-html="item.description"></div>
        <b-button @click="download">Скачать</b-button>
        <template v-if="clicked">
          <div v-if="isLoaded">
            <a :href="getFileUrl('audio')">AUDIO</a>
            <a :href="getFileUrl('video')">VIDEO</a>
          </div>
          <b-spinner v-else />
        </template>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ContentApi from '@/api/content'

export default {
  name: 'modal-channel-view',
  data: () => ({
    audio: {},
    clicked: false,
    embedUrl: 'https://www.youtube.com/embed/',
    isLoaded: false,
    video: {}
  }),
  computed: {
    hash () {
      const url = new URL(this.item.url)
      return url.searchParams.get('v')
    },
    item () {
      return this.modal.item || {}
    },
    modal () {
      return this.$store.getters.modal
    },
    visible () {
      return this.$options.name === this.modal.name
    },
    url () {
      return this.embedUrl + this.item.id
    }
  },
  watch: {
    visible (value) {
      if (value) return
      this.clicked = false
      this.isLoaded = false
      this.audio = {}
      this.video = {}
    }
  },
  methods: {
    async download () {
      this.clicked = true
      this.isLoaded = false
      this.audio = await this.$store.dispatch('saveContent', this.getParams('audio'))
      this.video = await this.$store.dispatch('saveContent', this.getParams('video'))
      this.isLoaded = true
    },
    getFileUrl (type) {
      return ContentApi.getFileUrl(this.hash, type)
    },
    getParams (type) {
      return {
        hash: this.hash,
        type: type
      }
    },
    hide () {
      this.$store.commit('RESET_MODAL')
    }
  }
}
</script>

<style lang="scss">
.modal-channel-view {
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