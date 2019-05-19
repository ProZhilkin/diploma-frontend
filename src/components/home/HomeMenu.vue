<template>
  <div :class="b()" v-if="isHome">
    <div :class="b('search')">
      <b-form-input placeholder="Поиск..." type="text" />
    </div>
    <div :class="b('favorites')">
      <div
        :class="b('favorite', modificator(favoriteChannel))"
        v-for="favoriteChannel in favoriteChannels"
        :key="favoriteChannel.id"
        @click="selectFavorite(favoriteChannel, 'channel')">
        <div :class="b('icon')">ondemand_video</div>
        <div :class="b('title')">{{ favoriteChannel.channel.info.title }}</div>
        <div :class="b('player')" @click="openPlayerModal(favoriteChannel)">library_music</div>
        <div :class="b('remove')" @click.stop="removeChannel(favoriteChannel.channel_id)">close</div>
      </div>
      <div
        :class="b('favorite', modificator(favoriteFeed))"
        v-for="favoriteFeed in favoriteFeeds"
        :key="favoriteFeed.id"
        @click="selectFavorite(favoriteFeed, 'feed')">
        <div :class="b('icon')">rss_feed</div>
        <div :class="b('title')">{{ favoriteFeed.feed.title }}</div>
        <div :class="b('remove')" @click.stop="removeFeed(favoriteFeed.feed_id)">close</div>
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
      'channels', 'feeds', 'selectedFavorite'
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
    isHome () {
      return this.$route.name === 'content:home'
    },
    totalLength () {
      return this.favoriteChannels.length + this.favoriteFeeds.length
    }
  },
  methods: {
    isSelected (favorite) {
      return this.selectedFavorite.id === favorite.id
    },
    modificator (favorite) {
      return { selected: this.isSelected(favorite) }
    },
    removeChannel (id) {
      this.$store.dispatch('removeFavoriteChannel', id)
    },
    removeFeed (id) {
      this.$store.dispatch('removeFavoriteFeed', id)
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
    margin: 0 10px 0 10px;
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