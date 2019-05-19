<template>
  <div :class="b()">
    <div :class="b('videos')">
      <div :class="b('video')" v-for="(video, index) in videos" :key="index">
        <div :class="b('header')">
          <span :class="b('title')">{{ video.name }}</span>
          <b-button variant="primary" size="sm" v-if="!isAdded(video.id)" @click="addFavoriteVideo(video.id)">
            <div :class="b('button-content')">
              <i :class="b('button-icon')">add</i>
              ПОДПИСАТЬСЯ
            </div>
          </b-button>
          <b-button variant="danger" size="sm" v-else @click="removeFavoriteVideo(video.id)">
            <div :class="b('button-content')">
              <i :class="b('button-icon')">close</i>
              УДАЛИТЬ
            </div>
          </b-button>
        </div>
        <VideosList :items="getItems(video)" :limit="4" />
      </div>
    </div>
  </div>
</template>

<script>
import VideosList from '../videos/VideosList'
import { mapState } from 'vuex'

export default {
  name: 'content-videos',
  components: { VideosList },
  computed: {
    ...mapState([
      'videos'
    ]),
    favoriteVideos () {
      return this.$store.getters.favoriteVideos
    }
  },
  methods: {
    getItems (video) {
      return video.items ? video.items : []
    },
    addFavoriteVideo (id) {
      this.$store.dispatch('addFavoriteVideo', id)
    },
    removeFavoriteVideo (id) {
      this.$store.dispatch('removeFavoriteVideo', id)
    },
    isAdded (id) {
      const videos = this.favoriteVideos.filter(video => video.video_id === id)
      return Boolean(videos.length)
    }
  }
}
</script>

<style lang="scss">
.content-videos {
  flex: 1;
  margin: 20px;

  &__video {
    margin-bottom: 30px;
  }

  &__header {
    align-items: center;
    display: flex;
    margin-bottom: 15px;
  }

  &__title {
    font-size: 1.5em;
    font-weight: 550;
    margin-right: 10px;
  }

  &__button-content {
    align-items: center;
    display: flex;
    font-size: 15px;
  }

  &__button-icon {
    @extend .material-icons;
    font-size: 20px;
    margin-right: 5px;
  }

  &__loading {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }
}
</style>