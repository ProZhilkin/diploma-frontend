<template>
  <PerfectScrollbar :class="b()">
    <div :class="b('header')">Регистрация</div>
    <div :class="b('form')">
      <div v-for="(field, index) in fields" :key="index">
        <b-form-group :label="field.label">
          <b-form-input v-model="values[field.name]" :type="field.type" />
        </b-form-group>
      </div>
      <b-button block variant="primary" @click="register">Зарегистрироваться</b-button>
      <div :class="b('links')">
        <router-link to="/login">Войти</router-link>
      </div>
    </div>
  </PerfectScrollbar>
</template>

<script>
export default {
  name: 'register',
  data: () => ({
    fields: [{
      label: 'Email:',
      name: 'email',
      type: 'text'
    }, {
      label: 'Пароль:',
      name: 'password',
      type: 'password'
    }, {
      label: 'Имя:',
      name: 'name',
      type: 'text'
    }],
    isLoading: false,
    values: {
      email: '',
      password: '',
      name: ''
    }
  }),
  methods: {
    async register () {
      this.isLoading = true
      try {
        await this.$store.dispatch('register', this.values)
        this.$router.push({ name: 'login' })
      } catch (error) {
        alert('Произошла какая-то ошибка.')
      }
      this.isLoading = false
    },
  }
}
</script>

<style lang="scss" scoped>
.register {
  background: #fff;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  width: $register-width;

  &__header {
    color: #555;
    font-size: 2.5em;
    font-weight: 550;
    margin-top: 20px;
    text-align: center;
  }

  &__form {
    padding: 40px;
  }

  &__links {
    margin: 10px;
    text-align: center;
  }
}
</style>