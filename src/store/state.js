import TokenService from '@/services/token'

// AIzaSyB8cyr-xYpNl31QWWheF1FyF-uwW26iS_E
// AIzaSyBHq-1McKkkbEz5ZT06AOhvxJJU1GG35qA

export default {
  vkApiKey: '60d6e37e9e30656ebfc9986a26db47c9db4fae9d2d045331f85dcffa74a2e5e6a7b0ee43818f2bb94478e',
  youtubeApiKey: 'AIzaSyBHq-1McKkkbEz5ZT06AOhvxJJU1GG35qA',
  channels: [],
  favorite: {
    channels: [],
    feeds: [],
    videos: []
  },
  feeds: [],
  jumps: 0,
  modal: {},
  selectedFavorite: {},
  selectedFavoriteType: '',
  token: TokenService.getToken(),
  videos: [],
  user: {}
}