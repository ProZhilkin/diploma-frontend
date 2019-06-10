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
import moment from 'moment'

export default {
  name: 'modal-video-view',
  data: () => ({
    isAudioLoading: false,
    isVideoLoading: false
  }),
  computed: {
    date () {
      return moment(this.item.date * 1000).format('YYYY-MM-DD HH:mm')
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
    }
  },
  watch: {
    visible (visible) {
      if (!visible) {
        this.isAudioLoading = false
        this.isVideoLoading = false
      }
    }
  },
  methods: {
    async download (type) {
      this.isAudioLoading = type === 'audio'
      this.isVideoLoading = type === 'video'
      let file = await this.$store.dispatch('saveVk', { owner_id: this.item.owner_id, id: this.item.id, type })
      let url = ContentApi.getFileUrl('vk', type, file.hash)
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