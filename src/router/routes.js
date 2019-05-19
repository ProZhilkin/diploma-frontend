import Hooks from './hooks'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import ContentHome from '@/components/content/ContentHome'
import ContentChannels from '@/components/content/ContentChannels'
import ContentFeeds from '@/components/content/ContentFeeds'
import ContentVideos from '@/components/content/ContentVideos'

export default [{
  beforeEnter: Hooks.ifAuthenticated,
  component: Home,
  name: 'home',
  path: '/',
  children: [{
    beforeEnter: Hooks.ifAuthenticated,
    component: ContentHome,
    name: 'content:home',
    path: ''
  }, {
    beforeEnter: Hooks.ifAuthenticated,
    component: ContentChannels,
    name: 'content:channels',
    path: 'channels'
  }, {
    beforeEnter: Hooks.ifAuthenticated,
    component: ContentFeeds,
    name: 'content:feeds',
    path: 'feeds'
  }, {
    beforeEnter: Hooks.ifAuthenticated,
    component: ContentVideos,
    name: 'content:videos',
    path: 'videos'
  }]
}, {
  beforeEnter: Hooks.ifNotAuthenticated,
  component: Register,
  name: 'register',
  path: '/register'
}, {
  beforeEnter: Hooks.ifNotAuthenticated,
  component: Login,
  name: 'login',
  path: '/login'
}
]