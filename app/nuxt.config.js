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
    // domain: 'localhost:4000',
    clientConfigs: {
      default: '~/apollo/clientConfig.js'
    }
  }
}