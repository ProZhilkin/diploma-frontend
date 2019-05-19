export default {
  favoriteChannels: (state) => state.favorite.channels,
  favoriteFeeds: (state) => state.favorite.feeds,
  isAuthenticated: (state) => !!state.token,
  modal: (state) => state.modal
}