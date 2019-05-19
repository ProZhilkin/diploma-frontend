<template>
  <div :class="b()">
    <ModalChannelView />
    <ModalFeedView />
    <ModalAddItem />
    <ModalPlayer />
  </div>
</template>

<script>
import ModalChannelView from '../modals/ModalChannelView'
import ModalFeedView from '../modals/ModalFeedView'
import ModalAddItem from '../modals/ModalAddItem'
import ModalPlayer from '../modals/ModalPlayer'

export default {
  name: 'modals',
  components: {
    ModalChannelView,
    ModalFeedView,
    ModalAddItem,
    ModalPlayer
  }
}
</script>