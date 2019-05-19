<template>
  <div :class="b()">
    <div :class="b('feeds')">
      <div :class="b('feed')" v-for="(feed, index) in feeds" :key="index">
        <div :class="b('header')">
          <span :class="b('title')">{{ feed.title }}</span>
          <b-button variant="primary" size="sm" v-if="!isAdded(feed.id)" @click="addFavoriteFeed(feed.id)">
            <div :class="b('button-content')">
              <i :class="b('button-icon')">add</i>
              ПОДПИСАТЬСЯ
            </div>
          </b-button>
          <b-button variant="danger" size="sm" v-else @click="removeFavoriteFeed(feed.id)">
            <div :class="b('button-content')">
              <i :class="b('button-icon')">close</i>
              УДАЛИТЬ
            </div>
          </b-button>
        </div>
        <FeedsList :items="getItems(feed)" :limit="4" />
      </div>
    </div>
  </div>
</template>

<script>
import FeedsList from '../feeds/FeedsList'
import { mapState } from 'vuex'

export default {
  name: 'content-feeds',
  components: { FeedsList },
  computed: {
    ...mapState([
      'feeds'
    ]),
    favoriteFeeds () {
      return this.$store.getters.favoriteFeeds
    }
  },
  methods: {
    getItems (feed) {
      return feed.data.items ? feed.data.items : []
    },
    addFavoriteFeed (id) {
      this.$store.dispatch('addFavoriteFeed', id)
    },
    removeFavoriteFeed (id) {
      this.$store.dispatch('removeFavoriteFeed', id)
    },
    isAdded (id) {
      const feeds = this.favoriteFeeds.filter(feed => feed.feed_id === id)
      return Boolean(feeds.length)
    }
  }
}
</script>

<style lang="scss">
.content-feeds {
  flex: 1;
  margin: 20px;

  &__feed {
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