<template>
  <div :class="b()">
    <HomeSidebar />
    <HomeMenu />
    <HomeContent />
  </div>
</template>

<script>
import HomeSidebar from '@/components/home/HomeSidebar'
import HomeMenu from '@/components/home/HomeMenu'
import HomeContent from '@/components/home/HomeContent'
import Youtube from 'simple-youtube-api'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: { HomeSidebar, HomeMenu, HomeContent },
  data: () => ({
    limit: 50,
    youtube: null
  }),
  computed: {
    ...mapState([
      'apiKey', 'channels', 'feeds'
    ])
  },
  watch: {
    channels () {
      this.channels.forEach(async (channel) => {
        const id = channel.channel_id
        const info = await this.youtube.getChannelByID(id)
        const items = await this.youtube.search('', this.limit, { channelId: id, order: 'date' })
        this.$store.commit('UPDATE_CHANNEL', { id: channel.id, info, items })
      })
    },
    feeds () {
      this.feeds.forEach(async (feed) => {
        await this.$store.dispatch('getFeedByUrl', { id: feed.id, url: feed.url })
      })
    }
  },
  async created () {
    this.youtube = new Youtube(this.apiKey)
    await this.$store.dispatch('getChannels')
    await this.$store.dispatch('getFeeds')
    await this.$store.dispatch('getFavoriteChannels')
    await this.$store.dispatch('getFavoriteFeeds')
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>