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
import VkApi from '@/api/vk'
import Youtube from 'simple-youtube-api'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: { HomeSidebar, HomeMenu, HomeContent },
  data: () => ({
    limit: 50,
    youtube: null,
    version: '5.95'
  }),
  computed: {
    ...mapState([
      'youtubeApiKey', 'vkApiKey', 'channels', 'feeds', 'videos'
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
    },
    videos () {
      this.videos.forEach(async (video) => {
        const params = { access_token: this.vkApiKey, owner_id: video.owner_id, v: this.version }
        const { data } = await VkApi.getVideos(params)
        const items = data.response.items.filter(item => typeof item === 'object')
        this.$store.commit('UPDATE_VIDEO', { id: video.id, items: items })
      })
    }
  },
  async created () {
    this.youtube = new Youtube(this.youtubeApiKey)
    await this.$store.dispatch('getUser')
    await this.$store.dispatch('getChannels')
    await this.$store.dispatch('getFeeds')
    await this.$store.dispatch('getVideos')
    await this.$store.dispatch('getFavoriteChannels')
    await this.$store.dispatch('getFavoriteFeeds')
    await this.$store.dispatch('getFavoriteVideos')
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