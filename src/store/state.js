import TokenService from '@/services/token'

// AIzaSyB8cyr-xYpNl31QWWheF1FyF-uwW26iS_E
// AIzaSyBHq-1McKkkbEz5ZT06AOhvxJJU1GG35qA

export default {
  vkApiKey: 'aa073c4f4271d0a87066f781d68577dcf2c4347dcde8980c837443bbf0fab82e17ef252881424c0e56d1e',
  youtubeApiKey: 'AIzaSyB8cyr-xYpNl31QWWheF1FyF-uwW26iS_E',
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