<template>
  <div :class="b()">
    <div :class="b('channels')">
      <div :class="b('channel')" v-for="(channel, index) in channels" :key="index">
        <div :class="b('header')">
          <div :class="b('title')">{{ channel.info.title }}</div>
          <b-button variant="primary" size="sm" v-if="!isAdded(channel.id)" @click="addFavoriteChannel(channel.id)">
            <div :class="b('button-content')">
              <i :class="b('button-icon')">add</i>
              ПОДПИСАТЬСЯ
            </div>
          </b-button>
          <b-button variant="danger" size="sm" v-else @click="removeFavoriteChannel(channel.id)">
            <div :class="b('button-content')">
              <i :class="b('button-icon')">close</i>
              УДАЛИТЬ
            </div>
          </b-button>
        </div>
        <ChannelsList :items="channel.items" :columns="5" :limit="5" />
      </div>
    </div>
  </div>
</template>

<script>
import ChannelsList from '../channels/ChannelsList'
import { mapState } from 'vuex'

export default {
  name: 'content-channels',
  components: { ChannelsList },
  computed: {
    ...mapState([
      'channels'
    ]),
    favoriteChannels () {
      return this.$store.getters.favoriteChannels
    }
  },
  methods: {
    addFavoriteChannel (id) {
      this.$store.dispatch('addFavoriteChannel', id)
    },
    removeFavoriteChannel (id) {
      this.$store.dispatch('removeFavoriteChannel', id)
    },
    isAdded (id) {
      const channels = this.favoriteChannels.filter(channel => channel.channel_id === id)
      return Boolean(channels.length)
    }
  }
}
</script>

<style lang="scss">
.content-channels {
  flex: 1;
  margin: 20px;

  &__channel {
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