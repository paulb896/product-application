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
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.4.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js' }
    ]
  }
}