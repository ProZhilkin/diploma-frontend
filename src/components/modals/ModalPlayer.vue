<template>
  <b-modal
    centered
    hide-footer
    title="Музыкальные дорожки"
    :visible="visible"
    @hide="hide">
    <PerfectScrollbar :class="b('wrapper')">
      <audio :src="src" autoplay ref="player"></audio>
      <div :class="b('item')" :key="index" v-for="(item, index) in items">
        <b-spinner :class="b('spinner')" v-if="states[index] === 'loading'"></b-spinner>
        <div :class="b('button')" @click="handle(item, index)" v-else>{{ icon(index) }}</div>
        <div :class="b('title')">
          {{ item.title }}
          <div :class="b('progress')" v-if="states[index] === 'play'">
            <div :class="b('slider')" :style="sliderStyle"></div>
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  </b-modal>
</template>

<script>
import ContentApi from '@/api/content'

export default {
  name: 'modal-player',
  data: () => ({
    currentTime: 0,
    duration: 0,
    src: '',
    states: []
  }),
  computed: {
    items () {
      return this.modal.items
    },
    modal () {
      return this.$store.getters.modal || {}
    },
    platform () {
      return this.modal.platform
    },
    sliderStyle () {
      const percent = this.currentTime * 100 / this.duration
      return { width: `${percent}%` }
    },
    visible () {
      return this.$options.name === this.modal.name
    }
  },
  watch: {
    items (items) {
      this.states = items.map(item => 'none')
    },
    visible (value) {
      if (!value) this.src = ''
    }
  },
  mounted () {
    this.player = this.$refs.player
    this.player.addEventListener('ended', this.next)
    this.player.addEventListener('durationchange', () => this.duration = this.player.duration)
    this.player.addEventListener('timeupdate', () => this.currentTime = this.player.currentTime)
  },
  methods: {
    hide () {
      this.$store.commit('RESET_MODAL')
    },
    icon (index) {
      return this.states[index] === 'play' ? 'pause' : 'play_arrow'
    },
    handle (item, index) {
      if (this.states[index] === 'play') return this.pause(index)
      let method = this.platform === 'youtube' ? 'saveYoutube' : (item.platform ? 'saveYoutube' : 'saveVk')
      this.setState(index, 'loading')
      this[method](item, index)
    },
    setState (index, state) {
      this.$set(this.states, index, state)
    },
    async saveVk (item, index) {
      let file = await this.$store.dispatch('saveVk', { id: item.id, owner_id: item.owner_id, type: 'audio' })
      this.setState(index, 'loaded')
      this.src = ContentApi.getFileUrl('vk', 'audio', file.hash)
      this.play(index)
    },
    async saveYoutube (item, index) {
      let hash = item.platform ? item.player.match(/embed\/(.+?)\?/)[1] : item.id
      let file = await this.$store.dispatch('saveYoutube', { hash, type: 'audio' })
      this.setState(index, 'loaded')
      this.src = ContentApi.getFileUrl('youtube', 'audio', file.hash)
      this.play(index)
    },
    next () {
      let index = this.states.findIndex(state => state === 'play')
      let lastIndex = this.items.length - 1
      let next = index > lastIndex ? 0 : index + 1
      this.handle(this.items[next], next)
    },
    pause (index) {
      this.setState(index, 'pause')
      this.player.pause()
    },
    play (index) {
      this.states = this.states.map(state => state === 'play' ? 'pause' : state)
      this.setState(index, 'play')
      this.player.play().catch()
    }
  }
}
</script>

<style lang="scss">
.modal-player {
  &__wrapper {
    max-height: 50vh;
  }

  &__item {
    display: flex;
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__spinner {
    height: 24px !important;
    margin-right: 5px;
    width: 24px !important;
  }

  &__button {
    @extend .material-icons;
    align-items: center;
    background: #333;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    font-size: 18px;
    height: 24px;
    justify-content: center;
    margin-right: 7px;
    width: 24px;
  }

  &__title {
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  &__progress {
    background: #ccc;
    bottom: 0;
    height: 3px;
    position: absolute;
    width: 100%;
  }

  &__slider {
    background: #333;
    height: inherit;
    width: 0;
  }
}
</style>