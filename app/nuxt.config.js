export default {
  generate: {
    workers: 4,
    workerConcurrency: 500,
    concurrency: 500,
    // routes (callback, params) {
    //     return axios.get('https://api.example.com/routes?since=' + params.lastFinished)
    //     .then((res) => {
    //     return res.data
    //     })
    // },
    // done ({ duration, errors, workerInfo }) {
    //     if (errors.length) {
    //     axios.post('https://api.example.com/routes', { generate_errors: errors })
    //     }
    // }
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