module.exports = {
  srcDir: './client',
  router: {
    middleware: ['authenticated'],
  },
  head: {
    title: 'VueJs boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  css: ['element-ui/lib/theme-chalk/index.css'],
  plugins: ['~plugins/element-ui'],
}

