<template>
  <div :class="b()">
    <ModalChannelView />
    <ModalFeedView />
    <ModalVideoView />
    <ModalAddItem />
    <ModalPlayer />
  </div>
</template>

<script>
import ModalChannelView from '../modals/ModalChannelView'
import ModalFeedView from '../modals/ModalFeedView'
import ModalVideoView from '../modals/ModalVideoView'
import ModalAddItem from '../modals/ModalAddItem'
import ModalPlayer from '../modals/ModalPlayer'

export default {
  name: 'modals',
  components: {
    ModalChannelView,
    ModalFeedView,
    ModalVideoView,
    ModalAddItem,
    ModalPlayer
  }
}
</script>