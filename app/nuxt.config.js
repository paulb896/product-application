export default {
  generate: {
    workers: 4,
    workerConcurrency: 500,
    concurrency: 500,
  },
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/component-cache',
    // 'nuxt-buefy'
  ],
  apollo: {
    clientConfigs: {
      default: '~/apollo/clientConfig.js'
    }
  },
  plugins: [{ src: "~/plugins/vuetimeline.js" }],
  css: ['~/assets/main.css'],
  head:  {
    htmlAttrs: {
      lang: 'en-US',
    },
    meta: [
      { charset: "utf-8"},
      { name: 'viewport', content: "width=device-width, initial-scale=1, shrink-to-fit=no" }
    ],
    link: [
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" }
    ]
  }
}