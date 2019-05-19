module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '~@/assets/scss/_variables.scss';
          @import '~@/assets/scss/_import.scss';
          @import '~@/assets/scss/_animations.scss';
        `
      }
    }
  }
}