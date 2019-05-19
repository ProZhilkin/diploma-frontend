export default {
  favoriteChannels: (state) => state.favorite.channels,
  favoriteFeeds: (state) => state.favorite.feeds,
  favoriteVideos: (state) => state.favorite.videos,
  isAuthenticated: (state) => !!state.token,
  modal: (state) => state.modal
}