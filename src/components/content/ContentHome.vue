<template>
  <div :class="b()">
    <template v-if="selectedFavoriteType">
      <ChannelsList v-if="isChannel" :items="filteredItems" :columns="columns" />
      <FeedsList v-else-if="isFeed" :items="filteredItems" :columns="columns" />
      <VideosList v-else :items="filteredItems" :columns="columns" />
      <b-pagination
        :class="b('pagination')"
        v-if="items.length > itemsPerPage"
        v-model="currentPage"
        :total-rows="items.length"
        :per-page="itemsPerPage" />
    </template>
    <div :class="b('empty')" v-else>Выберите канал</div>
  </div>
</template>

<script>
import ChannelsList from '../channels/ChannelsList'
import FeedsList from '../feeds/FeedsList'
import VideosList from '../videos/VideosList'
import { mapState } from 'vuex'

export default {
  name: 'content-home',
  components: { ChannelsList, FeedsList, VideosList },
  data: () => ({
    columns: 3,
    currentPage: 1,
    itemsPerPage: 9
  }),
  computed: {
    ...mapState([
      'selectedFavorite', 'selectedFavoriteType'
    ]),
    filteredItems () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = this.currentPage * this.itemsPerPage
      return this.items.slice(start, end)
    },
    items () {
      if (this.isChannel) return this.selectedFavorite.channel.items
      if (this.isFeed) return this.selectedFavorite.feed.data.items
      if (this.isVideo) return this.selectedFavorite.video.items
      return []
    },
    isChannel () {
      return this.selectedFavoriteType === 'channel'
    },
    isFeed () {
      return this.selectedFavoriteType === 'feed'
    },
    isVideo () {
      return this.selectedFavoriteType === 'video'
    }
  },
  watch: {
    currentPage () {
      this.$store.commit('INC_JUMPS')
    },
    selectedFavorite () {
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss">
.content-home {
  flex: 1;
  margin: 20px;
  width: 100%;

  &__pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0 20px 0;
  }

  &__empty {
    align-items: center;
    display: flex;
    font-size: 2em;
    height: 100%;
    justify-content: center;
  }
}
</style>