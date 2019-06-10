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
        <b-button-group :class="b('buttons')">
          <b-button :disabled="isDisabled" @click="download('video')" variant="primary">
            <div :class="b('line')">
              <b-spinner :class="b('spinner')" v-if="isVideoLoading"></b-spinner>
              <span :class="b('icon')" v-else>videocam</span> Скачать видео
            </div>
          </b-button>
          <b-button :disabled="isDisabled" @click="download('audio')" variant="primary">
            <div :class="b('line')">
              <b-spinner :class="b('spinner')" v-if="isAudioLoading"></b-spinner>
              <span :class="b('icon')" v-else>music_note</span> Скачать аудио
            </div>
          </b-button>
        </b-button-group>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ContentApi from '@/api/content'

export default {
  name: 'modal-channel-view',
  data: () => ({
    isAudioLoading: false,
    isVideoLoading: false,
    embedUrl: 'https://www.youtube.com/embed/'
  }),
  computed: {
    hash () {
      const url = new URL(this.item.url)
      return url.searchParams.get('v')
    },
    isDisabled () {
      return this.isAudioLoading || this.isVideoLoading
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
  methods: {
    async download (type) {
      this.isAudioLoading = type === 'audio'
      this.isVideoLoading = type === 'video'
      let file = await this.$store.dispatch('saveYoutube', { bitrate: 128, hash: this.item.id, type })
      let url = ContentApi.getFileUrl('youtube', type, file.hash)
      location.href = url
      this.isAudioLoading = false
      this.isVideoLoading = false
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

  &__description {
    margin-bottom: 10px;
  }

  &__line {
    align-items: center;
    display: flex;
  }

  &__spinner {
    height: 18px !important;
    margin-right: 5px;
    width: 18px !important;
  }

  &__icon {
    @extend .material-icons;
    font-size: 18px;
    margin-right: 5px;
  }
}
</style>