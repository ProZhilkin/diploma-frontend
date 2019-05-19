<template>
  <b-modal
    centered
    hide-footer
    title="Добавить контент"
    :visible="visible"
    @hide="hide">
    <b-form-group label="Тип контента">
      <b-form-select v-model="type" :options="options" />
    </b-form-group>
    <template v-if="type === 'channel'">
      <b-form-group label="ID канала">
        <b-form-input v-model="channelId" />
      </b-form-group>
    </template>
    <template v-else-if="type === 'feed'">
      <b-form-group label="Заголовок">
        <b-form-input v-model="title" />
      </b-form-group>
      <b-form-group label="URL">
        <b-form-input v-model="url" />
      </b-form-group>
    </template>
    <template v-else>
      <b-form-group label="Заголовок">
        <b-form-input v-model="title" />
      </b-form-group>
      <b-form-group label="ID владельца">
        <b-form-input v-model="ownerId" />
      </b-form-group>
    </template>
    <b-button block variant="primary" @click="add">Добавить</b-button>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'modal-add-item',
  data: () => ({
    channelId: '',
    ownerId: null,
    title: '',
    type: 'channel',
    url: ''
  }),
  computed: {
    ...mapState([
      'user'
    ]),
    modal () {
      return this.$store.getters.modal
    },
    options () {
      return [
        { value: 'channel', text: 'Канал' },
        { value: 'feed', text: 'Лента' },
        { value: 'video', text: 'VK пользователь/группа'}
      ]
    },
    visible () {
      return this.$options.name === this.modal.name && this.user.is_admin
    }
  },
  methods: {
    async add () {
      if (this.type === 'channel') {
        await this.$store.dispatch('addChannel', this.channelId)
      } else if (this.type === 'feed') {
        await this.$store.dispatch('addFeed', { title: this.title, url: this.url })
      } else {
        await this.$store.dispatch('addVideo', { name: this.title, ownerId: this.ownerId })
      }
      alert('Добавлено')
    },
    hide () {
      this.$store.commit('RESET_MODAL')
    }
  }
}
</script>