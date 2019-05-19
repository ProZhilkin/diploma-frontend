import TokenService from '@/services/token'

// AIzaSyB8cyr-xYpNl31QWWheF1FyF-uwW26iS_E
// AIzaSyBHq-1McKkkbEz5ZT06AOhvxJJU1GG35qA

export default {
  apiKey: 'AIzaSyBHq-1McKkkbEz5ZT06AOhvxJJU1GG35qA',
  channels: [],
  favorite: { channels: [], feeds: [] },
  feeds: [],
  jumps: 0,
  modal: {},
  selectedFavorite: {},
  selectedFavoriteType: '',
  token: TokenService.getToken(),
  user: {}
}