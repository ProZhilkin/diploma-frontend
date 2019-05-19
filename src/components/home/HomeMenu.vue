<template>
  <div :class="b()" v-if="isHome">
    <!-- <div :class="b('search')">
      <b-form-input placeholder="Поиск..." type="text" />
    </div> -->
    <div :class="b('favorites')">
      <div
        :class="b('favorite', modificator(favoriteChannel, 'channel'))"
        v-for="favoriteChannel in favoriteChannels"
        :key="favoriteChannel.id"
        @click="selectFavorite(favoriteChannel, 'channel')">
        <div :class="b('icon')">ondemand_video</div>
        <div :class="b('title')">{{ favoriteChannel.channel.info.title }}</div>
        <div :class="b('player')" @click="openPlayerModal(favoriteChannel)">library_music</div>
        <div :class="b('remove')" @click.stop="removeChannel(favoriteChannel.channel_id)">close</div>
      </div>
      <div
        :class="b('favorite', modificator(favoriteFeed, 'feed'))"
        v-for="favoriteFeed in favoriteFeeds"
        :key="favoriteFeed.id"
        @click="selectFavorite(favoriteFeed, 'feed')">
        <div :class="b('icon')">rss_feed</div>
        <div :class="b('title')">{{ favoriteFeed.feed.title }}</div>
        <div :class="b('remove')" @click.stop="removeFeed(favoriteFeed.feed_id)">close</div>
      </div>
      <div
        :class="b('favorite', modificator(favoriteVideo, 'video'))"
        v-for="favoriteVideo in favoriteVideos"
        :key="favoriteVideo.id"
        @click="selectFavorite(favoriteVideo, 'video')">
        <div :class="b('icon')">videocam</div>
        <div :class="b('title')">{{ favoriteVideo.video.name }}</div>
        <div :class="b('remove')" @click.stop="removeVideo(favoriteVideo.video_id)">close</div>
      </div>
      <div :class="b('empty')" v-if="!totalLength">Подписок нет</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home-menu',
  computed: {
    ...mapState([
      'channels', 'feeds', 'selectedFavorite', 'selectedFavoriteType', 'videos'
    ]),
    favoriteChannels () {
      return this.$store.getters.favoriteChannels.map(favoriteChannel => {
        const channel = this.channels.find(channel => channel.id == favoriteChannel.channel_id)
        return { ...favoriteChannel, channel }
      })
    },
    favoriteFeeds () {
      return this.$store.getters.favoriteFeeds.map(favoriteFeed => {
        const feed = this.feeds.find(feed => feed.id == favoriteFeed.feed_id)
        return { ...favoriteFeed, feed }
      })
    },
    favoriteVideos () {
      return this.$store.getters.favoriteVideos.map(favoriteVideo => {
        const video = this.videos.find(video => video.id == favoriteVideo.video_id)
        return { ...favoriteVideo, video }
      })
    },
    isHome () {
      return this.$route.name === 'content:home'
    },
    totalLength () {
      return this.favoriteChannels.length + this.favoriteFeeds.length + this.favoriteVideos.length
    }
  },
  methods: {
    isSelected (favorite, type) {
      return this.selectedFavorite.id === favorite.id && this.selectedFavoriteType === type
    },
    modificator (favorite, type) {
      return { selected: this.isSelected(favorite, type) }
    },
    removeChannel (id) {
      this.$store.dispatch('removeFavoriteChannel', id)
    },
    removeFeed (id) {
      this.$store.dispatch('removeFavoriteFeed', id)
    },
    removeVideo (id) {
      this.$store.dispatch('removeFavoriteVideo', id)
    },
    openPlayerModal (favorite) {
      this.$store.commit('SET_MODAL', { name: 'modal-player', favorite })
    },
    selectFavorite (favorite, type) {
      if (this.isDeleting) return
      this.$store.commit('INC_JUMPS')
      this.$store.commit('SELECT_FAVORITE', { favorite, type })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-menu {
  background:#262A35;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 80px;
  width: $home-menu-width;

  &__search {
    align-items: center;
    border-bottom: 1px solid #20222F;
    display: flex;
    height: $home-sidebar-width;
    padding: 0 10px 0 10px;
  }

  &__favorites {
    flex: 1;
    padding: 10px;
  }

  &__favorite {
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    padding: 7px 10px 7px 10px;
    margin-bottom: 4px;
    transition: all 0.2s;
    width: 100%;

    &_selected {
      background: #101114 !important;
    }

    &:hover {
      background: #181a20;
    }
  }

  &__icon {
    @extend .material-icons;
    margin-right: 10px;
  }

  &__title {
    flex: 1;
  }

  &__player,
  &__remove {
    @extend .material-icons;
    font-size: 18px;
    padding: 3px;
  }

  &__empty {
    align-items: center;
    display: flex;
    height: 100%;
    font-size: 1.2em;
    justify-content: center;
  }
}
</style>