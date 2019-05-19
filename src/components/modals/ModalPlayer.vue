<template>
  <b-modal
    centered
    hide-footer
    title="Музыкальные дорожки"
    :visible="visible"
    @hide="hide">
    <PerfectScrollbar :class="b()">
      <audio autoplay ref="player" :src="src"></audio>
      <div :class="b('item')" v-for="(item, index) in items" :key="index">
        <b-spinner :class="b('spinner')" v-if="isLoading(item.id)"></b-spinner>
        <div :class="b('button')" v-else-if="isPlayed(item.id)" @click="pause">pause</div>
        <div :class="b('button')" v-else @click="load(item)">play_arrow</div>
        <div :class="b('title')">
          <div v-html="item.title"></div>
          <div :class="b('progress')" v-if="isPlayed(item.id)">
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
    audio: {},
    currentTime: 0,
    duration: 0,
    player: null,
    playedId: null,
    src: '',
    states: {}
  }),
  computed: {
    channel () {
      return this.favorite.channel || {}
    },
    favorite () {
      return this.modal.favorite || {}
    },
    items () {
      const items = this.channel.items || []
      return items.filter(channel => channel.type === 'video')
    },
    modal () {
      return this.$store.getters.modal
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
    visible (value) {
      if (!value) {
        this.src = ''
      }
    }
  },
  mounted () {
    this.player = this.$refs.player
    this.player.addEventListener('ended', this.next)
    this.player.addEventListener('durationchange', () => this.duration = this.player.duration)
    this.player.addEventListener('timeupdate', () => this.currentTime = this.player.currentTime)
  },
  methods: {
    async load (item) {
      const hash = this.getHash(item.url)
      const type = 'audio'
      this.setState(item.id, 'loading')
      try {
        this.audio = await this.$store.dispatch('saveContent', { hash, type })
        this.setState(item.id, 'loaded')
        this.play(item)
      } catch {
        this.setState(item.id, false)
        alert('Ошибка при загрузке аудио')
      }
    },
    async next () {
      let index = this.items.findIndex(item => item.id === this.playedId) + 1
      let last = this.items.length - 1
      if (index > last) return this.pause()
      let item = this.items[index]
      await this.load(item)
      this.play(item)
    },
    getFileUrl (item) {
      const hash = this.getHash(item.url)
      return ContentApi.getFileUrl(hash, 'audio')
    },
    getHash (string) {
      const url = new URL(string)
      return url.searchParams.get('v')
    },
    getState (id) {
      return this.states[id] || false
    },
    hide () {
      this.$store.commit('RESET_MODAL')
    },
    isUnloaded (id) {
      return !this.getState(id)
    },
    isLoading (id) {
      return this.getState(id) === 'loading'
    },
    isLoaded (id) {
      return this.getState(id) === 'loaded'
    },
    isPlayed (id) {
      return this.playedId === id
    },
    pause () {
      this.playedId = null
      this.player.pause()
    },
    play (item) {
      this.src = ContentApi.getFileUrl(this.getHash(item.url), 'audio')
      this.playedId = item.id
      this.promise = this.player.play()
      if (this.promise !== null) this.promise.catch(() => this.player.play())
    },
    setState (id, state) {
      this.$set(this.states, id, state)
    }
  }
}
</script>

<style lang="scss">
.modal-player {
  max-height: 50vh;

  &__item {
    display: flex;
    padding: 5px;
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
    font-size: 16px;
    height: 24px;
    justify-content: center;
    margin-right: 5px;
    width: 24px;
  }

  &__title {
    flex: 1;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
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